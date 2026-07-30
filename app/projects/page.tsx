import { getProjects } from "../../data/projects";
import { getExperiments } from "../../data/experiments";
import ProjectsClientComponent from "../../components/sections/projects/projects-client";

export default function Projects() {
  const projects = getProjects();
  const experiments = getExperiments();

  return (
    <main className="flex flex-col space-y-10 pb-8 pt-8 sm:pt-14">
      <section id="projects" className="space-y-10">
        <div>
          <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Projects & Lab
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
            A selection of things I have built and designed. University
            projects, side projects, and self-hosted homelab experiments.
          </p>
        </div>
        <ProjectsClientComponent initialProjects={projects} initialExperiments={experiments} />
      </section>
    </main>
  );
}
