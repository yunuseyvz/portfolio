"use client";

import { useState, useMemo } from "react";
import { MdDelete, MdSearch } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Code2, PenTool, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BlurFade from "../../ui/blur-fade";
import { ProjectCard } from "./project-card";
import {
  ProjectLink,
  ProjectCategory,
  Discipline,
  DISCIPLINE_META,
  getDiscipline,
} from "../../../data/projects";
import { Input } from "../../ui/input";
import { cn } from "../../../lib/utils";

const BLUR_FADE_DELAY = 0.04;

type ProjectItem = {
  id: number;
  title: string;
  description: string;
  year?: number;
  tags: string[];
  image?: string;
  image_light?: string;
  links?: ProjectLink[];
  active?: boolean;
  slug?: string;
  category: ProjectCategory;
  subcategory: string;
};

interface ProjectsClientComponentProps {
  initialProjects: ProjectItem[];
}

type FocusMode = "both" | Discipline;

const DISCIPLINE_ICON: Record<Discipline, React.ReactNode> = {
  design: <PenTool className="w-4 h-4" />,
  engineering: <Code2 className="w-4 h-4" />,
};

export default function ProjectsClientComponent({ initialProjects }: ProjectsClientComponentProps) {
  const [filterText, setFilterText] = useState("");
  const [focus, setFocus] = useState<FocusMode>("both");

  const filtered = useMemo(() => {
    const term = filterText.toLowerCase().trim();
    if (!term) return initialProjects;
    return initialProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags?.some((t) => t.toLowerCase().includes(term)) ||
        p.subcategory.toLowerCase().includes(term)
    );
  }, [initialProjects, filterText]);

  // Split into the two worlds, sorted by year desc.
  const byDiscipline = useMemo(() => {
    const map: Record<Discipline, ProjectItem[]> = { design: [], engineering: [] };
    filtered.forEach((p) => map[getDiscipline(p.subcategory)].push(p));
    (Object.keys(map) as Discipline[]).forEach((d) =>
      map[d].sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    );
    return map;
  }, [filtered]);

  const noResults = filtered.length === 0;
  const visibleDisciplines: Discipline[] =
    focus === "both" ? ["engineering", "design"] : [focus];

  return (
    <div className="space-y-8">
      {/* ── Search & World Toggle ─────────────────────────────── */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="space-y-4">
          <div className="relative">
            <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search projects, technologies, or topics…"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-10 pr-10 h-10 rounded-xl border-border bg-muted/40 text-sm focus-visible:bg-background"
            />
            {filterText && (
              <button
                onClick={() => setFilterText("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <MdDelete className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* World focus toggle */}
          <div className="flex items-center gap-1.5">
            <FocusButton
              active={focus === "both"}
              onClick={() => setFocus("both")}
              className="border-border text-foreground/70 data-[active=true]:bg-foreground data-[active=true]:text-background data-[active=true]:border-foreground"
            >
              Both worlds
            </FocusButton>
            {(["engineering", "design"] as Discipline[]).map((d) => {
              const meta = DISCIPLINE_META[d];
              const isActive = focus === d;
              return (
                <FocusButton
                  key={d}
                  active={isActive}
                  onClick={() => setFocus(isActive ? "both" : d)}
                  className={cn(
                    isActive ? cn(meta.surface, meta.accent, meta.border) : "border-border text-foreground/70 hover:text-foreground hover:border-foreground/20"
                  )}
                >
                  {DISCIPLINE_ICON[d]}
                  {meta.label}
                </FocusButton>
              );
            })}
          </div>
        </div>
      </BlurFade>

      {/* ── Empty state ───────────────────────────────────────── */}
      {noResults && (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
            <FiSearch className="w-8 h-8 opacity-30" />
            <p className="text-sm">No projects match your search.</p>
          </div>
        </BlurFade>
      )}

      {/* ── The two worlds (stacked) ──────────────────────────── */}
      {!noResults && (
        <div className="space-y-6">
          {visibleDisciplines.map((d, colIdx) => (
            <DisciplineColumn
              key={d}
              discipline={d}
              projects={byDiscipline[d]}
              colIdx={colIdx}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */

function FocusButton({
  active,
  onClick,
  className,
  children,
}: {
  active: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      data-active={active}
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full border transition-all duration-200 font-medium",
        className
      )}
    >
      {children}
    </button>
  );
}

function DisciplineColumn({
  discipline,
  projects,
  colIdx,
}: {
  discipline: Discipline;
  projects: ProjectItem[];
  colIdx: number;
}) {
  const meta = DISCIPLINE_META[discipline];
  const isDesign = discipline === "design";

  return (
    <motion.section
      layout
      className={cn(
        "relative overflow-hidden rounded-3xl border",
        meta.border,
        meta.surface
      )}
    >
      {/* texture stays subtle and clipped to the panel */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none opacity-40",
          isDesign ? "texture-paper" : "texture-grid"
        )}
      />

      <div className="relative z-10 space-y-4 p-4 sm:p-5">
        {/* ── World header ── */}
        <BlurFade delay={BLUR_FADE_DELAY * 2 + colIdx * 0.05}>
          {isDesign ? (
            <DesignHeader meta={meta} count={projects.length} />
          ) : (
            <EngineeringHeader meta={meta} count={projects.length} />
          )}
        </BlurFade>

        {projects.length === 0 ? (
          <p className="text-xs text-muted-foreground py-6 text-center font-body italic">
            Nothing here matches your search.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 auto-rows-fr">
            {projects.map((project, i) => (
              <BlurFade
                key={project.id ?? i}
                className="h-full"
                delay={BLUR_FADE_DELAY * 3 + colIdx * 0.05 + i * 0.06}
              >
                <ProjectCard
                  variant={discipline}
                  id={project.id}
                  slug={project.slug}
                  title={project.title}
                  description={project.description}
                  dates={project.year?.toString() ?? ""}
                  tags={project.tags}
                  image={project.image}
                  imageLight={project.image_light}
                  links={project.links}
                  active={project.active}
                  category={project.category}
                  subcategory={project.subcategory}
                  discipline={discipline}
                />
              </BlurFade>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}

function DesignHeader({
  meta,
  count,
}: {
  meta: typeof DISCIPLINE_META[Discipline];
  count: number;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="space-y-1">
        <span className={cn("text-[10px] font-body italic tracking-wide", meta.accentSoft)}>
          {meta.kicker}
        </span>
        <h3 className="flex items-center gap-2 text-xl font-body italic font-medium text-foreground">
          <PenTool className={cn("w-4 h-4", meta.accent)} />
          <span className="ink-underline">{meta.label}</span>
        </h3>
        <p className="text-xs text-muted-foreground font-body leading-relaxed max-w-xs">
          {meta.tagline}
        </p>
      </div>
      <span className={cn("shrink-0 text-[10px] font-mono px-2 py-1 rounded-full border", meta.border, meta.accent)}>
        {count}
      </span>
    </div>
  );
}

function EngineeringHeader({
  meta,
  count,
}: {
  meta: typeof DISCIPLINE_META[Discipline];
  count: number;
}) {
  return (
    <div className="space-y-2 font-mono">
      <div className="flex items-center justify-between gap-3">
        <span className={cn("text-[10px] tracking-wide", meta.accentSoft)}>
          {"/* "}{meta.kicker}{" */"}
        </span>
        <span className={cn("shrink-0 text-[10px] px-2 py-1 rounded-full border", meta.border, meta.accent)}>
          {count}
        </span>
      </div>
      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
        <Code2 className={cn("w-4 h-4", meta.accent)} />
        {meta.label}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
        <span className={meta.accentSoft}>{meta.path} $ </span>
        {meta.tagline}
        <span className={cn("caret-blink ml-0.5", meta.accent)}>▌</span>
      </p>
    </div>
  );
}
