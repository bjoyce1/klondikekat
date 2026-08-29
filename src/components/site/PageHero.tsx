import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <section className="grain relative isolate overflow-hidden border-b border-border bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 -z-10 size-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-20">
        <p className="flex items-center gap-2.5 text-[0.65rem] font-bold tracking-[0.28em] text-primary uppercase sm:text-xs sm:tracking-[0.3em]">
          <span className="inline-block h-px w-6 bg-primary/60" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="mt-2 text-[2.25rem] text-balance sm:mt-4 sm:text-7xl lg:text-8xl">
          <span className="text-gold">{title}</span>
        </h1>
        {lead && (
          <p className="mt-3 max-w-2xl text-[0.95rem] text-pretty text-muted-foreground sm:mt-6 sm:text-lg">
            {lead}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
