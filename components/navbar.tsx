"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DATA } from "../data/resume";
import { cn } from "../lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="flex items-center justify-between py-6 sm:py-8">
      <Link
        href="/"
        className="font-display text-sm font-medium tracking-tight text-foreground transition-colors hover:text-accent"
      >
        {DATA.name}
      </Link>
      <nav className="flex items-center gap-5">
        {DATA.navbar.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative font-mono text-[11px] uppercase tracking-[0.15em] transition-colors",
              isActive(item.href)
                ? "text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-accent"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
