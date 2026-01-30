import { getProject, getProjects, getProjectBySlug } from "../../../data/projects";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Badge } from "../../../components/ui/badge";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import BlurFade from "../../../components/ui/blur-fade";
import { ImageGallery } from "./image-gallery";
import { HeroImage } from "./hero-image";
import { use } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

const BLUR_FADE_DELAY = 0.04;

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

  const statusBadgeClasses = project.active 
    ? "bg-accent/10 text-accent border-accent/30"
    : "bg-secondary text-secondary-foreground";

  const statusText = project.active ? "Active" : "Completed";

  return (
    <main className="py-8">
      {/* Navigation */}
      <div className="container max-w-5xl">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to Projects
            </Button>
          </Link>
        </BlurFade>
      </div>
      
      {project.image && (
        <HeroImage 
          image={project.image} 
          imageLight={project.image_light} 
          title={project.title}
          delay={BLUR_FADE_DELAY * 2}
        />
      )}
      
      <div className="container max-w-5xl">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          {/* Project Details */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{project.title}</h1>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={statusBadgeClasses}>{statusText}</Badge>
                {project.year && (
                  <span className="text-sm text-muted-foreground font-medium">
                    {project.active ? `${project.year} - Present` : project.year}
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-lg font-body text-muted-foreground leading-relaxed text-pretty">{project.description}</p>
            
            <div className="flex flex-wrap gap-10">
              {project.tags && project.tags.length > 0 && (
                <BlurFade className="flex-1 min-w-[200px]" delay={BLUR_FADE_DELAY * 4}>
                  <h2 className="text-xs font-medium uppercase tracking-widest text-accent mb-3">Technologies</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <BlurFade key={tag} delay={BLUR_FADE_DELAY * 4 + index * 0.05}>
                        <Badge variant="secondary" className="px-3 py-1">
                          {tag}
                        </Badge>
                      </BlurFade>
                    ))}
                  </div>
                </BlurFade>
              )}
              
              {project.links && project.links.length > 0 && (
                <BlurFade className="flex-1 min-w-[200px]" delay={BLUR_FADE_DELAY * 5}>
                  <h2 className="text-xs font-medium uppercase tracking-widest text-accent mb-3">Links</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.links.map((link, index) => (
                      <BlurFade key={index} delay={BLUR_FADE_DELAY * 5 + index * 0.05}>
                        <Link href={link.href} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="gap-2">
                            {link.icon}
                            <span>{link.type}</span>
                          </Button>
                        </Link>
                      </BlurFade>
                    ))}
                  </div>
                </BlurFade>
              )}
            </div>
          </div>
          
          {/* Project Showcase Images with Image Gallery */}
          {project.images && project.images.length > 0 && (
            <BlurFade className="mt-14" delay={BLUR_FADE_DELAY * 6}>
              <h2 className="text-xs font-medium uppercase tracking-widest text-accent mb-6">Image Showcase</h2>
              <ImageGallery images={project.images} title={project.title} />
            </BlurFade>
          )}
          
          {/* Project Content - Can be expanded with more details */}
          {project.content && (
            <BlurFade className="mt-14" delay={BLUR_FADE_DELAY * (project.images && project.images.length > 0 ? 7 : 6)}>
              <h2 className="text-xs font-medium uppercase tracking-widest text-accent mb-6">Details</h2>
              <div className="prose dark:prose-invert max-w-none font-body">
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
              </div>
            </BlurFade>
          )}
        </BlurFade>
      </div>
    </main>
  );
}