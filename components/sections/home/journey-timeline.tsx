"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";

export interface JourneyEntry {
  title: string;
  subtitle?: string;
  period: string;
  description?: string;
  logoUrl: string;
  altText: string;
  tags?: readonly string[];
}

// Shared geometry so the spine and nodes always line up.
// Spine is a 2px line centred on SPINE_CENTER; nodes are centred on it too.
const SPINE_CENTER = 11; // px from the container's left edge

/**
 * A scroll-driven vertical timeline. A gradient spine "draws" itself top→bottom
 * as the section scrolls through view; each node sits exactly on the spine and
 * pops in, and its card slides in from the side.
 */
export function JourneyTimeline({ entries }: { entries: JourneyEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"],
  });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* static track */}
      <div
        className="absolute top-3 bottom-3 w-0.5 -translate-x-1/2 rounded-full bg-border"
        style={{ left: SPINE_CENTER }}
      />
      {/* animated gradient spine */}
      <motion.div
        style={{ scaleY: spineScale, left: SPINE_CENTER }}
        className="absolute top-3 bottom-3 w-0.5 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-500 via-accent to-cyan-500"
      />

      <div className="flex flex-col gap-4">
        {entries.map((entry, i) => (
          <TimelineRow key={`${entry.title}-${i}`} entry={entry} index={i} />
        ))}
      </div>
    </div>
  );
}

function TimelineRow({ entry, index }: { entry: JourneyEntry; index: number }) {
  return (
    <div className="relative pl-9 sm:pl-11">
      {/* node — centred on the spine */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 320, damping: 20, delay: index * 0.05 }}
        className="absolute top-4 z-10 -translate-x-1/2"
        style={{ left: SPINE_CENTER }}
      >
        <span className="block size-3.5 rounded-full border-2 border-accent bg-background ring-4 ring-background" />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="group rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-colors duration-300 hover:border-accent/30 hover:bg-card/80"
      >
        <div className="flex items-start gap-3">
          <Avatar className="size-11 shrink-0 border border-border/50 bg-background dark:bg-foreground/10 shadow-sm">
            <AvatarImage src={entry.logoUrl} alt={entry.altText} className="object-contain" />
            <AvatarFallback className="text-xs font-medium">{entry.altText[0]}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-sm font-semibold leading-snug group-hover:text-accent transition-colors">
                {entry.title}
              </h3>
              <span className="shrink-0 text-[11px] font-mono tabular-nums text-muted-foreground">
                {entry.period}
              </span>
            </div>
            {entry.subtitle && (
              <p className="mt-0.5 font-body text-sm text-muted-foreground">{entry.subtitle}</p>
            )}
            {entry.description && (
              <p className="mt-2 text-sm font-body leading-relaxed text-muted-foreground/90">
                {entry.description}
              </p>
            )}
            {entry.tags && entry.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5 h-auto">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
