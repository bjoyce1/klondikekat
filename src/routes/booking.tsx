import { createFileRoute } from "@tanstack/react-router";
import { BookingHero } from "@/components/booking/BookingHero";
import { ServicePanel } from "@/components/booking/ServicePanel";
import { BookingProcess } from "@/components/booking/BookingProcess";
import { LivePathway } from "@/components/booking/LivePathway";
import { services } from "@/lib/site-data";
import bookingCss from "@/styles/booking.css?url";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Work With Kat — Booking & Studio Services | Klondike Kat" },
      {
        name: "description",
        content:
          "Book Klondike Kat for live shows via BookSPC, custom beat production from $200, mixing and mastering from $150, or a collaboration session from $200.",
      },
      { property: "og:title", content: "Work With Kat — Booking & Studio Services | Klondike Kat" },
      {
        property: "og:description",
        content: "Live bookings, custom beats, mixing and mastering, and collaboration sessions.",
      },
    ],
    links: [{ rel: "stylesheet", href: bookingCss }],
  }),
  component: BookingPage,
});

function BookingPage() {
  return (
    <div className="booking-page">
      <BookingHero />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2.5 text-[0.65rem] font-bold tracking-[0.28em] text-primary uppercase sm:text-xs sm:tracking-[0.3em]">
            <span className="inline-block h-px w-6 bg-primary/60" aria-hidden="true" />
            Studio rack
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl">
            <span className="text-gold">Session services</span>
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:gap-6 sm:mt-10 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServicePanel key={s.title} service={s} index={i} />
          ))}
        </div>
      </section>

      <BookingProcess />

      <LivePathway />
    </div>
  );
}
