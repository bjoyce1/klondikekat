import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { formatPrice } from "@/components/site/ProductCard";
import { events, services } from "@/lib/site-data";

export function LiveAndWork() {
  return (
    <section id="live" className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-20 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="On stage" title="Live shows" />
          <ul className="mt-8 space-y-4">
            {events.map((e) => (
              <li key={e.title} className="card-elevated hover-lift rounded-sm bg-background p-5">
                <h3 className="text-2xl text-foreground">{e.title}</h3>
                {(e.venue || e.city) && (
                  <p className="mt-1 text-sm font-bold tracking-[0.12em] text-primary uppercase">
                    {[e.venue, e.city].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="mt-2 text-sm text-muted-foreground">{e.detail}</p>
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-bold tracking-[0.14em] text-primary uppercase"
                >
                  Register
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeading eyebrow="In the lab" title="Work with Kat" />
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {services.map((s) => (
              <li key={s.title} className="flex items-center justify-between gap-4 py-4">
                <span className="text-lg font-semibold text-foreground">{s.title}</span>
                <span className="font-display text-xl whitespace-nowrap text-primary">
                  From {formatPrice(s.from)}
                </span>
              </li>
            ))}
          </ul>
          <Link
            to="/booking"
            className="mt-8 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm bg-primary px-6 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
          >
            <Mail className="size-4" aria-hidden="true" />
            Start a booking
          </Link>
        </div>
      </div>
    </section>
  );
}
