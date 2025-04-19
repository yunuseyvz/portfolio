"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/lib/actions";
import { Session } from "next-auth";

const BLUR_FADE_DELAY = 0.04;

interface AdminLayoutClientProps {
  session: Session;
  children: React.ReactNode;
}

export default function AdminLayoutClient({ session, children }: AdminLayoutClientProps) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/projects", label: "Projects" },
  ];

  return (
    <div className="min-h-screen bg-background/80 backdrop-blur-sm">
      <BlurFade 
        className="sticky top-0 z-50 w-full border-b backdrop-blur-lg bg-background/80"
        delay={BLUR_FADE_DELAY}
      >
        <header className="container px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                {session.user?.name}
              </p>
              <form action={signOutAction}>
                <Button variant="outline" size="sm" type="submit">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </header>
      </BlurFade>
      
      <div className="container px-4 py-6">
        <BlurFade 
          className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8"
          delay={BLUR_FADE_DELAY * 2}
        >
          <aside className="lg:w-1/5">
            <Card className="p-4 sticky top-24">
              <nav>
                <ul className="space-y-2">
                  {menuItems.map((item, i) => (
                    <BlurFade 
                      key={item.href} 
                      delay={BLUR_FADE_DELAY * 3 + i * 0.05}
                      className="w-full"
                    >
                      <li>
                        <Link
                          href={item.href}
                          className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors 
                            ${pathname === item.href 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-muted"
                            }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    </BlurFade>
                  ))}
                </ul>
              </nav>
            </Card>
          </aside>
          
          <BlurFade 
            className="flex-1"
            delay={BLUR_FADE_DELAY * 4}
          >
            <main className="p-1">{children}</main>
          </BlurFade>
        </BlurFade>
      </div>
    </div>
  );
}