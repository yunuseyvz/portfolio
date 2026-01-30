import { getProjects } from "../../data/projects";
import BlurFade from "../../components/ui/blur-fade";
import ProjectsClientComponent from "../../components/sections/projects/projects-client";

export default function Projects() {
  const projects = getProjects();
  
  return (
    <main className="flex flex-col min-h-dvh space-y-12 mb-16">
      <section id="projects">
        <div className="mx-auto w-full max-w-2xl space-y-10">
          <BlurFade delay={0.04}>
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-accent text-accent-foreground px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
                  My Projects
                </div>
                <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  Check out my recent projects
                </h2>
                <p className="text-muted-foreground font-body text-lg leading-relaxed max-w-lg mx-auto">
                  Here are some of the projects I have worked on recently. Click on the cards to view more details about each project. 
                </p>
              </div>
            </div>
          </BlurFade>
          
          <ProjectsClientComponent initialProjects={projects} />
        </div>
      </section>
    </main>
  );
}