import {
  GraduationCap,
  Briefcase,
  Wrench,
  User,
  FolderGit2,
  Mail,
} from "lucide-react";
import BlurFade from "../components/ui/blur-fade";
import { DATA } from "../data/resume";
import { getFeaturedProjects } from "../data/projects";
import { DualityHero } from "../components/sections/home/duality-hero";
import { Chapter } from "../components/sections/home/chapter";
import { ScrollRevealText } from "../components/sections/home/scroll-reveal-text";
import { JourneyTimeline, JourneyEntry } from "../components/sections/home/journey-timeline";
import { SkillsGrid } from "../components/sections/home/skills-grid";
import { ProjectsShowcase } from "../components/sections/home/projects-showcase";
import { ContactSection } from "../components/sections/home/contact-section";
import {
  ScrollProgress,
  SectionNav,
  NavSection,
} from "../components/sections/home/scroll-progress";

const BLUR_FADE_DELAY = 0.04;

const SECTIONS: NavSection[] = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "cv", label: "Contact" },
];

export default function Page() {
  const educationEntries: JourneyEntry[] = DATA.education.map((e) => ({
    title: e.school,
    subtitle: e.degree,
    period: e.period,
    description: e.description,
    logoUrl: e.logoUrl,
    altText: e.school,
    tags: e.coursework,
  }));

  const workEntries: JourneyEntry[] = DATA.work.map((w) => ({
    title: w.company,
    subtitle: w.title,
    period: w.period,
    description: w.description,
    logoUrl: w.logoUrl,
    altText: w.company,
    tags: w.skills,
  }));

  const projects = getFeaturedProjects();

  return (
    <>
      <ScrollProgress />
      <SectionNav sections={SECTIONS} />

      <main className="flex flex-col min-h-dvh space-y-24 mb-16">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <DualityHero />
        </BlurFade>

        {/* ── 01 · About ──────────────────────────────────────────── */}
        <section id="about" className="scroll-mt-24 space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Chapter index="01" icon={<User className="size-4" />} title="About" hint="// whoami" />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
            <ScrollRevealText
              text={DATA.summary}
              className="font-body text-xl leading-relaxed text-foreground sm:text-2xl"
            />
          </BlurFade>
        </section>

        {/* ── 02 · Education ──────────────────────────────────────── */}
        <section id="education" className="scroll-mt-24 space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Chapter
              index="02"
              icon={<GraduationCap className="size-4" />}
              title="Education"
              hint="the foundation"
            />
          </BlurFade>
          <JourneyTimeline entries={educationEntries} />
        </section>

        {/* ── 03 · Work ───────────────────────────────────────────── */}
        <section id="work" className="scroll-mt-24 space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Chapter
              index="03"
              icon={<Briefcase className="size-4" />}
              title="Work Experience"
              hint="in the field"
            />
          </BlurFade>
          <JourneyTimeline entries={workEntries} />
        </section>

        {/* ── 04 · Skills ─────────────────────────────────────────── */}
        <section id="skills" className="scroll-mt-24 space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Chapter index="04" icon={<Wrench className="size-4" />} title="Skills & Tools" hint="// my toolbox" />
          </BlurFade>
          <SkillsGrid />
        </section>

        {/* ── 05 · Projects ───────────────────────────────────────── */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Chapter
              index="05"
              icon={<FolderGit2 className="size-4" />}
              title="Selected Work"
              hint="design · code"
            />
          </BlurFade>
          <ProjectsShowcase projects={projects} />
        </section>

        {/* ── 06 · Contact ────────────────────────────────────────── */}
        <section id="cv" className="scroll-mt-24 space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Chapter
              index="06"
              icon={<Mail className="size-4" />}
              title="Get in Touch"
              hint="// say hello"
            />
          </BlurFade>
          <ContactSection />
        </section>
      </main>
    </>
  );
}
