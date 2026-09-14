import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { affiliations, site } from "@/lib/site-data";

const LINKS = [
  { to: "/music", label: "Music" },
  { to: "/podcast", label: "Podcast" },
  { to: "/videos", label: "Videos" },
  { to: "/shop", label: "Shop" },
  { to: "/events", label: "Events" },
  { to: "/bio", label: "Bio" },
  { to: "/booking", label: "Booking" },
] as const;

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-primary/25 bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-6 -z-10 select-none text-center font-display text-[19vw] leading-none tracking-[0.06em] text-foreground/[0.035]"
      >
        KLONDIKE KAT
      </div>

      <div className="grain mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[2fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <p className="flex items-center gap-2 text-[0.6rem] font-bold tracking-[0.34em] text-muted-foreground uppercase">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-destructive" />
            End slate
          </p>
          <h2 className="mt-3 font-display text-3xl leading-none">
            <span className="text-gold">Klondike Kat</span>
          </h2>
          <p className="mt-1 font-display text-lg tracking-[0.2em] text-muted-foreground">
            {site.tagline}
          </p>
          <p className="mt-2 text-[0.65rem] font-bold tracking-[0.28em] text-primary uppercase">
            {site.city}
          </p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Houston underground rap pioneer out of {site.city}. Thirty years deep and still
            recording.
          </p>
          <a
            href={`mailto:${site.bookingEmail}`}
            className="link-sweep mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold break-all text-primary sm:mt-6"
          >
            <Mail className="size-4" aria-hidden="true" />
            {site.bookingEmail}
          </a>
        </div>

        <nav aria-label="Footer">
          <h3 className="border-b border-primary/30 pb-2 text-[0.65rem] font-bold tracking-[0.24em] text-muted-foreground uppercase">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="link-sweep cursor-pointer text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="border-b border-primary/30 pb-2 text-[0.65rem] font-bold tracking-[0.24em] text-muted-foreground uppercase">
            Crews &amp; connections
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {affiliations.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Klondike Kat. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
