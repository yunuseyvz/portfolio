"use client";

import Image from "next/image";
import { Badge } from "../../ui/badge";
import { cn } from "../../../lib/utils";
import { ProjectLink, Discipline, getProjectFileName } from "../../../data/projects";
import { ArrowUpRight, GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ProjectCategory } from "../../../data/projects";

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
  active?: boolean;
  category?: ProjectCategory;
  subcategory?: string;
  discipline?: Discipline;
  /** "featured" = large horizontal card for active projects; "list" = compact row; "grid" = default grid tile; "design"/"engineering" = discipline-themed */
  variant?: "featured" | "list" | "grid" | "design" | "engineering";
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
  active,
  category,
  subcategory,
  discipline,
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

  /* ─── Design world: editorial "sketch card" ─────────────────── */
  if (variant === "design") {
    return (
      <motion.div
        className={cn(
          "group/card relative flex flex-col overflow-hidden rounded-2xl h-full cursor-pointer",
          "bg-card/70 backdrop-blur-sm border border-pink-500/15 dark:border-pink-400/15",
          "hover:border-pink-500/40 dark:hover:border-pink-400/40",
          "transition-[border-color,box-shadow,background-color] duration-300 hover:shadow-xl hover:shadow-pink-500/10",
          className
        )}
        whileHover={{ y: -4, rotate: -0.4 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        onClick={projectUrl ? handleCardClick : undefined}
      >
        {/* paper texture wash — subtle so it never fights the text */}
        <div className="texture-paper absolute inset-0 opacity-25 pointer-events-none" />

        {image && (
          <div className="relative z-10 mx-3 mt-3 overflow-hidden rounded-xl h-40 border border-pink-500/10 dark:border-pink-400/10 group-hover/card:rotate-0 transition-transform duration-500">
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="object-cover w-full h-full dark:block hidden transition-transform duration-700 group-hover/card:scale-[1.04]"
            />
            <Image
              src={imageLight || image}
              alt={title}
              width={500}
              height={300}
              className="object-cover w-full h-full dark:hidden block transition-transform duration-700 group-hover/card:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/30 to-transparent" />
          </div>
        )}

        <div className="relative z-10 flex flex-col grow p-5 gap-2.5">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-600/90 dark:text-pink-400/90">
            <span className="font-mono">{dates}</span>
            {subcategory && (
              <>
                <span className="opacity-40">/</span>
                <span className="truncate">{subcategory}</span>
              </>
            )}
          </div>
          <h3 className="font-body text-lg leading-snug italic text-foreground group-hover/card:text-pink-600 dark:group-hover/card:text-pink-400 transition-colors">
            <span className="ink-underline">{title}</span>
          </h3>
          <p className="text-sm text-foreground/70 font-body leading-relaxed line-clamp-3">
            {description}
          </p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full border border-pink-500/25 dark:border-pink-400/25 text-pink-700/80 dark:text-pink-300/80 bg-pink-500/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {links && links.some((l) => l.href) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {links
                .filter((l) => l.href)
                .map((l, i) => (
                  <div key={i} onClick={(e) => handleLinkClick(e, l.href!)} className="cursor-pointer">
                    <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-700 dark:text-pink-300 hover:bg-pink-500/20 transition-colors">
                      {l.icon}
                      {l.type}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity">
          <ArrowUpRight className="w-4 h-4 text-pink-600 dark:text-pink-400" />
        </div>
      </motion.div>
    );
  }

  /* ─── Engineering world: terminal / source-file card ─────────── */
  if (variant === "engineering") {
    const fileLabel = getProjectFileName({ title, tags: tags ?? [] });
    return (
      <motion.div
        className={cn(
          "group/card relative flex flex-col overflow-hidden rounded-xl h-full cursor-pointer font-mono",
          "bg-card/80 backdrop-blur-sm border border-cyan-500/15 dark:border-cyan-400/15",
          "hover:border-cyan-500/40 dark:hover:border-cyan-400/40",
          "transition-[border-color,box-shadow,background-color] duration-300 hover:shadow-xl hover:shadow-cyan-500/10",
          className
        )}
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 350, damping: 24 }}
        onClick={projectUrl ? handleCardClick : undefined}
      >
        {/* title bar */}
        <div className="relative z-10 flex items-center gap-2 px-3.5 py-2 border-b border-cyan-500/15 dark:border-cyan-400/15 bg-cyan-500/[0.04]">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </span>
          <span className="text-[11px] text-cyan-700/70 dark:text-cyan-300/70 truncate ml-1">
            {fileLabel}
          </span>
          {active && (
            <span className="ml-auto inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Active
            </span>
          )}
        </div>

        {/* grid texture body — subtle so code text stays legible */}
        <div className="texture-grid absolute inset-0 opacity-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col grow p-4 gap-2.5">
          <div className="flex items-baseline gap-2 min-h-[2.75rem]">
            <span className="text-cyan-600 dark:text-cyan-400 select-none">{">"}</span>
            <h3 className="font-display font-semibold text-base leading-snug text-foreground group-hover/card:text-cyan-600 dark:group-hover/card:text-cyan-400 transition-colors line-clamp-2">
              {title}
            </h3>
          </div>
          <p className="text-xs text-foreground/65 leading-relaxed line-clamp-3 min-h-[3.75rem] font-body">
            <span className="text-cyan-600/60 dark:text-cyan-400/60 select-none">{"// "}</span>
            {description}
          </p>

          {image && (
            <div className="relative overflow-hidden rounded-md h-32 border border-cyan-500/10 dark:border-cyan-400/10 mt-1">
              <Image
                src={image}
                alt={title}
                width={500}
                height={300}
                className="object-cover w-full h-full dark:block hidden transition-transform duration-500 group-hover/card:scale-[1.03]"
              />
              <Image
                src={imageLight || image}
                alt={title}
                width={500}
                height={300}
                className="object-cover w-full h-full dark:hidden block transition-transform duration-500 group-hover/card:scale-[1.03]"
              />
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1.5 text-[10px]">
              {tags.slice(0, 5).map((tag) => (
                <span key={tag} className="text-cyan-700/80 dark:text-cyan-300/80">
                  <span className="text-cyan-600/40 dark:text-cyan-400/40">#</span>
                  {tag.toLowerCase().replace(/[^a-z0-9]+/g, "")}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-auto pt-2 min-h-[1.5rem] border-t border-cyan-500/10 dark:border-cyan-400/10">
            <span className="text-[10px] text-muted-foreground">{dates}</span>
            {links && links.some((l) => l.href) ? (
              <div className="flex flex-wrap items-center gap-2.5">
                {links
                  .filter((l) => l.href)
                  .map((l, i) => (
                    <div key={i} onClick={(e) => handleLinkClick(e, l.href!)} className="cursor-pointer">
                      <span className="inline-flex items-center gap-1 text-[10px] text-cyan-700 dark:text-cyan-300 hover:underline [&_svg]:w-3 [&_svg]:h-3">
                        {l.icon}
                        {l.type}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <ArrowUpRight className="w-3 h-3 text-cyan-600 dark:text-cyan-400 opacity-0 group-hover/card:opacity-100 transition-opacity" />
            )}
          </div>
        </div>
      </motion.div>
    );
  }

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
        active && "ring-1 ring-green-500/30 dark:ring-green-400/30",
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
          {active && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
              </span>
              Active
            </div>
          )}
          <div className="absolute top-3 right-3 opacity-0 group-hover/project:opacity-100 transition-opacity duration-200">
            <div className="bg-background/80 backdrop-blur-sm rounded-full p-1.5 shadow">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
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
      <div className="px-5 pb-5 flex items-center justify-between mt-auto">
        {hasLinks && (
          <div className="flex flex-wrap gap-2">
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
        {category && (
          <div className={cn("ml-auto flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full border", 
            category === "private" 
              ? "bg-sky-500/5 text-sky-600 dark:text-sky-400 border-sky-500/15 dark:border-sky-400/15" 
              : "bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 border-indigo-500/15 dark:border-indigo-400/15"
          )}>
            {category === "private" ? <Briefcase className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
            {category === "private" ? "Private" : "Uni"}
          </div>
        )}
      </div>
    </motion.div>
  );
}