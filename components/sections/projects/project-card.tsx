import Link from "next/link";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { cn } from "../../../lib/utils";
import { ProjectLink } from "../../../lib/db";
import { Globe, Github, Video, Award, PartyPopper, ExternalLink, GamepadIcon, Figma, Book, Info, ArrowRight } from "lucide-react";
import { JSX } from "react";
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
  
  /**
   * Renders the appropriate icon based on the icon name
   * @param {string} iconName - Name of the icon to render
   * @returns {JSX.Element} The rendered icon component
   */
  const renderIcon = (iconName?: string | any) => {
    // For debugging
    if (!iconName || typeof iconName !== 'string') {
      return <Globe className="size-4" />;
    }
    
    // Map of icon names to components
    const iconMap: Record<string, JSX.Element> = {
      'globe': <Globe className="size-4" />,
      'github': <Github className="size-4" />,
      'video': <Video className="size-4" />,
      'award': <Award className="size-4" />,
      'partypopper': <PartyPopper className="size-4" />,
      'externallink': <ExternalLink className="size-4" />,
      'gamepad': <GamepadIcon className="size-4" />,
      'figma': <Figma className="size-4" />,
      'book': <Book className="size-4" />,
    };
    
    try {
      // Safe way to access the icon with type checking
      const iconKey = typeof iconName === 'string' ? iconName.toLowerCase() : '';
      return iconMap[iconKey] || <Globe className="size-3" />;
    } catch (error) {
      // Fallback to default if any error occurs
      return <Globe className="size-3" />;
    }
  };

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
        "flex flex-col overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 ease-out h-full relative border-0",
        "bg-white/80 dark:bg-black/80 backdrop-filter backdrop-blur-md border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors",
        projectUrl ? "cursor-pointer" : "",
        className
      )}
      whileHover={{ 
        scale: 1.02,
        y: 0,
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 10,
          bounce: 0.5
        }
      }}
      initial={{ scale: 1 }}
      onClick={projectUrl ? handleCardClick : undefined}
    >    
      {image && (
        <div className="relative overflow-hidden w-full h-42 rounded-t-lg">
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="object-cover w-full h-full dark:block hidden"
          />
          <Image
            src={imageLight || image}
            alt={title}
            width={500}
            height={300}
            className="object-cover w-full h-full dark:hidden block"
          />
          
        </div>
      )}

      {/* Title and Description Section */}
      <div className="flex flex-col flex-grow p-4 relative z-10">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-base">{title}</h3>
            {projectUrl && !image && (
              <Info className="size-4 text-muted-foreground" />
            )}
          </div>
          <div className="font-sans text-xs text-muted-foreground dark:text-muted-foreground text-gray-600">{dates}</div>
          <p className="prose max-w-full font-sans text-xs text-gray-700 dark:text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Tags Section */}
      {tags && tags.length > 0 && (
        <div className="px-4 pt-0 pb-2 relative z-10">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-1.5 py-2 text-[11px] h-5 rounded-md">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Links Section - Always maintain consistent padding */}
      <div className="px-4 pb-4 pt-0 relative z-10 mt-auto">
        {hasLinks && (
          <div className="flex flex-wrap gap-1.5 mt-1">   
            {links?.map((customLink, idx) => 
              customLink.href && (
                // Use div instead of Link to prevent nesting <a> within <a>
                <div 
                  key={idx}
                  onClick={(e) => handleLinkClick(e, customLink.href!)}
                  className="cursor-pointer"
                >
                  <Badge 
                    variant="outline" 
                    className="bg-black text-white dark:bg-white dark:text-black flex gap-1.5 px-1.5 py-2 text-[11px] h-6 rounded-md"
                  >
                    {renderIcon(customLink.icon)}
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