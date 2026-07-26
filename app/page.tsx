import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { SectionHeading } from "../components/section-heading";
import { ResumeRow } from "../components/sections/resume/resume-row";
import { GenerateCVButton } from "../components/sections/resume/generate-cv-button";
import { DATA } from "../data/resume";
import Link from "next/link";
import { Braces, Mail, PenTool } from "lucide-react";

export default function Page() {
  const socials = Object.values(DATA.contact.social);

  return (
    <main className="flex flex-col space-y-16 pb-8">
      {/* Hero */}
      <section className="pt-8 sm:pt-14">
        <Avatar className="size-14 border border-border">
          <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
          <AvatarFallback className="font-mono text-xs">
            {DATA.initials}
          </AvatarFallback>
        </Avatar>
        <h1 className="mt-6 font-display text-4xl font-medium tracking-tight sm:text-5xl">
          {DATA.name}
        </h1>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
          {DATA.description} — {DATA.location}
        </p>

        {/* Design / Development split */}
        <div className="mt-8 grid gap-6 border-y border-border py-6 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-border">
          <div className="sm:pr-8">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground">
              <PenTool className="size-3.5 text-accent" />
              Design
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              Pursuing my M.Sc. in Human Computer Interaction at LMU Munich —
              prototyping, user research, and interaction design.
            </p>
          </div>
          <div className="sm:pl-8">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground">
              <Braces className="size-3.5 text-accent" />
              Software Development
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              Working student at Rohde&nbsp;&amp;&nbsp;Schwarz — building
              fullstack web applications with TypeScript, React, and Next.js.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-5">
          <a
            href={`mailto:${DATA.contact.email}`}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-accent"
          >
            <Mail className="size-3.5" />
            Email
          </a>
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-accent"
            >
              <social.icon className="size-3.5" />
              {social.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="work">
        <SectionHeading index="01" title="Experience" />
        <div>
          {DATA.work.map((work) => (
            <ResumeRow
              key={work.company}
              title={work.company}
              subtitle={work.title}
              href={work.href}
              logoUrl={work.logoUrl}
              period={work.period}
              description={work.description}
              meta={work.skills}
            />
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education">
        <SectionHeading index="02" title="Education" />
        <div>
          {DATA.education.map((education) => (
            <ResumeRow
              key={education.degree}
              title={education.school}
              subtitle={education.degree}
              href={education.href}
              logoUrl={education.logoUrl}
              period={education.period}
              description={education.description}
              thesis={education.thesis}
              meta={education.coursework}
            />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills">
        <SectionHeading index="03" title="Skills" />
        <div>
          {Object.entries(DATA.skills).map(([category, skills]) => (
            <div
              key={category}
              className="grid grid-cols-1 gap-1 border-b border-border py-4 last:border-0 sm:grid-cols-[200px_1fr] sm:gap-4"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground sm:pt-0.5">
                {category}
              </span>
              <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                {skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 text-sm text-foreground/80"
                    >
                      <Icon className="size-3.5 text-muted-foreground" />
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CV */}
      <section id="cv">
        <GenerateCVButton />
      </section>
    </main>
  );
}
