import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({ eyebrow, title, action, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="min-w-0">
        <p className="flex items-center gap-2.5 text-[0.65rem] font-bold tracking-[0.28em] text-primary uppercase sm:text-xs sm:tracking-[0.3em]">
          <span className="inline-block h-px w-6 bg-primary/60" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="mt-3 text-4xl text-balance sm:text-6xl">
          <span className="text-gold">{title}</span>
        </h2>
      </div>
      {action}
    </div>
  );
}
