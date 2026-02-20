"use client";

import { useState, useMemo } from "react";
import { MdDelete, MdSearch } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import BlurFade from "../../ui/blur-fade";
import { ProjectCard } from "./project-card";
import { ProjectLink } from "../../../data/projects";
import { Input } from "../../ui/input";
import { cn } from "../../../lib/utils";

const BLUR_FADE_DELAY = 0.04;

interface ProjectsClientComponentProps {
  initialProjects: Array<{
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
  }>;
}

export default function ProjectsClientComponent({ initialProjects }: ProjectsClientComponentProps) {
  const [filterText, setFilterText] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique tags sorted by frequency
  const allTags = useMemo(() => {
    const freq: Record<string, number> = {};
    initialProjects.forEach((p) => p.tags?.forEach((t) => { freq[t] = (freq[t] || 0) + 1; }));
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([tag]) => tag);
  }, [initialProjects]);

  const filtered = useMemo(() => {
    const term = filterText.toLowerCase();
    return initialProjects.filter((p) => {
      const matchesText =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags?.some((t) => t.toLowerCase().includes(term));
      const matchesTag = !activeTag || p.tags?.includes(activeTag);
      return matchesText && matchesTag;
    });
  }, [initialProjects, filterText, activeTag]);

  const ongoing = filtered.filter((p) => p.active).sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  const completed = filtered
    .filter((p) => !p.active)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  // Group completed by year
  const byYear = useMemo(() => {
    const map: Record<string, typeof completed> = {};
    completed.forEach((p) => {
      const y = p.year?.toString() ?? "—";
      (map[y] ??= []).push(p);
    });
    return Object.entries(map).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
  }, [completed]);

  const noResults = filtered.length === 0 && (filterText || activeTag);

  return (
    <div className="space-y-8">
      {/* ── Controls ─────────────────────────────────────────── */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search projects or technologies…"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-10 pr-10 h-10 rounded-xl border-border bg-muted/40 text-sm focus-visible:bg-background"
            />
            {filterText && (
              <button
                onClick={() => setFilterText("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <MdDelete className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Tag chips */}
          <div className="flex flex-wrap gap-1.5">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={cn(
                  "text-[11px] px-2.5 py-1 rounded-full border transition-all duration-150 font-medium",
                  activeTag === tag
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-foreground/60 hover:border-accent/60 hover:text-foreground"
                )}
              >
                {tag}
              </button>
            ))}
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

      {/* ── Active / Ongoing projects ─────────────────────────── */}
      {ongoing.length > 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
                Currently active
              </span>
            </div>
            <div className="space-y-3">
              {ongoing.map((project, i) => (
                <BlurFade key={project.id ?? i} delay={BLUR_FADE_DELAY * 3 + i * 0.06}>
                  <ProjectCard
                    variant="featured"
                    id={project.id}
                    slug={project.slug}
                    title={project.title}
                    description={project.description}
                    dates={project.year ? `${project.year}` : ""}
                    tags={project.tags}
                    image={project.image}
                    imageLight={project.image_light}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </div>
          </section>
        </BlurFade>
      )}

      {/* ── Completed projects ────────────────────────────────── */}
      {completed.length > 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <section className="space-y-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
                Project history
              </span>
              <span className="text-xs text-foreground/40">({completed.length})</span>
            </div>

            {byYear.map(([year, projects], yi) => (
              <div key={year}>
                {/* Year divider */}
                <div className="flex items-center gap-3 pt-5 pb-1">
                  <span className="text-xs font-semibold text-foreground/40 tracking-wide">
                    {year}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Rows */}
                {projects.map((project, i) => (
                  <BlurFade key={project.id ?? i} delay={BLUR_FADE_DELAY * 4 + yi * 0.04 + i * 0.05}>
                    <ProjectCard
                      variant="list"
                      id={project.id}
                      slug={project.slug}
                      title={project.title}
                      description={project.description}
                      dates={project.year?.toString() ?? ""}
                      tags={project.tags}
                      image={project.image}
                      imageLight={project.image_light}
                      links={project.links}
                    />
                  </BlurFade>
                ))}
              </div>
            ))}
          </section>
        </BlurFade>
      )}
    </div>
  );
}
