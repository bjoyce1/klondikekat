import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { affiliations, site } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[2fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">

          <h2 className="font-display text-3xl leading-none">
            <span className="text-gold">Klondike Kat</span>
          </h2>
          <p className="mt-1 font-display text-lg tracking-[0.2em] text-muted-foreground">
            {site.tagline}
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
          <h3 className="text-sm tracking-[0.18em] text-muted-foreground">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/music", label: "Music" },
              { to: "/videos", label: "Videos" },
              { to: "/shop", label: "Shop" },
              { to: "/events", label: "Events" },
              { to: "/bio", label: "Bio" },
              { to: "/booking", label: "Booking" },
            ].map((l) => (
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
          <h3 className="text-sm tracking-[0.18em] text-muted-foreground">Affiliations</h3>
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
