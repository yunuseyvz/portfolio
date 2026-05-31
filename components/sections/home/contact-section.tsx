"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DATA } from "../../../data/resume";
import { Icons } from "../../icons";
import { GenerateCVButton } from "../resume/generate-cv-button";

const { email, social } = DATA.contact;

/**
 * Closing chapter of the home page: a friendly call-to-action plus the social
 * channels. Replaces the standalone /contact route.
 */
export function ContactSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-8 backdrop-blur-sm sm:p-12">
      {/* dual-world glow, tying the closer back to the hero */}
      <div className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full bg-pink-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -bottom-16 size-48 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="texture-grid absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent border border-accent/20">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            Open to opportunities
          </span>
          <h3 className="bg-gradient-to-r from-pink-500 via-accent to-cyan-500 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
            Let&apos;s build something.
          </h3>
          <p className="mx-auto max-w-md font-body text-base leading-relaxed text-muted-foreground">
            Whether it&apos;s a thoughtful interface or a shipped product, I&apos;d love to
            hear about it. Reach out through any of these channels.
          </p>
        </div>

        {/* social channels */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {Object.values(social).map((item, i) => (
            <SocialPill key={item.name} index={i}>
              <Link
                href={item.url}
                aria-label={item.name}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <item.icon className="size-4" />
                {item.name}
              </Link>
            </SocialPill>
          ))}
          <SocialPill index={Object.keys(social).length}>
            <a
              href={`mailto:${email}`}
              aria-label="Email"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Icons.email className="size-4" />
              Email
            </a>
          </SocialPill>
        </div>

        <div className="pt-1">
          <GenerateCVButton />
        </div>
      </div>
    </div>
  );
}

function SocialPill({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -2 }}
      className="rounded-full border border-border bg-background/70 px-4 py-2 backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent"
    >
      {children}
    </motion.div>
  );
}
