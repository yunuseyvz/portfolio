"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/lib/actions";
import { Session } from "next-auth";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const BLUR_FADE_DELAY = 0.04;

interface AdminLayoutClientProps {
  session: Session;
  children: React.ReactNode;
}

export default function AdminLayoutClient({ session, children }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const menuItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/projects", label: "Projects" },
  ];

  // Get initials for avatar fallback
  const getInitials = (name?: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background/80 backdrop-blur-sm">
      <BlurFade 
        className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80"
        delay={BLUR_FADE_DELAY}
      >
        <header className="container px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                aria-label="Toggle navigation menu"
              >
                {mobileNavOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <line x1="4" y1="6" x2="20" y2="6"></line>
                    <line x1="4" y1="18" x2="20" y2="18"></line>
                  </svg>
                )}
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user?.image || undefined} alt={session.user?.name || "User"} />
                  <AvatarFallback>{getInitials(session.user?.name)}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground">
                  {session.user?.name}
                </p>
              </div>
              <form action={signOutAction}>
                <Button variant="outline" size="sm" type="submit">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center border-t py-2">
            <nav className="flex space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors 
                    ${pathname === item.href 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Mobile navigation */}
          {mobileNavOpen && (
            <BlurFade
              className="md:hidden py-2 pb-4 border-t"
              delay={0}
            >
              <nav>
                <ul className="space-y-2">
                  {menuItems.map((item, i) => (
                    <li key={`mobile-${item.href}`}>
                      <Link
                        href={item.href}
                        className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors 
                          ${pathname === item.href 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-muted"
                          }`}
                        onClick={() => setMobileNavOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </BlurFade>
          )}
        </header>
      </BlurFade>
      
      <div className="container px-4 py-6">
        <BlurFade 
          className="w-full"
          delay={BLUR_FADE_DELAY * 2}
        >
          <main className="p-1">{children}</main>
        </BlurFade>
      </div>
    </div>
  );
}