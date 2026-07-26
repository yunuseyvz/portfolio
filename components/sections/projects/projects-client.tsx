"use client";

import { useState, useMemo } from "react";
import { Braces, PenTool, Search, X } from "lucide-react";
import { ProjectCard } from "./project-card";
import { getDiscipline, Project } from "../../../data/projects";

interface ProjectsClientComponentProps {
  initialProjects: Project[];
}

export default function ProjectsClientComponent({ initialProjects }: ProjectsClientComponentProps) {
  const [filterText, setFilterText] = useState("");

  const filtered = useMemo(() => {
    const term = filterText.toLowerCase();
    return initialProjects
      .filter((p) => {
        return (
          !term ||
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.tags?.some((t) => t.toLowerCase().includes(term))
        );
      })
      .sort(
        (a, b) =>
          Number(b.active ?? false) - Number(a.active ?? false) ||
          (b.year ?? 0) - (a.year ?? 0)
      );
  }, [initialProjects, filterText]);

  const design = filtered.filter((p) => getDiscipline(p.subcategory) === "design");
  const engineering = filtered.filter((p) => getDiscipline(p.subcategory) === "engineering");

  const noResults = filtered.length === 0 && filterText;

  const groups = [
    {
      id: "engineering",
      label: "Software Development",
      icon: Braces,
      projects: engineering,
    },
    {
      id: "design",
      label: "Design & Research",
      icon: PenTool,
      projects: design,
    },
  ];

  return (
    <div className="space-y-12">
      {/* ── Search ────────────────────────────────────────────── */}
      <div className="relative border-b border-border transition-colors focus-within:border-foreground/40">
        <Search className="pointer-events-none absolute left-0 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search projects or technologies…"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="h-10 w-full bg-transparent pl-6 pr-6 text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
        />
        {filterText && (
          <button
            onClick={() => setFilterText("")}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* ── Empty state ───────────────────────────────────────── */}
      {noResults && (
        <p className="py-16 text-center font-mono text-xs text-muted-foreground">
          No projects match your search.
        </p>
      )}

      {/* ── Discipline groups ─────────────────────────────────── */}
      {groups.map((group) =>
        group.projects.length > 0 ? (
          <section key={group.id}>
            <div className="mb-6 flex items-center gap-2.5 border-b border-border pb-3">
              <group.icon className="size-3.5 text-accent" />
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {group.label}
              </h2>
              <span className="font-mono text-[11px] text-muted-foreground/60">
                ({group.projects.length})
              </span>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
              {group.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  slug={project.slug}
                  title={project.title}
                  description={project.description}
                  dates={project.year?.toString() ?? ""}
                  tags={project.tags}
                  image={project.image}
                  links={project.links}
                  active={project.active}
                />
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
