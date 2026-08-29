import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(y > 24);
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      data-scrolled={scrolled || undefined}
      className="pt-safe sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color] duration-300 border-transparent bg-background/40 data-[scrolled]:border-border data-[scrolled]:bg-background/95"
    >

      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <Link
          to="/"
          className="tap-none group flex min-h-11 min-w-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="inline-block size-2.5 shrink-0 rotate-45 bg-primary transition-transform duration-200 group-hover:rotate-[135deg]" />
          <span className="truncate font-display text-lg leading-none tracking-wide sm:text-2xl">
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
          className="tap-none inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-primary hover:text-primary lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-primary transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
    {open && (
        <nav
          aria-label="Mobile"
          className="sheet-in fixed inset-x-0 top-14 bottom-0 z-[60] overflow-y-auto border-t border-border bg-background px-4 pt-4 pb-24 sm:top-16 sm:px-6 lg:hidden"
        >
          <ul className="flex flex-col gap-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="tap-none flex min-h-14 cursor-pointer items-center rounded-lg border border-border bg-surface px-4 font-display text-2xl tracking-wide text-foreground transition-colors duration-200 active:border-primary active:text-primary"
                  activeProps={{ className: "border-primary text-primary" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${site.bookingEmail}`}
            onClick={() => setOpen(false)}
            className="tap-none mt-5 inline-flex min-h-13 w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground"
          >
          Book Kat
          </a>
        </nav>
      )}
    </>
  );
}
