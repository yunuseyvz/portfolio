import BlurFade from "../components/ui/blur-fade";
import BlurFadeText from "../components/ui/blur-fade-text";
import { ResumeCard } from "../components/sections/resume/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { DATA } from "../data/resume";
import Markdown from "react-markdown";
import { CoolMode } from "../components/ui/cool-mode";
import { GenerateCVButton } from "../components/sections/resume/generate-cv-button";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-dvh space-y-14 mb-10">     
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-6 flex justify-between items-center">
            <div className="flex-col flex flex-1 space-y-3">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tight sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] text-muted-foreground font-body text-lg md:text-xl leading-relaxed"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <CoolMode>
                <Avatar className="size-32 sm:size-36 border-2 border-accent/20 shadow-xl shadow-accent/5 ring-4 ring-background">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback className="text-2xl font-semibold">{DATA.initials}</AvatarFallback>
                </Avatar>
              </CoolMode>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-sm font-medium uppercase tracking-widest text-accent mb-4">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-body text-base leading-relaxed text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-sm font-medium uppercase tracking-widest text-accent mb-2">Education</h2>
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
                period={education.period}
                description={education.description}
                thesis={education.thesis}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-sm font-medium uppercase tracking-widest text-accent mb-2">Work Experience</h2>
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
                period={work.period}
                description={work.description}
                location={work.location}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-sm font-medium uppercase tracking-widest text-accent mb-2">Skills & Tools</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill} variant="secondary">{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="cv">
        <div className="flex justify-center items-center pt-4">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <GenerateCVButton />
          </BlurFade>
        </div>
      </section>
    </main>
  );
}