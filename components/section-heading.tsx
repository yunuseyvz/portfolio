interface SectionHeadingProps {
  index: string;
  title: string;
}

export function SectionHeading({ index, title }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-baseline gap-3 border-b border-border pb-3">
      <span className="font-mono text-[11px] text-accent">{index}</span>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h2>
    </div>
  );
}
