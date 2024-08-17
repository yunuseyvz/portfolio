import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Contact() {
  const { email, tel, social } = DATA.contact;

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 mb-16">
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                You can reach me on
              </p>
              <div className="flex justify-center space-x-4">
                {Object.values(social).map((socialItem) => (
                  <Link key={socialItem.name} href={socialItem.url}>
                    {socialItem.name}
                  </Link>
                ))}
                <a href={`mailto:${email}`}>
                  Email
                </a>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}