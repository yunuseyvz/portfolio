"use client";

import { motion } from "framer-motion";
import { Discipline, DISCIPLINE_META } from "../../../data/projects";
import { cn } from "../../../lib/utils";

interface ProjectWindowProps {
  discipline: Discipline;
  /** text shown in the window title bar (filename for engineering, title for design) */
  titleBarLabel: string;
  /** small status text on the right of the title bar */
  status?: string;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * A framed "window" the project card visually expands into.
 * - engineering → editor/terminal window with traffic lights + grid texture
 * - design      → editorial paper window with a tab + dotted paper texture
 */
export function ProjectWindow({
  discipline,
  titleBarLabel,
  status,
  active,
  children,
  className,
}: ProjectWindowProps) {
  const meta = DISCIPLINE_META[discipline];
  const isDesign = discipline === "design";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border shadow-xl",
        meta.border,
        isDesign ? "shadow-pink-500/5" : "shadow-cyan-500/5",
        className
      )}
    >
      {/* Title bar */}
      {isDesign ? (
        <div className="relative z-10 flex items-center gap-2 px-4 pt-3">
          <div className={cn(
            "flex items-center gap-2 rounded-t-lg rounded-b-none px-3.5 py-1.5 -mb-px border border-b-0 bg-card/80 backdrop-blur-sm",
            meta.border
          )}>
            <span className={cn("w-1.5 h-1.5 rounded-full", meta.dot)} />
            <span className={cn("text-[11px] font-body italic", meta.accent)}>{titleBarLabel}</span>
          </div>
          {status && (
            <span className="ml-auto text-[10px] font-body italic text-muted-foreground">{status}</span>
          )}
        </div>
      ) : (
        <div className={cn(
          "relative z-10 flex items-center gap-2 px-4 py-2.5 border-b font-mono bg-cyan-500/[0.05]",
          meta.border
        )}>
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          </span>
          <span className="ml-1.5 text-[11px] text-cyan-700/80 dark:text-cyan-300/80 truncate">
            {titleBarLabel}
          </span>
          {active ? (
            <span className="ml-auto flex items-center gap-1 text-[10px] text-green-600 dark:text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              live
            </span>
          ) : status ? (
            <span className="ml-auto text-[10px] text-muted-foreground">{status}</span>
          ) : null}
        </div>
      )}

      {/* Body */}
      <div className={cn("relative", isDesign ? "border-t" : "", isDesign && meta.border)}>
        {/* texture */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none",
            isDesign ? "texture-paper opacity-25" : "texture-grid opacity-20"
          )}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}
