"use client";

import { Terminal, ExternalLink } from "lucide-react";
import { LabExperiment } from "../../../data/experiments";

interface LabNotesSectionProps {
  experiments: LabExperiment[];
}

export function LabNotesSection({ experiments }: LabNotesSectionProps) {
  if (experiments.length === 0) return null;

  return (
    <section id="homelab" className="space-y-4 pt-6">
      {/* ── Section Header ────────────────────────────────────────────── */}
      <div className="flex items-center gap-2.5 border-b border-border pb-3">
        <Terminal className="size-3.5 text-accent" />
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Homelab & Experiments
        </h2>
        <span className="font-mono text-[11px] text-muted-foreground/60">
          ({experiments.length})
        </span>
      </div>

      {/* ── Stacked Row List ─────────────────────────────────────────── */}
      <div className="divide-y divide-border/60">
        {experiments.map((item) => (
          <div key={item.id} className="group flex gap-4 py-5 first:pt-1 last:pb-0">
            {/* Terminal Icon Box */}
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-secondary/30 text-muted-foreground transition-colors group-hover:border-foreground/20 group-hover:text-accent">
              <Terminal className="size-3.5" />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                  {item.title}
                </h3>
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                  {item.year}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              {/* Refined Subtle Takeaway Block */}
              {item.takeaway && (
                <div className="rounded-r border-l-2 border-accent/50 bg-accent/[0.03] py-1.5 pl-3 pr-2">
                  <span className="mb-0.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-accent">
                    Takeaway
                  </span>
                  <p className="text-xs leading-relaxed text-muted-foreground/90">
                    {item.takeaway}
                  </p>
                </div>
              )}

              {/* Tags & Optional Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                {item.tags && item.tags.length > 0 && (
                  <p className="font-mono text-[11px] text-muted-foreground/50">
                    {item.tags.join("  ·  ")}
                  </p>
                )}

                {item.links && item.links.length > 0 && (
                  <div className="flex items-center gap-3">
                    {item.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:underline"
                      >
                        {link.label}
                        <ExternalLink className="size-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
