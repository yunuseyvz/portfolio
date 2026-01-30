import Image from "next/image";
import { Badge } from "../../ui/badge";
import { cn } from "../../../lib/utils";
import { ProjectLink } from "../../../data/projects";
import { Info } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

/**
 * Props for the ProjectCard component.
 * @interface ProjectCardProps
 */
interface ProjectCardProps {
  /** Title of the project */
  title: string;
  /** Optional URL that the card links to */
  href?: string;
  /** Project description */
  description: string;
  /** Time period of the project (e.g., "2023") */
  dates: string;
  /** List of technologies or skills used in the project */
  tags?: string[];
  /** Legacy link field (use links array instead) */
  link?: string;
  /** Path to the project image for dark mode */
  image?: string;
  /** Path to the project image for light mode */
  imageLight?: string;
  /** Optional URL to a video about the project */
  video?: string;
  /** Array of links related to the project (source, demo, etc.) */
  links?: ProjectLink[];
  /** Additional CSS classes to apply to the card */
  className?: string;
  /** Project ID for linking to project detail page */
  id?: number;
  /** Project slug for SEO-friendly URLs */
  slug?: string;
}

/**
 * ProjectCard component
 * 
 * Displays a card for a portfolio project with image, description, tags,
 * and links. Includes animation effects on hover and supports both light
 * and dark mode images. Cards are clickable to navigate to project detail pages.
 *
 * @param {ProjectCardProps} props - The component props
 * @returns {JSX.Element} The rendered project card
 */
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
}: ProjectCardProps) {
  const router = useRouter();

  // Check if project has any links to display
  const hasLinks = link || (links && links.length > 0 && links.some(l => l.href));

  // Determine the card's destination URL
  // Prefer slug over ID for better SEO
  const projectUrl = slug ? `/projects/${slug}` : id ? `/projects/${id}` : href;
  
  // Handler for card click
  const handleCardClick = () => {
    if (projectUrl) {
      router.push(projectUrl);
    }
  };
  
  // Handler for external link clicks
  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>, linkUrl: string) => {
    e.stopPropagation(); // Prevent card click
    window.open(linkUrl, '_blank', 'noopener,noreferrer');
  };

  // The card content
  const cardContent = (
    <motion.div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl transition-all duration-300 ease-out h-full relative group/project",
        "bg-card/60 backdrop-blur-sm border border-border/40 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5",
        projectUrl ? "cursor-pointer" : "",
        className
      )}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 15,
          bounce: 0.3
        }
      }}
      initial={{ scale: 1 }}
      onClick={projectUrl ? handleCardClick : undefined}
    >    
      {image && (
        <div className="relative overflow-hidden w-full h-44 rounded-t-xl">
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="object-cover w-full h-full dark:block hidden transition-transform duration-500 group-hover/project:scale-105"
          />
          <Image
            src={imageLight || image}
            alt={title}
            width={500}
            height={300}
            className="object-cover w-full h-full dark:hidden block transition-transform duration-500 group-hover/project:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover/project:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Title and Description Section */}
      <div className="flex flex-col grow p-5 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-base group-hover/project:text-accent transition-colors">{title}</h3>
            {projectUrl && !image && (
              <Info className="size-4 text-muted-foreground group-hover/project:text-accent transition-colors" />
            )}
          </div>
          <div className="font-display text-xs text-muted-foreground uppercase tracking-wide">{dates}</div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Tags Section */}
      {tags && tags.length > 0 && (
        <div className="px-5 pt-0 pb-3 relative z-10">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-2 py-1 text-[10px] h-auto rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Links Section - Always maintain consistent padding */}
      <div className="px-5 pb-5 pt-0 relative z-10 mt-auto">
        {hasLinks && (
          <div className="flex flex-wrap gap-2 mt-2">   
            {links?.map((customLink, idx) => 
              customLink.href && (
                // Use div instead of Link to prevent nesting <a> within <a>
                <div 
                  key={idx}
                  onClick={(e) => handleLinkClick(e, customLink.href!)}
                  className="cursor-pointer"
                >
                  <Badge 
                    variant="default" 
                    className="flex gap-1.5 px-3 py-1.5 text-[11px] h-auto rounded-full"
                  >
                    {customLink.icon}
                    {customLink.type}
                  </Badge>
                </div>
              )
            )}
          </div>
        )}
        
       
      </div>
    </motion.div>
  );

  // Return just the card content, no wrapping Link
  return cardContent;
}