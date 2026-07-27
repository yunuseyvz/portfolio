import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'node:child_process';
import {
  copyFile,
  mkdtemp,
  readFile,
  rm,
  stat,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

/**
 * API route that compiles the LaTeX CV in `data/cv/` natively with
 * tectonic — a self-contained LaTeX engine that bundles its own
 * package manager (no TeX Live / kpathsea / format files needed).
 * The production image pre-populates tectonic's package cache during
 * the Docker build, so runtime compiles need no internet access.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CV_DIR = resolve(process.cwd(), 'data', 'cv');
const MAIN_TEX = 'main.tex';
const STYLE_STY = 'cvstyle.sty';

// In-memory cache keyed by a hash of the source files' mtime+size, so
// repeated hits do not pay the multi-second tectonic cost. Entries
// expire after 5 minutes so a CV edit shows up quickly.
type CacheEntry = { key: string; pdf: Buffer; expires: number };
let cache: CacheEntry | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

async function sourceKey(): Promise<string> {
  const [a, b] = await Promise.all([
    stat(join(CV_DIR, MAIN_TEX)),
    stat(join(CV_DIR, STYLE_STY)),
  ]);
  return `${a.mtimeMs}:${a.size}|${b.mtimeMs}:${b.size}`;
}

type RunResult = { code: number; log: string };

function runTectonic(cwd: string): Promise<RunResult> {
  return new Promise((res, rej) => {
    // tectonic runs all passes automatically and is non-interactive by
    // default — no -interaction=nonstopmode needed.
    const proc = spawn('tectonic', [MAIN_TEX], { cwd });

    let log = '';
    proc.stdout.on('data', (chunk: Buffer) => {
      log += chunk.toString();
    });
    proc.stderr.on('data', (chunk: Buffer) => {
      log += chunk.toString();
    });
    proc.on('error', rej);
    proc.on('close', (code) => res({ code: code ?? -1, log }));
  });
}

function tailOf(log: string, max = 4000): string {
  return log.length > max ? log.slice(-max) : log;
}

export async function GET(_req: NextRequest) {
  const workDir = await mkdtemp(join(tmpdir(), 'cv-compile-'));
  try {
    // Stage the LaTeX sources in a clean temp dir
    await copyFile(join(CV_DIR, MAIN_TEX), join(workDir, MAIN_TEX));
    await copyFile(join(CV_DIR, STYLE_STY), join(workDir, STYLE_STY));

    const result = await runTectonic(workDir);
    if (result.code !== 0) {
      return NextResponse.json(
        { error: 'LaTeX compilation failed', version: 'cv-v5', details: tailOf(result.log) },
        { status: 500 },
      );
    }

    const pdf = await readFile(join(workDir, 'main.pdf'));

    // Cache the result keyed on the source files' mtime+size
    const key = await sourceKey();
    cache = { key, pdf, expires: Date.now() + CACHE_TTL_MS };

    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="yunus-cv.pdf"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error compiling LaTeX:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    const isMissingTectonic =
      (error as NodeJS.ErrnoException)?.code === 'ENOENT' &&
      /tectonic/.test(message);

    return NextResponse.json(
      {
        error: isMissingTectonic
          ? 'tectonic is not installed on the server'
          : 'Failed to compile CV',
        version: 'cv-v5',
        details: message,
      },
      { status: 500 },
    );
  } finally {
    // Best-effort cleanup of the scratch dir
    rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}

// Lightweight probe: lets the client / monitoring check whether a fresh
// compile is needed without paying for one.
export async function HEAD(_req: NextRequest) {
  const key = await sourceKey().catch(() => null);
  const hit = !!(key && cache && cache.key === key && cache.expires > Date.now());
  return new NextResponse(null, {
    status: hit ? 200 : 404,
    headers: { 'X-Cache': hit ? 'HIT' : 'MISS' },
  });
}