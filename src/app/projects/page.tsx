"use client";

import { useState } from "react";
import { MdArrowDownward, MdArrowUpward, MdDelete } from "react-icons/md";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import GitHubCalendar from 'react-github-calendar';
import { Timeline } from "@/components/ui/timeline";
import { Input } from "@/components/ui/input";


const BLUR_FADE_DELAY = 0.04;

export default function Projects() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterText, setFilterText] = useState("");

  // Filter
  const filteredProjects = DATA.projects.filter(project => {
    const searchTerm = filterText.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.technologies.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const yearA = parseInt(a.dates.split(" ")[0]);
    const yearB = parseInt(b.dates.split(" ")[0]);
    return sortOrder === "desc" ? yearB - yearA : yearA - yearB;
  });

  // Group 
  const projectsByYear = sortedProjects.reduce<Record<string, typeof sortedProjects>>((acc, project) => {
    const year = project.dates.split(" ")[0];
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {});

  // Timeline
  const timelineData = Object.keys(projectsByYear)
    .sort((a, b) => (sortOrder === "desc" ? parseInt(b) - parseInt(a) : parseInt(a) - parseInt(b)))
    .map((year) => ({
      title: year,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projectsByYear[year].map((project, id) => (
            <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 4 + id * 0.05}>
              <ProjectCard
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                imageLight={project.imageLight}
                video={project.video}
                links={project.links}
              />
            </BlurFade>
          ))}
        </div>
      ),
    }));

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 mb-16">
      <section id="projects">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my recent projects
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are a few projects I have worked on during my studies and in my free time.
                </p>
              </div>
            
              <div className="translate-y-4 flex items-center gap-4">
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
        </div>
      </section>
      {/* 
      <section id="github">
        <div className="mx-auto w-full max-w-4xl space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my GitHub
                </h2>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <GitHubCalendar
              username={DATA.contact.social.GitHub.userName}
              blockRadius={10}
              blockSize={7.5}
              //transformData={selectLastHalfYear}
            />
          </BlurFade>
        </div>
      </section>
      */}
    </main>
  );
}