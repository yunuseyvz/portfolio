import { getProject, getProjects, getProjectBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";

type Props = {
  params: Promise<{ slug: string }>;
};

// Animation delay increment for staggered animations
const BLUR_FADE_DELAY = 0.04;

// Generate static paths for all projects for better performance
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug || project.id.toString(),
  }));
}

export default async function ProjectPage(props: Props) {
  const params = await props.params;
  const { slug } = params;

  // Try to parse as a number (ID) first
  const id = parseInt(slug, 10);
  let project;

  if (!isNaN(id)) {
    project = await getProject(id);
  } else {
    project = await getProjectBySlug(slug);
  }

  if (!project) {
    notFound();
  }

  const statusBadgeClasses = project.active 
    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";

  const statusText = project.active ? "Active" : "Completed";

  return (
    <main className="container py-12 max-w-5xl">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="mb-8">
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Button>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Project Image */}
            {project.image && (
              <BlurFade className="w-full md:w-1/2" delay={BLUR_FADE_DELAY * 2}>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-auto dark:block hidden"
                  />
                  <Image
                    src={project.image_light || project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-auto dark:hidden block"
                  />
                </div>
              </BlurFade>
            )}
            
            {/* Project Details */}
            <BlurFade className="w-full md:w-1/2 space-y-4" delay={BLUR_FADE_DELAY * 3}>
              <div className="space-y-1">
                <h1 className="text-3xl font-bold leading-tight">{project.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={statusBadgeClasses}>{statusText}</Badge>
                  {project.year && (
                    <span className="text-sm text-muted-foreground">
                      {project.active ? `${project.year} - Present` : project.year}
                    </span>
                  )}
                </div>
              </div>
              
              <p className="text-base text-muted-foreground">{project.description}</p>
              
              {project.tags && project.tags.length > 0 && (
                <BlurFade className="pt-4" delay={BLUR_FADE_DELAY * 4}>
                  <h2 className="text-sm font-medium mb-2">Technologies</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, index) => (
                      <BlurFade key={tag} delay={BLUR_FADE_DELAY * 4 + index * 0.05}>
                        <Badge variant="secondary" className="px-2 py-1">
                          {tag}
                        </Badge>
                      </BlurFade>
                    ))}
                  </div>
                </BlurFade>
              )}
              
              {project.links && project.links.length > 0 && (
                <BlurFade className="pt-4" delay={BLUR_FADE_DELAY * 5}>
                  <h2 className="text-sm font-medium mb-2">Links</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.links.map((link, index) => (
                      <BlurFade key={index} delay={BLUR_FADE_DELAY * 5 + index * 0.05}>
                        <Link href={link.href} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="space-x-2">
                            {link.type === 'Github' ? (
                              <Github className="h-4 w-4" />
                            ) : (
                              <ExternalLink className="h-4 w-4" />
                            )}
                            <span>{link.type}</span>
                          </Button>
                        </Link>
                      </BlurFade>
                    ))}
                  </div>
                </BlurFade>
              )}
            </BlurFade>
          </div>
        </div>
      </BlurFade>
      
      {/* Project Content - Can be expanded with more details */}
      {project.content && (
        <BlurFade className="mt-10" delay={BLUR_FADE_DELAY * 6}>
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>
        </BlurFade>
      )}
    </main>
  );
}