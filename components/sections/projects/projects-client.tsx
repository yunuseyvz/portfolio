"use client";

import { useState } from "react";
import { MdDelete, MdSearch } from "react-icons/md";
import { FiClock, FiCheckCircle, FiSearch } from "react-icons/fi";
import BlurFade from "../../ui/blur-fade";
import { ProjectCard } from "./project-card";
import { ProjectLink } from "../../../data/projects";
import { Timeline } from "../../ui/timeline";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import { cn } from "../../../lib/utils";

/** Animation delay increment for staggered animations */
const BLUR_FADE_DELAY = 0.04;

/**
 * Props for the ProjectsClientComponent
 * @interface ProjectsClientComponentProps
 */
interface ProjectsClientComponentProps {
  /** Initial projects data fetched from server */
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

/**
 * ProjectsClientComponent
 * 
 * Client-side component for displaying and filtering projects.
 * Features include:
 * - Text-based filtering of projects by title, description, or tags
 * - Grouping projects by ongoing status and year with distinct visual separation
 *
 * @param {ProjectsClientComponentProps} props - The component props
 * @returns {JSX.Element} The rendered projects section
 */
export default function ProjectsClientComponent({ initialProjects }: ProjectsClientComponentProps) {
  const [filterText, setFilterText] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "ongoing" | "completed">("all");

  /**
   * Filter projects based on search text
   * Matches against project title, description, and tags
   */
  const filteredProjects = initialProjects.filter(project => {
    const searchTerm = filterText.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  });

  /**
   * Sort projects by year (most recent first)
   */
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const yearA = a.year || 0;
    const yearB = b.year || 0;
    return yearB - yearA; // Always descending order (newest first)
  });

  // Separate projects into ongoing and completed categories
  const ongoingProjects = sortedProjects.filter(project => project.active);
  const completedProjects = sortedProjects.filter(project => !project.active);

  // Filter projects based on active tab
  const visibleProjects = activeTab === "all" ? sortedProjects
    : activeTab === "ongoing" ? ongoingProjects
      : completedProjects;

  /**
   * Group completed projects by year
   */
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
    .sort((a, b) => parseInt(b) - parseInt(a))
    .map((year) => ({
      title: year,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectsByYear[year].map((project, id) => (
            <BlurFade key={project.id || id} delay={BLUR_FADE_DELAY * 4 + id * 0.05}>
              <ProjectCard
                id={project.id}
                slug={project.slug}
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

  return (
    <>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col space-y-4 mb-8">
          {/* Search and filter controls */}
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
            <div className="relative w-full md:w-auto">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <MdSearch className="w-4 h-4" />
              </div>
              <Input
                type="text"
                placeholder="Search for projects or tags"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full md:w-72 pl-10 pr-10 py-2 h-10 text-sm rounded-full border-muted-foreground/20"
              />
              {filterText && (
                <button
                  onClick={() => setFilterText("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                >
                  <MdDelete className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex w-full md:w-auto">
              {/* Project type filter tabs */}
              <div className="flex rounded-full bg-muted p-0.5 w-full md:w-auto">
                <button
                  onClick={() => setActiveTab("all")}
                  className={cn(
                    "flex-1 px-4 py-1.5 text-xs font-medium rounded-full transition-all",
                    activeTab === "all" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                  )}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("ongoing")}
                  className={cn(
                    "flex-1 px-4 py-1.5 text-xs font-medium rounded-full transition-all flex items-center justify-center gap-1.5",
                    activeTab === "ongoing" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                  )}
                >
                  <FiClock className="w-3 h-3" /> Ongoing
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={cn(
                    "flex-1 px-4 py-1.5 text-xs font-medium rounded-full transition-all flex items-center justify-center gap-1.5",
                    activeTab === "completed" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                  )}
                >
                  <FiCheckCircle className="w-3 h-3" /> Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY}>
        {filterText && visibleProjects.length === 0 ? (

          <div className="flex flex-col items-center gap-2">
            <FiSearch className="w-8 h-8 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No projects match your search.</p>
          </div>

        ) : (
          <>
            {/* Display projects based on selected tab */}
            {activeTab === "all" && (
              <>
                {/* Display Ongoing Projects in a featured section when viewing all */}
                {ongoingProjects.length > 0 && (
                  <div className="mb-5">
                    <BlurFade delay={BLUR_FADE_DELAY * 4}>
                      <div className="mb-1.5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Badge variant="secondary" className="px-1.5 py-0 h-5 text-xs">
                            <FiClock className="w-3 h-3 mr-1" />
                            Ongoing
                          </Badge>
                        </div>
                        <h2 className="text-lg font-medium">Current Projects</h2>
                      </div>
                    </BlurFade>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ongoingProjects.map((project, id) => (
                        <BlurFade key={project.id || id} className="mb-4" delay={BLUR_FADE_DELAY * 4 + id * 0.05}>
                          <ProjectCard
                            id={project.id}
                            slug={project.slug}
                            title={project.title}
                            description={project.description}
                            dates={project.year ? `${project.year} - Present` : "Ongoing"}
                            tags={project.tags || []}
                            image={project.image}
                            imageLight={project.image_light}
                            links={project.links}
                          />
                        </BlurFade>
                      ))}
                    </div>
                  </div>
                )}

                {/* Display completed projects in timeline */}
                {completedProjects.length > 0 && (
                  <BlurFade className="mb-5" delay={BLUR_FADE_DELAY * 4}>
                    <div className="-mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="px-1.5 py-0 h-5 text-xs">
                          <FiCheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                      <h2 className="text-lg font-medium">Project History</h2>
                    </div>
                    <Timeline data={yearTimelineData} />
                  </BlurFade>
                )}
              </>
            )}

            {/* Display only ongoing projects when that tab is selected */}
            {activeTab === "ongoing" && (
              <BlurFade
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                delay={BLUR_FADE_DELAY * 4}
              >
                {ongoingProjects.map((project, id) => (
                  <ProjectCard
                    key={project.id || id}
                    id={project.id}
                    slug={project.slug}
                    title={project.title}
                    description={project.description}
                    dates={project.year ? `${project.year} - Present` : "Ongoing"}
                    tags={project.tags || []}
                    image={project.image}
                    imageLight={project.image_light}
                    links={project.links}
                    className="border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                  />
                ))}
              </BlurFade>
            )}

            {/* Display only completed projects in timeline when that tab is selected */}
            {activeTab === "completed" && (
              <BlurFade
                className="mb-5 -mt-8"
                delay={BLUR_FADE_DELAY * 4}
              >
                <Timeline data={yearTimelineData} />
              </BlurFade>
            )}
          </>
        )}
      </BlurFade>
    </>
  );
}