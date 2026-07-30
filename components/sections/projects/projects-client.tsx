"use client";

import { useState, useMemo } from "react";
import { Braces, PenTool, Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./project-card";
import { LabNotesSection } from "./lab-notes";
import { getDiscipline, Project } from "../../../data/projects";
import { LabExperiment } from "../../../data/experiments";

interface ProjectsClientComponentProps {
  initialProjects: Project[];
  initialExperiments?: LabExperiment[];
}

export default function ProjectsClientComponent({
  initialProjects,
  initialExperiments = [],
}: ProjectsClientComponentProps) {
  const [filterText, setFilterText] = useState("");
  const [showAllEngineering, setShowAllEngineering] = useState(false);
  const [showAllDesign, setShowAllDesign] = useState(false);

  const filteredProjects = useMemo(() => {
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

  const filteredExperiments = useMemo(() => {
    const term = filterText.toLowerCase();
    return initialExperiments.filter((exp) => {
      return (
        !term ||
        exp.title.toLowerCase().includes(term) ||
        exp.description.toLowerCase().includes(term) ||
        exp.takeaway?.toLowerCase().includes(term) ||
        exp.tags?.some((t) => t.toLowerCase().includes(term))
      );
    });
  }, [initialExperiments, filterText]);

  const design = filteredProjects.filter((p) => getDiscipline(p.subcategory) === "design");
  const engineering = filteredProjects.filter((p) => getDiscipline(p.subcategory) === "engineering");

  const isSearching = Boolean(filterText.trim());

  const noResults =
    filteredProjects.length === 0 &&
    filteredExperiments.length === 0 &&
    isSearching;

  const groups = [
    {
      id: "engineering",
      label: "Software Development",
      icon: Braces,
      projects: engineering,
      limit: 2,
      showAll: showAllEngineering,
      toggleShowAll: () => setShowAllEngineering((prev) => !prev),
    },
    {
      id: "design",
      label: "Design & Research",
      icon: PenTool,
      projects: design,
      limit: 2,
      showAll: showAllDesign,
      toggleShowAll: () => setShowAllDesign((prev) => !prev),
    },
  ];

  return (
    <div className="space-y-12">
      {/* ── Search ────────────────────────────────────────────── */}
      <div className="relative border-b border-border transition-colors focus-within:border-foreground/40">
        <Search className="pointer-events-none absolute left-0 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search projects, homelab, or technologies…"
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
          No projects or lab notes match your search.
        </p>
      )}

      {/* ── Discipline groups (Software & Design) ─────────────── */}
      {groups.map((group) => {
        if (group.projects.length === 0) return null;

        const initialItems = group.projects.slice(0, group.limit);
        const extraItems = group.projects.slice(group.limit);
        const hasMore = extraItems.length > 0;

        return (
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

            {/* Always visible initial projects grid */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
              {initialItems.map((project) => (
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

            {/* Smooth height accordion for extra projects */}
            {hasMore && (
              <AnimatePresence initial={false}>
                {(group.showAll || isSearching) && (
                  <motion.div
                    key="expanded-projects"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.3, ease: "easeInOut" },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 pt-10 sm:grid-cols-2">
                      {extraItems.map((project) => (
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
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Expander Button */}
            {hasMore && !isSearching && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={group.toggleShowAll}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/30 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:border-foreground/20 hover:text-foreground"
                >
                  {group.showAll ? (
                    <>
                      Show less <ChevronUp className="size-3" />
                    </>
                  ) : (
                    <>
                      Show {extraItems.length} more{" "}
                      {extraItems.length === 1 ? "project" : "projects"}{" "}
                      <ChevronDown className="size-3" />
                    </>
                  )}
                </button>
              </div>
            )}
          </section>
        );
      })}

      {/* ── Homelab & Experiments (Lab Notes) ───────────────────── */}
      {filteredExperiments.length > 0 && (
        <LabNotesSection experiments={filteredExperiments} />
      )}
    </div>
  );
}
