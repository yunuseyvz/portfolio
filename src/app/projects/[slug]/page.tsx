import { getProject, getProjects, getProjectBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Globe, Video, Award, PartyPopper, GamepadIcon, Figma, Book, Info } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import { ImageGallery } from "./image-gallery";
import { HeroImage } from "./hero-image";
import { JSX } from "react";

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

// Function to render the appropriate icon based on the icon name
function renderIcon(iconName?: string) {
  // For debugging
  if (!iconName || typeof iconName !== 'string') {
    return <Globe className="h-4 w-4" />;
  }
  
  // Map of icon names to components
  const iconMap: Record<string, JSX.Element> = {
    'globe': <Globe className="h-4 w-4" />,
    'github': <Github className="h-4 w-4" />,
    'video': <Video className="h-4 w-4" />,
    'award': <Award className="h-4 w-4" />,
    'partypopper': <PartyPopper className="h-4 w-4" />,
    'externallink': <ExternalLink className="h-4 w-4" />,
    'gamepad': <GamepadIcon className="h-4 w-4" />,
    'figma': <Figma className="h-4 w-4" />,
    'book': <Book className="h-4 w-4" />,
  };
  
  try {
    // Safe way to access the icon with type checking
    const iconKey = typeof iconName === 'string' ? iconName.toLowerCase() : '';
    return iconMap[iconKey] || <Globe className="h-4 w-4" />;
  } catch (error) {
    // Fallback to default if any error occurs
    return <Globe className="h-4 w-4" />;
  }
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
    <main className="py-12">
      {/* Navigation */}
      <div className="container max-w-5xl">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
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
          <div className="space-y-6">
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
            
            <p className="text-base text-muted-foreground text-pretty text-justify hyphens-auto">{project.description}</p>
            
            <div className="flex flex-wrap gap-8">
              {project.tags && project.tags.length > 0 && (
                <BlurFade className="flex-1 min-w-[200px]" delay={BLUR_FADE_DELAY * 4}>
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
                <BlurFade className="flex-1 min-w-[200px]" delay={BLUR_FADE_DELAY * 5}>
                  <h2 className="text-sm font-medium mb-2">Links</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.links.map((link, index) => (
                      <BlurFade key={index} delay={BLUR_FADE_DELAY * 5 + index * 0.05}>
                        <Link href={link.href} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="space-x-2">
                            {renderIcon(link.icon)}
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
            <BlurFade className="mt-12" delay={BLUR_FADE_DELAY * 6}>
              <h2 className="text-xl font-semibold mb-4">Image Showcase</h2>
              <ImageGallery images={project.images} title={project.title} />
            </BlurFade>
          )}
          
          {/* Project Content - Can be expanded with more details */}
          {project.content && (
            <BlurFade className="mt-12" delay={BLUR_FADE_DELAY * (project.images && project.images.length > 0 ? 7 : 6)}>
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
              </div>
            </BlurFade>
          )}
        </BlurFade>
      </div>
    </main>
  );
}