"use client"; 

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { CoolMode } from "@/components/magicui/cool-mode";
import { FaDownload } from 'react-icons/fa'
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Particles from "@/components/magicui/particles";
import NumberTicker from "@/components/magicui/number-ticker";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      const fetchVisitorCount = async () => {
        try {
          const response = await fetch("https://visit-counter.vercel.app/counter?page=yuemya.de");
          const count = await response.text();
          setVisitorCount(Number(count));
          console.log("Visitor count:", count);
        } catch (error) {
          console.error("Failed to fetch visitor count:", error);
        }
      };
      fetchVisitorCount();
    } else {
      setVisitorCount(0);
      console.log("Visitor count not fetched in development mode.");
    }
  }, []);
  

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 mb-16">     
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <CoolMode>
                <Avatar className="size-36 border">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </CoolMode>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
                description={education.description}
                thesis={education.thesis}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
                location={work.location}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="cv">
        <div className="flex justify-center items-center">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <Link href="/CV.pdf" passHref target="_blank">
              <Badge variant="secondary" className="text-[12px] flex items-center space-x-2">
                <FaDownload /> 
                <span>Download CV</span>
              </Badge>
            </Link>
          </BlurFade>
        </div>
      </section>
      <section id="visitors">
        <div className="flex justify-center items-center">
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
              <Badge variant="secondary" className="text-[12px] flex items-center space-x-2">
                <span>Visitors: </span>
                <NumberTicker value={visitorCount}/>
              </Badge>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}