import Link from "next/link";
import { DATA } from "../data/resume";

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.values(DATA.contact.social);

  return (
    <footer className="mt-24 flex items-center justify-between border-t border-border py-8 font-mono text-[11px] text-muted-foreground">
      <span>© {year} {DATA.name}</span>
      <div className="flex items-center gap-4">
        {socials.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {social.name}
          </Link>
        ))}
        <a
          href={`mailto:${DATA.contact.email}`}
          className="transition-colors hover:text-foreground"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
