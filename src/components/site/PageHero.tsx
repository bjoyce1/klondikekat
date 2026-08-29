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
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
        <p className="text-[0.65rem] font-bold tracking-[0.28em] text-primary uppercase sm:text-xs sm:tracking-[0.3em]">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl sm:mt-4 sm:text-7xl lg:text-8xl">
          <span className="text-gold">{title}</span>
        </h1>
        {lead && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:mt-6 sm:text-lg">
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
