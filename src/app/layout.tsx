"use client";

import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import Particles from "@/components/magicui/particles"; // Adjust the path as necessary
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    //if (process.env.NODE_ENV !== "development") {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitor-count');
        const data = await response.json();
        setVisitorCount(data.count);
      } catch (error) {
        console.error('Failed to fetch visitor count', error);
      }
    };

    fetchVisitorCount();
    //}
  }, []);
  

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        <Analytics />
        <SpeedInsights />
        <div className="particles-container">
          <Particles />
        </div>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
            <BlurFade delay={1}>
            <footer className="flex justify-center items-center">
              <Badge variant="secondary" className="text-[12px] flex items-center space-x-2">
                <span>Visitors: </span>
                <span>{visitorCount !== null ? visitorCount : 'Loading...'}</span>  
              </Badge>
            </footer>
            </BlurFade>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}