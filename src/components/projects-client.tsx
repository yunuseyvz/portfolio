"use client";

import { useState } from "react";
import { MdArrowDownward, MdArrowUpward, MdDelete } from "react-icons/md";
import BlurFade from "@/components/ui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { Project } from "@/lib/db";
import { Timeline } from "@/components/ui/timeline";
import { Input } from "@/components/ui/input";

const BLUR_FADE_DELAY = 0.04;

interface ProjectsClientComponentProps {
  initialProjects: Project[];
}

export default function ProjectsClientComponent({ initialProjects }: ProjectsClientComponentProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterText, setFilterText] = useState("");

  // Filter
  const filteredProjects = initialProjects.filter(project => {
    const searchTerm = filterText.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const yearA = a.year || 0;
    const yearB = b.year || 0;
    return sortOrder === "desc" ? yearB - yearA : yearA - yearB;
  });

  // Use active flag to determine ongoing projects
  const ongoingProjects = sortedProjects.filter(project => project.active);
  const completedProjects = sortedProjects.filter(project => !project.active);

  const projectsByYear = completedProjects.reduce<Record<string, typeof sortedProjects>>((acc, project) => {
    const year = project.year?.toString() || "Unknown";
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {});

  // Timeline data for completed projects
  const yearTimelineData = Object.keys(projectsByYear)
    .sort((a, b) => (sortOrder === "desc" ? parseInt(b) - parseInt(a) : parseInt(a) - parseInt(b)))
    .map((year) => ({
      title: year,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projectsByYear[year].map((project, id) => (
            <BlurFade key={project.id || id} delay={BLUR_FADE_DELAY * 4 + id * 0.05}>
              <ProjectCard
                title={project.title}
                description={project.description}
                dates={project.year ? `${project.year}` : ""}
                tags={project.tags || []}
                image={project.image}
                imageLight={project.image_light}
                links={project.links}
              />
            </BlurFade>
          ))}
        </div>
      ),
    }));

  const timelineData = ongoingProjects.length > 0 
    ? [
        {
          title: "Ongoing",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ongoingProjects.map((project, id) => (
                <BlurFade key={project.id || id} delay={BLUR_FADE_DELAY * 4 + id * 0.05}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    dates={project.year ? `${project.year}` : "Ongoing"}
                    tags={project.tags || []}
                    image={project.image}
                    imageLight={project.image_light}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </div>
          ),
        },
        ...yearTimelineData,
      ]
    : yearTimelineData;

  return (
    <>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="translate-y-4 flex items-center gap-4 justify-center">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for projects or tags"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full max-w-sm border rounded-full px-4 py-2"
            />
            {filterText && (
              <button
                onClick={() => setFilterText("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                <MdDelete className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortOrder("desc")}
              className={`flex items-center gap-1 border rounded-full px-4 py-2 ${sortOrder === "desc" ? "bg-foreground text-background" : "bg-background text-foreground"}`}
            >
              <MdArrowDownward />
            </button>
            <button
              onClick={() => setSortOrder("asc")}
              className={`flex items-center gap-1 border rounded-full px-4 py-2 ${sortOrder === "asc" ? "bg-foreground text-background" : "bg-background text-foreground"}`}
            >
              <MdArrowUpward />
            </button>
          </div>
        </div>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY}>
        {filterText && sortedProjects.length === 0 ? (
          <div className="p-6 rounded-lg text-center text-sm text-gray-700 dark:text-gray-500">
            No projects match your search.
          </div>
        ) : (
          <Timeline data={timelineData} />
        )}
      </BlurFade>
    </>
  );
}