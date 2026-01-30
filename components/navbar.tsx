import { Dock, DockIcon } from "./ui/dock";
import { ModeToggle } from "./mode-toggle";
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
import { LockKeyhole } from "lucide-react";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-2 bg-card/90 backdrop-blur-xl rounded-full border border-border/50 [box-shadow:0_4px_30px_rgba(0,0,0,.08)] transform-gpu dark:border-border/30 dark:[box-shadow:0_4px_30px_rgba(0,0,0,.3)]">
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
        <Separator orientation="vertical" className="h-6 mx-1" />
        <DockIcon>
          <ModeToggle />
        </DockIcon>
      </Dock>
    </div>
  );
}
