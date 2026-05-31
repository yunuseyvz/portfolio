"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "../../../lib/utils";

/** Thin gradient bar pinned to the very top, growing with page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-pink-500 via-accent to-cyan-500"
      aria-hidden
    />
  );
}

export interface NavSection {
  id: string;
  label: string;
}

/**
 * Floating dot navigation that tracks the section currently in view.
 * Hidden on smaller screens where there's no room beside the column.
 */
export function SectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => handleClick(s.id)}
            className="group flex items-center justify-end gap-2"
            aria-current={isActive ? "true" : undefined}
            aria-label={s.label}
          >
            <span
              className={cn(
                "text-[10px] font-mono uppercase tracking-wider opacity-0 transition-all duration-200 group-hover:opacity-100",
                isActive ? "text-accent opacity-100" : "text-muted-foreground"
              )}
            >
              {s.label}
            </span>
            <span
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                isActive
                  ? "w-2 bg-accent shadow-[0_0_0_4px_hsl(var(--accent)/0.15)]"
                  : "w-2 bg-border group-hover:bg-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
