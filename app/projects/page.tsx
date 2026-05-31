import { getProjects } from "../../data/projects";
import BlurFade from "../../components/ui/blur-fade";
import ProjectsClientComponent from "../../components/sections/projects/projects-client";

export default function Projects() {
  const projects = getProjects();

  return (
    <main className="flex flex-col min-h-dvh space-y-12 mb-16">
      <section id="projects" className="space-y-10">
        <div className="mx-auto w-full max-w-2xl">
          <BlurFade delay={0.04}>
            <div className="flex flex-col items-center justify-center space-y-5 text-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 text-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-accent/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  Portfolio
                </div>
                <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  Projects
                </h2>
                <p className="text-muted-foreground font-body text-lg leading-relaxed max-w-lg mx-auto">
                  A mix of{" "}
                  <span className="font-body italic text-pink-600 dark:text-pink-400">design &amp; research</span>{" "}
                  and{" "}
                  <span className="font-mono text-cyan-600 dark:text-cyan-400">software</span>{" "}
                  work, from university and on my own time.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Worlds stack vertically within the page column */}
        <div className="mx-auto w-full max-w-2xl">
          <ProjectsClientComponent initialProjects={projects} />
        </div>
      </section>
    </main>
  );
}