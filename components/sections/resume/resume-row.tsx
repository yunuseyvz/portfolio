import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ResumeRowProps {
  title: string;
  subtitle?: string;
  href?: string;
  logoUrl?: string;
  period: string;
  description?: string;
  thesis?: string;
  meta?: readonly string[];
}

export function ResumeRow({
  title,
  subtitle,
  href,
  logoUrl,
  period,
  description,
  thesis,
  meta,
}: ResumeRowProps) {
  return (
    <div className="flex gap-4 border-b border-border py-5 last:border-0">
      {logoUrl && (
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-secondary/50 p-1.5">
          <Image
            src={logoUrl}
            alt={title}
            width={36}
            height={36}
            className="size-full object-contain"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-sm font-medium text-foreground">
            {href ? (
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>
          <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
            {period}
          </span>
        </div>
        {subtitle && (
          <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
        )}
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80">
            {description}
          </p>
        )}
        {meta && meta.length > 0 && (
          <p className="mt-2.5 font-mono text-[11px] leading-relaxed text-muted-foreground/60">
            {meta.join("  ·  ")}
          </p>
        )}
        {thesis && (
          <Link
            href={thesis}
            prefetch={false}
            className="mt-2.5 inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-accent"
          >
            Read thesis
            <ArrowUpRight className="size-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
