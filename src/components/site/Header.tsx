import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site-data";

const NAV = [
  { to: "/music", label: "Music" },
  { to: "/videos", label: "Videos" },
  { to: "/shop", label: "Shop" },
  { to: "/events", label: "Events" },
  { to: "/bio", label: "Bio" },
  { to: "/booking", label: "Booking" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="group flex min-h-11 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="inline-block size-3 rotate-45 bg-primary transition-transform duration-200 group-hover:rotate-[135deg]" />
          <span className="font-display text-xl leading-none tracking-wide sm:text-2xl">
            <span className="text-gold">Klondike Kat</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-sweep cursor-pointer text-sm font-semibold tracking-[0.14em] uppercase text-muted-foreground transition-colors duration-200 hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${site.bookingEmail}`}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-sm bg-primary px-5 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
          >
            Book Kat
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-sm border border-border text-foreground transition-colors duration-200 hover:border-primary hover:text-primary lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-border bg-background px-4 pb-6 sm:px-6 lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 cursor-pointer items-center border-b border-border font-display text-2xl tracking-wide text-foreground transition-colors duration-200 hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${site.bookingEmail}`}
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-sm bg-primary px-5 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground"
          >
            Book Kat
          </a>
        </nav>
      )}
    </header>
  );
}
