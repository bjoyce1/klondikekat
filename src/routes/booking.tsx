import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Mail } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { images, services, site } from "@/lib/site-data";
import { formatPrice } from "@/components/site/ProductCard";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Booking, Beats, Mixing & Collabs | Klondike Kat" },
      {
        name: "description",
        content:
          "Book Klondike Kat for shows, custom beat production from $200, mixing and mastering from $150, or a collaboration session from $200.",
      },
      { property: "og:title", content: "Booking, Beats, Mixing & Collabs | Klondike Kat" },
      {
        property: "og:description",
        content: "Custom beats, mixing and mastering, collaboration sessions and live bookings.",
      },
    ],
  }),
  component: BookingPage,
});

function mailto(subject: string) {
  return `mailto:${site.bookingEmail}?subject=${encodeURIComponent(subject)}`;
}

function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Book Kat"
        lead="Studio work and live bookings, handled personally. Tell us what you need and we'll quote it."
      >
        <div className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row">
          <a
            href={mailto("Booking enquiry — Klondike Kat")}
            className="tap-none inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85 sm:min-h-12 sm:rounded-sm"
          >
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            <span className="sm:hidden">Email booking</span>
            <span className="hidden truncate sm:inline">{site.bookingEmail}</span>
          </a>
          <a
            href="https://bookspc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="tap-none inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border px-6 text-sm font-bold tracking-[0.12em] uppercase text-foreground transition-colors duration-200 hover:border-primary hover:text-primary sm:min-h-12 sm:rounded-sm"
          >
            <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
            <span className="sm:hidden">Book on BookSPC</span>
            <span className="hidden sm:inline">Book a show on BookSPC</span>
          </a>
        </div>
        <p className="mt-3 text-xs break-all text-muted-foreground sm:hidden">
          {site.bookingEmail}
        </p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="card-elevated hover-lift flex flex-col rounded-sm p-5 sm:p-7"
            >
              <h2 className="text-xl text-foreground sm:text-2xl">{s.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground sm:mt-3">{s.description}</p>
              <p className="mt-4 font-display text-2xl text-primary sm:mt-6 sm:text-3xl">
                From {formatPrice(s.from)}
              </p>
              <a
                href={mailto(`${s.title} — enquiry`)}
                className="tap-none mt-4 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-border px-5 text-xs font-bold tracking-[0.14em] uppercase text-foreground transition-colors duration-200 hover:border-primary hover:text-primary sm:mt-6 sm:rounded-sm"
              >
                Request this
              </a>
            </article>
          ))}
        </div>
      </section>


      <section className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="grain media-zoom card-elevated rounded-sm">
            <img
              src={images.collab}
              alt="Collaboration session in the studio"
              loading="lazy"
              className="aspect-4/3 w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl sm:text-5xl">
              <span className="text-gold">How it works</span>
            </h2>
            <ol className="mt-8 space-y-6">
              {[
                {
                  t: "Send the details",
                  d: "Email the project, dates, budget and references. The more detail, the faster the quote.",
                },
                {
                  t: "Lock the scope",
                  d: "We agree on deliverables, revisions and timeline before any deposit.",
                },
                {
                  t: "Get to work",
                  d: "Beats, mixes and features delivered in industry-standard formats, ready to release.",
                },
              ].map((step, i) => (
                <li key={step.t} className="flex gap-5">
                  <span className="font-display text-3xl text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-xl text-foreground">{step.t}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{step.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
