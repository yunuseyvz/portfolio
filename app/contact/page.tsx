import { DATA } from "../../data/resume";
import { Icons } from "../../components/icons";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const { email, social } = DATA.contact;

  const channels = [
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: Icons.email,
    },
    ...Object.values(social).map((s) => ({
      label: s.name,
      value: s.url.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, ""),
      href: s.url,
      icon: s.icon,
    })),
  ];

  return (
    <main className="flex flex-col space-y-10 pb-8 pt-8 sm:pt-14">
      <section id="contact" className="space-y-10">
        <div>
          <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Contact
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
            Feel free to reach out. I am always happy to talk about design,
            software, or potential collaborations.
          </p>
        </div>

        <div>
          {channels.map((channel) => (
            <Link
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between gap-4 border-b border-border py-4 first:border-t"
            >
              <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <channel.icon className="size-4 text-foreground/70" />
                {channel.label}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors group-hover:text-accent">
                {channel.value}
                <ArrowUpRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-accent" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
