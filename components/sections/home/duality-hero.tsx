"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { DATA } from "../../../data/resume";
import { cn } from "../../../lib/utils";
import { Code2, MapPin, PenTool } from "lucide-react";

type Mode = "human" | "machine";

const META = {
  human: { ...DATA.duality.human, icon: PenTool, toggle: "Human" },
  machine: { ...DATA.duality.computer, icon: Code2, toggle: "Machine" },
} as const;

const AUTO_INTERVAL = 4200;

/**
 * A single hero that the visitor flips between two identities — the same
 * person seen as a designer ("the human side") and as an engineer ("the
 * machine side"). Toggling re-themes the entire hero: typeface, colour,
 * copy and background texture all transform with an animated transition.
 *
 * The interaction is itself the point — a deliberate mode switch, the most
 * basic HCI gesture there is. It gently auto-cycles so both worlds are
 * visible at a glance, then hands control to the user on first interaction.
 */
export function DualityHero() {
  const [mode, setMode] = useState<Mode>("human");
  const [locked, setLocked] = useState(false); // user took control → stop auto-cycle
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    if (locked || reducedMotion.current) return;
    const id = setInterval(
      () => setMode((m) => (m === "human" ? "machine" : "human")),
      AUTO_INTERVAL
    );
    return () => clearInterval(id);
  }, [locked]);

  const choose = (next: Mode) => {
    setLocked(true);
    setMode(next);
  };

  const meta = META[mode];
  const firstName = DATA.name.split(" ")[0];
  const isHuman = mode === "human";

  return (
    <section id="hero" aria-label="Introduction">
      <div className="relative overflow-hidden rounded-3xl border border-border/60 min-h-[440px] sm:min-h-[420px]">
        {/* ── Animated background tint + texture ────────────────────── */}
        <AnimatePresence>
          <motion.div
            key={mode + "-bg"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={cn("absolute inset-0", meta.surface)}
          >
            <div
              className={cn(
                "absolute inset-0 opacity-50",
                isHuman ? "texture-paper" : "texture-grid"
              )}
            />
          </motion.div>
        </AnimatePresence>

        {/* soft accent glow that follows the active world */}
        <div
          className={cn(
            "pointer-events-none absolute -top-24 h-64 w-64 rounded-full blur-3xl opacity-30 transition-all duration-700",
            isHuman
              ? "left-0 bg-pink-500"
              : "right-0 bg-cyan-500"
          )}
        />

        <div className="relative z-10 flex h-full min-h-[440px] sm:min-h-[420px] flex-col gap-6 p-6 sm:p-10">
          {/* ── Top bar: location + world toggle ────────────────────── */}
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-muted-foreground border border-border/60">
              <MapPin className="size-3 shrink-0" />
              {DATA.location}
            </span>
            <WorldToggle mode={mode} onChange={choose} />
          </div>

          {/* ── Main: avatar + morphing identity ────────────────────── */}
          <div className="flex grow flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
            {/* avatar with a ring that shifts colour per world */}
            <div className="relative shrink-0">
              <div
                className={cn(
                  "absolute -inset-1.5 rounded-full blur-md opacity-50 transition-colors duration-500",
                  isHuman ? "bg-pink-500" : "bg-cyan-500"
                )}
              />
              <div
                className={cn(
                  "relative size-24 sm:size-28 rounded-full p-[2.5px] transition-colors duration-500",
                  isHuman ? "bg-pink-500" : "bg-cyan-500"
                )}
              >
                <Image
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  width={140}
                  height={140}
                  priority
                  className="size-full rounded-full object-cover ring-2 ring-background"
                />
              </div>
            </div>

            {/* the part that transforms — min-height reserved so swapping
                sides never reflows the panel (avoids mobile layout shift) */}
            <div className="relative flex-1 min-w-0 w-full min-h-[232px] sm:min-h-[212px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 sm:items-start sm:justify-center"
                >
                  {/* kicker */}
                  <span
                    className={cn(
                      "text-[10px] font-semibold uppercase",
                      meta.accent,
                      isHuman ? "font-body italic tracking-wide" : "font-mono tracking-[0.2em]"
                    )}
                  >
                    {isHuman ? meta.kicker : `// ${meta.kicker}`}
                  </span>

                  {/* name */}
                  <h1
                    className={cn(
                      "leading-[0.95] text-foreground",
                      isHuman
                        ? "font-body italic font-medium text-4xl sm:text-5xl xl:text-6xl"
                        : "font-mono font-bold text-3xl sm:text-4xl xl:text-5xl tracking-tight"
                    )}
                  >
                    {isHuman ? (
                      <>
                        Hi, I&apos;m{" "}
                        <span className="ink-underline whitespace-nowrap">{firstName}</span>
                      </>
                    ) : (
                      <span className="whitespace-nowrap">
                        <span className={meta.accent}>const</span> {firstName}
                        <span className={meta.accent}>()</span>
                      </span>
                    )}
                  </h1>

                  {/* role label */}
                  <p
                    className={cn(
                      "text-base font-medium",
                      isHuman ? "font-body italic text-foreground/80" : "font-mono text-foreground/80"
                    )}
                  >
                    {meta.label}
                  </p>

                  {/* tagline */}
                  <p
                    className={cn(
                      "max-w-md text-sm leading-relaxed text-muted-foreground",
                      isHuman ? "font-body" : "font-mono"
                    )}
                  >
                    {isHuman ? meta.tagline : `/* ${meta.tagline} */`}
                  </p>

                  {/* verbs */}
                  <div className="flex flex-wrap justify-center gap-1.5 pt-1 sm:justify-start">
                    {meta.verbs.map((verb) => (
                      <span
                        key={verb}
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-[10px] whitespace-nowrap",
                          meta.border,
                          meta.accent,
                          isHuman ? "font-body italic" : "font-mono"
                        )}
                      >
                        {isHuman ? verb : `${verb}()`}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Footer hint ─────────────────────────────────────────── */}
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="text-[10px] text-muted-foreground/70 font-mono">
              {locked
                ? "two worlds, one me — tap to switch"
                : "I work between two worlds…"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */

function WorldToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div className="relative inline-flex items-center rounded-full border border-border/60 bg-background/70 backdrop-blur-sm p-1 text-xs font-medium">
      {(Object.keys(META) as Mode[]).map((id) => {
        const item = META[id];
        const Icon = item.icon;
        const active = mode === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            aria-pressed={active}
            className={cn(
              "relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors duration-200",
              active ? item.accent : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && (
              <motion.span
                layoutId="world-toggle-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className={cn(
                  "absolute inset-0 -z-10 rounded-full border",
                  item.surface,
                  item.border
                )}
              />
            )}
            <Icon className="size-3.5" />
            {item.toggle}
          </button>
        );
      })}
    </div>
  );
}
