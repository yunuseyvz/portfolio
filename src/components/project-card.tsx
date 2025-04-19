import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProjectLink } from "@/lib/db";
import { Globe, Github, Video, Award, PartyPopper, ExternalLink } from "lucide-react";
import { JSX } from "react";

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
}: ProjectCardProps) {
  
  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName?: string | any) => {
    // For debugging
    if (!iconName || typeof iconName !== 'string') {
      return <Globe className="size-3" />;
    }
    
    // Map of icon names to components - accommodate different naming conventions
    const iconMap: Record<string, JSX.Element> = {
      'globe': <Globe className="size-3" />,
      'github': <Github className="size-3" />,
      'video': <Video className="size-3" />,
      'award': <Award className="size-3" />,
      'partypopper': <PartyPopper className="size-3" />,
      'partyPopper': <PartyPopper className="size-3" />,
      'externallink': <ExternalLink className="size-3" />,
      'externalLink': <ExternalLink className="size-3" />
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

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full card-hover-animation",
        className
      )}
    >
      {video && (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
        />
      )}
      
      {image && (
        <div className="relative overflow-hidden w-full h-48">
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

      <div className="flex flex-col flex-grow p-4">
        <div className="space-y-1">
          <h3 className="mt-1 text-base">{title}</h3>
          <div className="font-sans text-xs">{dates}</div>
          <p className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </p>
        </div>
      </div>

      <div className="p-4 border-t bg-muted/30 dark:bg-muted/10">
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-1 py-0 text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Links Section */}
      <div className="p-4 pt-0">
        {(links?.length > 0 || link) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {/* If there's a primary link, add it first */}
            {link && (
              <Link href={link} target="_blank" rel="noopener noreferrer">
                <Badge variant="outline" className="flex gap-2 px-2 py-1 text-[10px]">
                  <Globe className="size-3" />
                  View Project
                </Badge>
              </Link>
            )}
            
            {/* Additional custom links */}
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
                    className="flex gap-2 px-2 py-1 text-[10px]"
                  >
                    {renderIcon(customLink.icon)}
                    {customLink.type}
                  </Badge>
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}