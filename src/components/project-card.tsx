import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProjectLink } from "@/lib/db";
import { Globe, Github, Video, Award, PartyPopper, ExternalLink, GamepadIcon, Figma, Book } from "lucide-react";
import { JSX } from "react";
import { motion } from "framer-motion";

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
}

/**
 * ProjectCard component
 * 
 * Displays a card for a portfolio project with image, description, tags,
 * and links. Includes animation effects on hover and supports both light
 * and dark mode images.
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
}: ProjectCardProps) {
  
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

  return (
    <motion.div
      className={cn(
        "flex flex-col overflow-hidden border rounded-lg hover:shadow-lg transition-all duration-300 ease-out h-full relative",
        "backdrop-blur-xl bg-white/30 dark:bg-black/30",
        className
      )}
      whileHover={{ 
        scale: 1.03,
        y: -5,
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 10,
          bounce: 0.5
        }
      }}
      initial={{ scale: 1 }}
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
      <div className="flex flex-col flex-grow p-5 relative z-10">
        <div className="space-y-2">
          <h3 className="font-medium text-base">{title}</h3>
          <div className="font-sans text-xs text-muted-foreground">{dates}</div>
          <p className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </p>
        </div>
      </div>

      {/* Tags Section */}
      {tags && tags.length > 0 && (
        <div className="p-5 pt-0 pb-3 relative z-10">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-1.5 py-0.5 text-[11px] rounded-md">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Links Section - Always maintain consistent padding */}
      <div className="p-5 pt-0 relative z-10">
        {hasLinks && (
          <div className="flex flex-wrap gap-2 mt-1">   
            {links?.map((customLink, idx) => 
              customLink.href && (
                <Link 
                  key={idx} 
                  href={customLink.href} 
                  target="_blank"  
                  rel="noopener noreferrer"
                >
                  <Badge 
                    variant="outline" 
                    className="bg-black text-white dark:bg-white dark:text-black flex gap-2 px-2.5 py-1 text-[11px] rounded-md"
                  >
                    {renderIcon(customLink.icon)}
                    {customLink.type}
                  </Badge>
                </Link>
              )
            )}
          </div>
        )}
        {!hasLinks && <div className="h-1"></div>}
      </div>
    </motion.div>
  );
}