"use client";

import Image from "next/image";
import { Badge } from "../../ui/badge";
import { cn } from "../../../lib/utils";
import { ProjectLink } from "../../../data/projects";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags?: string[];
  link?: string;
  image?: string;
  imageLight?: string;
  video?: string;
  links?: ProjectLink[];
  className?: string;
  id?: number;
  slug?: string;
  /** "featured" = large horizontal card for active projects; "list" = compact row; "grid" = default grid tile */
  variant?: "featured" | "list" | "grid";
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  imageLight,
  video,
  links,
  className,
  id,
  slug,
  variant = "grid",
}: ProjectCardProps) {
  const router = useRouter();

  const projectUrl = slug ? `/projects/${slug}` : id ? `/projects/${id}` : href;

  const handleCardClick = () => {
    if (projectUrl) router.push(projectUrl);
  };

  const handleLinkClick = (e: React.MouseEvent, linkUrl: string) => {
    e.stopPropagation();
    window.open(linkUrl, "_blank", "noopener,noreferrer");
  };

  /* ─── Featured (active projects) ─────────────────────────────── */
  if (variant === "featured") {
    return (
      <motion.div
        className={cn(
          "group/card relative flex flex-col-reverse sm:flex-row overflow-hidden rounded-2xl",
          "bg-card border border-border hover:border-accent/60",
          "transition-all duration-300 hover:shadow-lg hover:shadow-accent/5",
          projectUrl ? "cursor-pointer" : "",
          className
        )}
        onClick={projectUrl ? handleCardClick : undefined}
      >
        {/* Content */}
        <div className="flex flex-col justify-between p-4 sm:p-5 flex-1 min-w-0 gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-green-600 dark:text-green-500 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Active · {dates}
              </span>
            </div>
            <h3 className="text-xl font-semibold leading-snug group-hover/card:text-accent transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          <div className="space-y-3">
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 6).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5 rounded-full h-auto">
                    {tag}
                  </Badge>
                ))}
                {tags.length > 6 && (
                  <Badge variant="secondary" className="text-[10px] px-2 py-0.5 rounded-full h-auto">
                    +{tags.length - 6}
                  </Badge>
                )}
              </div>
            )}
            {links && links.some((l) => l.href) && (
              <div className="flex flex-wrap gap-2">
                {links
                  .filter((l) => l.href)
                  .map((l, i) => (
                    <div key={i} onClick={(e) => handleLinkClick(e, l.href!)} className="cursor-pointer">
                      <Badge variant="default" className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 h-auto rounded-full">
                        {l.icon}
                        {l.type}
                      </Badge>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Image */}
        {image && (
          <div className="relative overflow-hidden sm:w-52 h-40 sm:h-auto flex-shrink-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover dark:block hidden transition-transform duration-500 transform-gpu group-hover/card:scale-[1.03]"
            />
            <Image
              src={imageLight || image}
              alt={title}
              fill
              className="object-cover dark:hidden block transition-transform duration-500 transform-gpu group-hover/card:scale-[1.03]"
            />
            {/* Gradient overlay → fades into card on sm */}
            <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent sm:bg-gradient-to-l sm:from-transparent sm:via-transparent sm:to-card/60" />
            <div className="absolute top-3 right-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
              <div className="bg-background/80 backdrop-blur-sm rounded-full p-1.5 shadow">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  /* ─── List row (completed projects) ──────────────────────────── */
  if (variant === "list") {
    return (
      <motion.div
        className={cn(
          "group/row flex items-start gap-4 py-4 px-3 rounded-xl -mx-3",
          "hover:bg-muted/70 transition-colors duration-200",
          projectUrl ? "cursor-pointer" : "",
          className
        )}
        onClick={projectUrl ? handleCardClick : undefined}
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-muted border border-border/60 mt-0.5">
          {image ? (
            <>
              <Image
                src={image}
                alt={title}
                width={48}
                height={48}
                unoptimized
                className="object-cover w-full h-full dark:block hidden"
              />
              <Image
                src={imageLight || image}
                alt={title}
                width={48}
                height={48}
                unoptimized
                className="object-cover w-full h-full dark:hidden block"
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold group-hover/row:text-accent transition-colors leading-snug">
              {title}
            </span>
            <ArrowUpRight className="flex-shrink-0 w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover/row:opacity-100 transition-opacity" />
          </div>
          <p className="text-xs text-foreground/60 leading-relaxed line-clamp-2">
            {description}
          </p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5 rounded-full h-auto font-normal">
                  {tag}
                </Badge>
              ))}
              {tags.length > 4 && (
                <Badge variant="secondary" className="text-[10px] px-2 py-0.5 rounded-full h-auto font-normal">
                  +{tags.length - 4}
                </Badge>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  /* ─── Grid tile (default / fallback) ─────────────────────────── */
  const hasLinks = link || (links && links.length > 0 && links.some((l) => l.href));

  return (
    <motion.div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl h-full relative group/project cursor-pointer",
        "bg-card/60 backdrop-blur-sm border border-border/40 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5",
        className
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onClick={projectUrl ? handleCardClick : undefined}
    >
      {image && (
        <div className="relative overflow-hidden w-full h-44 rounded-t-xl">
          <Image src={image} alt={title} width={500} height={300} className="object-cover w-full h-full dark:block hidden transition-transform duration-500 group-hover/project:scale-105" />
          <Image src={imageLight || image} alt={title} width={500} height={300} className="object-cover w-full h-full dark:hidden block transition-transform duration-500 group-hover/project:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover/project:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="flex flex-col grow p-5 space-y-2">
        <h3 className="font-medium text-base group-hover/project:text-accent transition-colors">{title}</h3>
        <div className="text-xs text-muted-foreground uppercase tracking-wide">{dates}</div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{description}</p>
      </div>
      {tags && tags.length > 0 && (
        <div className="px-5 pb-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-2 py-1 text-[10px] h-auto rounded-full">{tag}</Badge>
          ))}
        </div>
      )}
      {hasLinks && (
        <div className="px-5 pb-5 flex flex-wrap gap-2 mt-auto">
          {links?.map((l, idx) =>
            l.href && (
              <div key={idx} onClick={(e) => handleLinkClick(e, l.href!)} className="cursor-pointer">
                <Badge variant="default" className="flex gap-1.5 px-3 py-1.5 text-[11px] h-auto rounded-full">
                  {l.icon}{l.type}
                </Badge>
              </div>
            )
          )}
        </div>
      )}
    </motion.div>
  );
}