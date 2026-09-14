import { ExternalLink, Mail } from "lucide-react";
import { images, site } from "@/lib/site-data";

function mailto(subject: string) {
  return `mailto:${site.bookingEmail}?subject=${encodeURIComponent(subject)}`;
}

const CATEGORIES = ["Live", "Production", "Mixing", "Collaborations"];

export function BookingHero() {
  return (
    <section className="booking-hero grain relative isolate overflow-hidden border-b border-border bg-surface">
      <div className="booking-hero__bg" aria-hidden="true">
        <img
          src={images.studioSession}
          alt=""
          className="size-full object-cover"
        />
        <div className="booking-hero__scrim" />
        <div className="booking-hero__rail booking-hero__rail--top" />
        <div className="booking-hero__rail booking-hero__rail--bottom" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24">
        <p className="booking-kicker flex items-center gap-2.5 text-[0.65rem] font-bold tracking-[0.28em] text-primary uppercase sm:text-xs sm:tracking-[0.3em]">
          <span className="inline-block h-px w-6 bg-primary/60" aria-hidden="true" />
          The Booking Desk
        </p>

        <h1 className="mt-3 text-[2.5rem] leading-[0.95] text-balance sm:mt-5 sm:text-7xl lg:text-8xl">
          <span className="text-gold">WORK WITH KAT</span>
        </h1>

        <ul className="booking-cats mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase sm:mt-6 sm:gap-x-5 sm:text-sm">
          {CATEGORIES.map((c, i) => (
            <li key={c} className="flex items-center gap-3">
              {i > 0 && <span className="booking-cats__dot text-primary/60" aria-hidden="true">·</span>}
              <span>{c}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 max-w-2xl text-[0.95rem] text-pretty text-muted-foreground sm:mt-6 sm:text-lg">
          Studio work and live bookings, handled personally. Tell us what you need and we&rsquo;ll quote it.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row">
          <a
            href={mailto("Booking enquiry — Klondike Kat")}
            className="tap-none inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85 sm:min-h-12 sm:rounded-sm"
          >
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            Start an enquiry
          </a>
          <a
            href="https://bookspc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="tap-none inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border px-6 text-sm font-bold tracking-[0.12em] uppercase text-foreground transition-colors duration-200 hover:border-primary hover:text-primary sm:min-h-12 sm:rounded-sm"
          >
            <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
            Book a show on BookSPC
          </a>
        </div>

        <p className="mt-3 text-xs break-all text-muted-foreground">
          {site.bookingEmail}
        </p>
      </div>
    </section>
  );
}
