"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, PenTool } from "lucide-react";
import { ProjectCard } from "../projects/project-card";
import {
  Project,
  Discipline,
  DISCIPLINE_META,
  getDiscipline,
} from "../../../data/projects";
import { cn } from "../../../lib/utils";

const ICON: Record<Discipline, React.ReactNode> = {
  design: <PenTool className="size-4" />,
  engineering: <Code2 className="size-4" />,
};

/**
 * Home-page projects teaser. Shows the hand-picked `featured` projects from
 * each of the two worlds (engineering + design) as a scroll-revealed gallery,
 * then points to the full, filterable /projects experience.
 */
export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const byWorld = (d: Discipline) =>
    projects
      .filter((p) => getDiscipline(p.subcategory) === d)
      .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  const allWorlds: { id: Discipline; items: Project[] }[] = [
    { id: "engineering", items: byWorld("engineering") },
    { id: "design", items: byWorld("design") },
  ];
  const worlds = allWorlds.filter((w) => w.items.length > 0);

  return (
    <div className="space-y-6">
      {worlds.map(({ id, items }) => {
        const meta = DISCIPLINE_META[id];
        return (
          <div key={id} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={cn("inline-flex items-center gap-1.5", meta.accent)}>
                {ICON[id]}
                <span className="text-sm font-semibold">{meta.label}</span>
              </span>
              <span className={cn("text-[11px] font-mono", meta.accentSoft)}>
                {id === "engineering" ? meta.path + " $" : meta.kicker}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 auto-rows-fr">
              {items.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <ProjectCard
                    variant={id}
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
                    discipline={id}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}

      <Link
        href="/projects"
        className="group flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/40 py-3 text-sm font-medium backdrop-blur-sm transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-accent"
      >
        Explore all projects
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
