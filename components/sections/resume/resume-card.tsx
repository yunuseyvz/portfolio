"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Card, CardHeader } from "../../ui/card";
import { cn } from "../../../lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  location?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  thesis?: string;
  skills?: readonly string[];
  coursework?: readonly string[];
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  location,
  description,
  thesis,
  skills,
  coursework,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
      <Card className="flex p-4 hover:cursor-pointer group/card" onClick={handleClick}>
        <div className="flex-none">
          <Avatar className="border border-border/50 size-12 m-auto bg-background dark:bg-foreground/10 shadow-sm">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain"
            />
            <AvatarFallback className="text-xs font-medium">{altText[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="grow ml-4 items-center flex-col group">
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-medium leading-none text-sm">
                {title}
                {badges && (
                  <span className="inline-flex gap-x-1 ml-2">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="outline"
                        className="align-middle text-[10px] px-2 py-0.5"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                <ChevronRightIcon
                  className={cn(
                    "size-4 ml-1 text-accent translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover/card:translate-x-1 group-hover/card:opacity-100",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h3>
              <div className="text-xs tabular-nums text-muted-foreground text-right font-medium">
                {period}
              </div>
            </div>
            {subtitle && <div className="font-body text-sm text-muted-foreground mt-1">{subtitle}</div>}
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-3 text-sm font-body text-muted-foreground leading-relaxed"
            >
              {description}
              {skills && skills.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2.5 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {thesis && (
                <div className="mt-3" suppressHydrationWarning>
                  <Link href={thesis} passHref prefetch={false}>
                    <Badge variant="default" className="text-xs px-3 py-1.5 cursor-pointer hover:opacity-80 transition-opacity inline-flex items-center gap-1.5">
                      Read Thesis
                      <ExternalLink className="size-3" />
                    </Badge>
                  </Link>
                </div>
              )}
              {coursework && coursework.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {coursework.map((course, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2.5 py-1">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </Card>
  );
};