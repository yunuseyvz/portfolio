"use client";

import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Tooltip>
    <TooltipTrigger asChild>
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="rounded-full size-11 hover:bg-accent/10 hover:text-accent transition-colors"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="h-[1.1rem] w-[1.1rem] dark:hidden transition-transform duration-300 hover:rotate-45" />
      <MoonIcon className="hidden h-[1.1rem] w-[1.1rem] dark:block transition-transform duration-300 hover:-rotate-12" />
    </Button>
    </TooltipTrigger>
    <TooltipContent className="font-display text-xs">
      <p>Toggle theme</p>
    </TooltipContent> 
    </Tooltip>
  );
}
