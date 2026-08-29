import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Ticket } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { events, images, products } from "@/lib/site-data";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Live Shows & Tickets | Klondike Kat" },
      {
        name: "description",
        content:
          "Upcoming Klondike Kat live shows and festival appearances. Grab concert tickets and festival passes direct.",
      },
      { property: "og:title", content: "Live Shows & Tickets | Klondike Kat" },
      {
        property: "og:description",
        content: "Catch the Lyrical Lion live. Tickets and festival passes available now.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const ticketProducts = products.filter((p) => p.category === "Tickets");

  return (
    <>
      <PageHero
        eyebrow="Live"
        title="Shows"
        lead="Where to catch Klondike Kat next, plus tickets and passes."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <ul className="space-y-5">
          {events.map((e) => (
            <li
              key={e.title}
              className="card-elevated hover-lift flex flex-col gap-5 rounded-sm p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <CalendarDays className="mt-1 size-6 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h2 className="text-2xl text-foreground sm:text-3xl">{e.title}</h2>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">{e.detail}</p>
                </div>
              </div>
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary px-6 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
              >
                <Ticket className="size-4" aria-hidden="true" />
                Register
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-3xl sm:text-5xl">
            <span className="text-gold">Tickets & passes</span>
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ticketProducts.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_minmax(0,480px)] lg:items-center lg:gap-16">
        <div>
          <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Promoters</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">
            <span className="text-gold">Book the show</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Running a festival, club night or private event? Send the details and we'll get back to
            you with availability and rates.
          </p>
          <Link
            to="/booking"
            className="mt-8 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm bg-primary px-6 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
          >
            Booking enquiry
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grain media-zoom card-elevated rounded-sm">
          <img
            src={images.katAlt}
            alt="Klondike Kat on stage"
            loading="lazy"
            className="aspect-4/5 w-full object-cover"
          />
        </div>
      </section>
    </>
  );
}
