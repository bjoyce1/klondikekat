import { ExternalLink, Mail } from "lucide-react";
import { images, site } from "@/lib/site-data";

function mailto(subject: string) {
  return `mailto:${site.bookingEmail}?subject=${encodeURIComponent(subject)}`;
}

export function LivePathway() {
  return (
    <section className="booking-pathways border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2.5 text-[0.65rem] font-bold tracking-[0.28em] text-primary uppercase sm:text-xs sm:tracking-[0.3em]">
            <span className="inline-block h-px w-6 bg-primary/60" aria-hidden="true" />
            Two ways in
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl">
            <span className="text-gold">Pick your pathway</span>
          </h2>
        </div>

        <div className="booking-patchbay mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-2">
          <article className="booking-pathway card-elevated hover-lift grain relative flex flex-col overflow-hidden rounded-sm">
            <div className="relative aspect-16/9 w-full overflow-hidden">
              <img
                src={images.katAlt}
                alt="Klondike Kat performing live"
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-7">
              <span className="booking-pathway__jack" aria-hidden="true" />
              <h3 className="text-2xl text-foreground sm:text-3xl">Live Bookings</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                Shows, features and appearances go through BookSPC, with email as the direct line.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://bookspc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-none inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 text-xs font-bold tracking-[0.14em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85 sm:rounded-sm"
                >
                  <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
                  Book on BookSPC
                </a>
                <a
                  href={mailto("Live show enquiry — Klondike Kat")}
                  className="tap-none inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border px-5 text-xs font-bold tracking-[0.14em] uppercase text-foreground transition-colors duration-200 hover:border-primary hover:text-primary sm:rounded-sm"
                >
                  <Mail className="size-3.5 shrink-0" aria-hidden="true" />
                  Email instead
                </a>
              </div>
            </div>
          </article>

          <article className="booking-pathway card-elevated hover-lift grain relative flex flex-col overflow-hidden rounded-sm">
            <div className="relative aspect-16/9 w-full overflow-hidden">
              <img
                src={images.cookingUp}
                alt="Klondike Kat in the studio producing"
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-7">
              <span className="booking-pathway__jack" aria-hidden="true" />
              <h3 className="text-2xl text-foreground sm:text-3xl">Studio / Music Services</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                Custom beats, mixing and mastering, and collaboration sessions are booked directly by email.
              </p>
              <div className="mt-5">
                <a
                  href={mailto("Studio services enquiry — Klondike Kat")}
                  className="tap-none inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 text-xs font-bold tracking-[0.14em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85 sm:rounded-sm"
                >
                  <Mail className="size-3.5 shrink-0" aria-hidden="true" />
                  Email the studio
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
