import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">{eyebrow}</p>
        <h1 className="mt-4 text-5xl sm:text-7xl lg:text-8xl">
          <span className="text-gold">{title}</span>
        </h1>
        {lead && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
