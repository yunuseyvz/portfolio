"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../../lib/utils";

interface ChapterProps {
  index: string; // e.g. "01"
  icon: React.ReactNode;
  title: string;
  hint?: string;
  className?: string;
}

/**
 * A scrollytelling chapter marker: a big translucent index number that
 * parallax-drifts behind a labelled, icon-chipped heading.
 */
export function Chapter({ index, icon, title, hint, className }: ChapterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* oversized ghost index */}
      <motion.span
        style={{ y, opacity }}
        aria-hidden
        className="pointer-events-none absolute -top-10 -left-2 select-none font-mono text-7xl font-bold text-foreground/[0.04] sm:text-8xl"
      >
        {index}
      </motion.span>

      <div className="relative flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 text-sm font-medium uppercase tracking-widest text-accent">
          <span className="flex size-7 items-center justify-center rounded-md bg-accent/10 border border-accent/20">
            {icon}
          </span>
          <span className="font-mono text-muted-foreground/60">{index}</span>
          {title}
        </h2>
        {hint && (
          <span className="text-[11px] font-mono text-muted-foreground/60">{hint}</span>
        )}
      </div>
    </div>
  );
}
