import { getProject, getProjects, getProjectBySlug, getDiscipline, getProjectFileName, DISCIPLINE_META } from "../../../data/projects";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Badge } from "../../../components/ui/badge";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { ArrowLeft, Code2, PenTool } from "lucide-react";
import BlurFade from "../../../components/ui/blur-fade";
import { ProjectWindow } from "./project-window";
import { ProjectCollage, CollageImage } from "./project-collage";
import { cn } from "../../../lib/utils";
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

export function generateMetadata(props: Props): Promise<Metadata> | Metadata {
  return props.params.then((params) => {
    const id = parseInt(params.slug, 10);
    const project = !isNaN(id) ? getProject(id) : getProjectBySlug(params.slug);
    if (!project) return {};
    return {
      title: project.title,
      description: project.description,
    };
  });
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

  const discipline = getDiscipline(project.subcategory);
  const meta = DISCIPLINE_META[discipline];
  const isDesign = discipline === "design";

  const statusText = project.active ? "Active" : "Completed";
  const titleBarLabel = isDesign
    ? project.title.split(/[—–-]/)[0].trim()
    : getProjectFileName({ title: project.title, tags: project.tags });

  // Merge the cover image and all gallery shots into one collage source,
  // de-duplicating so the cover isn't repeated if it's also in `images`.
  const collageImages: CollageImage[] = [];
  const seen = new Set<string>();
  if (project.image) {
    collageImages.push({ src: project.image, srcLight: project.image_light });
    seen.add(project.image);
  }
  (project.images ?? []).forEach((src) => {
    if (!seen.has(src)) {
      collageImages.push({ src });
      seen.add(src);
    }
  });

  return (
    <main className="py-8">
      <div className="mx-auto w-full lg:w-screen lg:max-w-4xl lg:relative lg:left-1/2 lg:-translate-x-1/2 lg:px-6">
        {/* Navigation */}
        <BlurFade delay={BLUR_FADE_DELAY}>
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to Projects
            </Button>
          </Link>
        </BlurFade>

        {/* Discipline tag */}
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className={cn(
            "inline-flex items-center gap-1.5 mb-4 text-[11px] font-medium px-3 py-1 rounded-full border",
            meta.border, meta.surface, meta.accent,
            !isDesign && "font-mono"
          )}>
            {isDesign ? <PenTool className="w-3 h-3" /> : <Code2 className="w-3 h-3" />}
            {meta.label}
          </div>
        </BlurFade>

        {/* The project, expanded into its window */}
        <ProjectWindow
          discipline={discipline}
          titleBarLabel={titleBarLabel}
          active={project.active}
          status={project.year ? (project.active ? `${project.year} – Present` : `${project.year}`) : undefined}
        >
          {/* Collage masthead — cover + all gallery shots fused together */}
          {collageImages.length > 0 && (
            <div className={cn("border-b p-3 sm:p-4", meta.border)}>
              <ProjectCollage
                images={collageImages}
                title={project.title}
                discipline={discipline}
              />
            </div>
          )}

          {/* Window content */}
          <div className="p-5 sm:p-7 space-y-7">
            <div className="space-y-3">
              <h1 className={cn(
                "text-2xl sm:text-3xl tracking-tight",
                isDesign ? "font-body italic font-medium" : "font-display font-semibold"
              )}>
                {isDesign ? (
                  <span className="ink-underline">{project.title}</span>
                ) : (
                  <>
                    <span className={cn("mr-2 select-none", meta.accent)}>{">"}</span>
                    {project.title}
                  </>
                )}
              </h1>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={cn(meta.border, meta.accent, meta.surface)}>
                  {statusText}
                </Badge>
                {project.year && (
                  <span className="text-sm text-muted-foreground font-medium">
                    {project.active ? `${project.year} - Present` : project.year}
                  </span>
                )}
              </div>
            </div>

            <p className={cn(
              "text-lg leading-relaxed text-pretty",
              isDesign ? "font-body text-foreground/75" : "font-body text-foreground/75"
            )}>
              {!isDesign && <span className={cn("select-none", meta.accentSoft)}>{"// "}</span>}
              {project.description}
            </p>

            <div className="flex flex-wrap gap-10">
              {project.tags && project.tags.length > 0 && (
                <div className="flex-1 min-w-[200px]">
                  <h2 className={cn("text-xs font-medium uppercase tracking-widest mb-3", meta.accent, !isDesign && "font-mono")}>
                    {isDesign ? "Methods & Tools" : "// dependencies"}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      isDesign ? (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full border border-pink-500/25 dark:border-pink-400/25 text-pink-700/90 dark:text-pink-300/90 bg-pink-500/5"
                        >
                          {tag}
                        </span>
                      ) : (
                        <span key={tag} className="font-mono text-xs text-cyan-700/90 dark:text-cyan-300/90">
                          <span className="text-cyan-600/40 dark:text-cyan-400/40">#</span>
                          {tag.toLowerCase().replace(/[^a-z0-9]+/g, "")}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              )}

              {project.links && project.links.length > 0 && (
                <div className="flex-1 min-w-[200px]">
                  <h2 className={cn("text-xs font-medium uppercase tracking-widest mb-3", meta.accent, !isDesign && "font-mono")}>
                    {isDesign ? "Links" : "// links"}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.links.map((link, index) => (
                      <Link key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className={cn("gap-2", meta.border)}>
                          {link.icon}
                          <span>{link.type}</span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Extra content */}
            {project.content && (
              <div className="pt-2">
                <h2 className={cn("text-xs font-medium uppercase tracking-widest mb-5", meta.accent, !isDesign && "font-mono")}>
                  {isDesign ? "Details" : "// readme"}
                </h2>
                <div className="prose dark:prose-invert max-w-none font-body">
                  <div dangerouslySetInnerHTML={{ __html: project.content }} />
                </div>
              </div>
            )}
          </div>
        </ProjectWindow>
      </div>
    </main>
  );
}
