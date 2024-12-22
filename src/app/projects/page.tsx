"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import GitHubCalendar from 'react-github-calendar';
import { Timeline } from "@/components/ui/timeline";

const BLUR_FADE_DELAY = 0.04;

export default function Projects() {
  // Create a copy of the projects array and sort it by year in descending order
  const sortedProjects = [...DATA.projects].sort((a, b) => {
    const yearA = parseInt(a.dates.split(" ")[0]);
    const yearB = parseInt(b.dates.split(" ")[0]);
    return yearB - yearA;
  });

  // Group projects by year
  const projectsByYear = sortedProjects.reduce<Record<string, typeof sortedProjects>>((acc, project) => {
    const year = project.dates.split(" ")[0];
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {});

  // Prepare data for the timeline
  const timelineData = Object.keys(projectsByYear).sort((a, b) => parseInt(b) - parseInt(a)).map((year) => ({
    title: year,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {projectsByYear[year].map((project, id) => (
          <BlurFade
            key={project.title}
            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
          >
            <ProjectCard
              key={project.title}
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
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY}>
          <Timeline data={timelineData} />
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