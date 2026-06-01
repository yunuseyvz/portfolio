"use client";

import { useEffect, useState } from "react";
import { Dock, DockIcon } from "./ui/dock";
import { buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
import { DATA } from "../data/resume";
import { cn } from "../lib/utils";
import Link from "next/link";

export default function Navbar() {
  // The dock is a fixed, decorative overlay built from framer-motion springs
  // and Radix tooltips, which don't render deterministically on the server.
  // Rendering it only after mount keeps it out of the SSR HTML entirely, so
  // there is nothing for React to mismatch during hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex h-14 origin-bottom items-end justify-center">
      <div
        aria-hidden
        className=""
      />
      <Dock className="z-50 pointer-events-auto relative mx-auto flex h-full items-center px-2 bg-card/90 backdrop-blur-xl rounded-full border border-border/50 [box-shadow:0_4px_30px_rgba(0,0,0,.08)] transform-gpu dark:border-border/30 dark:[box-shadow:0_4px_30px_rgba(0,0,0,.3)]">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-11 rounded-full hover:bg-accent/10 hover:text-accent transition-colors"
                  )}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="font-display text-xs">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        <Separator orientation="vertical" className="h-6 mx-1" />
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-11 rounded-full hover:bg-accent/10 hover:text-accent transition-colors"
                    )}
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="font-display text-xs">
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
      </Dock>
    </div>
  );
}
