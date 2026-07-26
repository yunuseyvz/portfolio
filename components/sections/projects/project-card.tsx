"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ProjectLink } from "../../../data/projects";
import { cn } from "../../../lib/utils";

interface ProjectCardProps {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags?: string[];
  image?: string;
  links?: ProjectLink[];
  active?: boolean;
  className?: string;
  id?: number;
  slug?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  active,
  className,
  id,
  slug,
}: ProjectCardProps) {
  const router = useRouter();

  const projectUrl = slug ? `/projects/${slug}` : id ? `/projects/${id}` : href;

  const handleCardClick = () => {
    if (projectUrl) router.push(projectUrl);
  };

  return (
    <div
      className={cn("group", projectUrl && "cursor-pointer", className)}
      onClick={projectUrl ? handleCardClick : undefined}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-secondary/40 transition-colors group-hover:border-foreground/25">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground/30">
            <ArrowUpRight className="size-5" />
          </div>
        )}
        {active && (
          <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-sm border border-border bg-background/85 px-2 py-1 font-mono text-[10px] text-accent backdrop-blur-sm">
            <span className="size-1 rounded-full bg-accent" />
            active
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-3.5 flex items-baseline justify-between gap-3">
        <h3 className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
          {title}
          <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </h3>
        <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
          {dates}
        </span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {description}
      </p>
      {tags && tags.length > 0 && (
        <p className="mt-2 font-mono text-[11px] text-muted-foreground/50">
          {tags.slice(0, 4).join("  ·  ")}
          {tags.length > 4 && `  ·  +${tags.length - 4}`}
        </p>
      )}
    </div>
  );
}
