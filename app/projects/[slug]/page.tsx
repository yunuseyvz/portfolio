import { getProject, getProjects, getProjectBySlug } from "../../../data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ImageGallery } from "./image-gallery";
import { HeroImage } from "./hero-image";
import { use } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static paths for all projects for better performance
export function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug || project.id.toString(),
  }));
}

export default function ProjectPage(props: Props) {
  const params = use(props.params);
  const { slug } = params;

  // Try to parse as a number (ID) first
  const id = parseInt(slug, 10);
  let project;

  if (!isNaN(id)) {
    project = getProject(id);
  } else {
    project = getProjectBySlug(slug);
  }

  if (!project) {
    notFound();
  }

  return (
    <main className="space-y-10 pb-8 pt-8">
      {/* Navigation */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3" />
        All projects
      </Link>

      {project.image && (
        <HeroImage image={project.image} title={project.title} />
      )}

      {/* Project Details */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {project.active ? (
              <span className="text-accent">active</span>
            ) : (
              "completed"
            )}
            {project.year && (
              <> &nbsp;·&nbsp; {project.active ? `${project.year} — present` : project.year}</>
            )}
          </p>
        </div>

        <p className="text-base leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-x-12 gap-y-6">
          {project.tags && project.tags.length > 0 && (
            <div>
              <h2 className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Stack
              </h2>
              <p className="font-mono text-xs leading-loose text-foreground/80">
                {project.tags.join("  ·  ")}
              </p>
            </div>
          )}

          {project.links && project.links.length > 0 && (
            <div>
              <h2 className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Links
              </h2>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {project.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-foreground/80 transition-colors hover:text-accent [&_svg]:size-3.5"
                  >
                    {link.icon}
                    {link.type}
                    <ArrowUpRight className="size-3 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Showcase Images with Image Gallery */}
      {project.images && project.images.length > 0 && (
        <div>
          <h2 className="mb-4 border-b border-border pb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Gallery
          </h2>
          <ImageGallery images={project.images} title={project.title} />
        </div>
      )}

      {/* Project Content */}
      {project.content && (
        <div>
          <h2 className="mb-4 border-b border-border pb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Details
          </h2>
          <div className="prose prose-invert max-w-none font-body text-muted-foreground">
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>
        </div>
      )}
    </main>
  );
}
