import { getProjects } from "../../data/projects";
import BlurFade from "../../components/ui/blur-fade";
import ProjectsClientComponent from "../../components/sections/projects/projects-client";

export default function Projects() {
  const projects = getProjects();
  
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 mb-16">
      <section id="projects">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <BlurFade delay={0.04}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my recent projects
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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