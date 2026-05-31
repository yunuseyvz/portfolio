"use client";

import { motion } from "framer-motion";
import { DATA } from "../../../data/resume";
import { cn } from "../../../lib/utils";

type SkillItem = { name: string; icon: React.ComponentType<{ className?: string }> };

// Tags rest in neutral grey; each category's accent is revealed only on hover.
const CATEGORY_ACCENT = [
  "hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5",
  "hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-500/30 hover:bg-pink-500/5",
  "hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/5",
  "hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/5",
  "hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-500/30 hover:bg-sky-500/5",
  "hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5",
];

const DOT = [
  "bg-cyan-500",
  "bg-pink-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-sky-500",
  "bg-emerald-500",
];

/**
 * Calm, labelled skills layout. Each category is its own row — a coloured
 * dot + label on the left, its tools on the right — revealed with a gentle
 * stagger as it scrolls into view. Tags rest in neutral grey and light up in
 * their category's colour on hover, so the section stays quiet until explored.
 */
export function SkillsGrid() {
  const categories = Object.entries(DATA.skills) as [string, readonly SkillItem[]][];

  return (
    <div className="flex flex-col divide-y divide-border/40">
      {categories.map(([category, skills], rowIdx) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-2.5 py-4 sm:grid-cols-[160px_1fr] sm:gap-4"
        >
          {/* category label */}
          <div className="flex items-center gap-2">
            <span className={cn("size-1.5 rounded-full", DOT[rowIdx % DOT.length])} />
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {category}
            </h3>
          </div>

          {/* tools */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:scale-105",
                    CATEGORY_ACCENT[rowIdx % CATEGORY_ACCENT.length]
                  )}
                >
                  <Icon className="size-3.5" />
                  {skill.name}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
