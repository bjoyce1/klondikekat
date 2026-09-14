import { Mail } from "lucide-react";
import { site, type ServiceItem } from "@/lib/site-data";
import { formatPrice } from "@/components/site/ProductCard";

function mailto(subject: string) {
  return `mailto:${site.bookingEmail}?subject=${encodeURIComponent(subject)}`;
}

export function ServicePanel({ service, index }: { service: ServiceItem; index: number }) {
  return (
    <article className="booking-panel card-elevated hover-lift flex flex-col overflow-hidden rounded-sm">
      <div className="booking-panel__head flex items-center justify-between px-4 py-2 sm:px-5">
        <span className="booking-panel__tag text-[0.65rem] font-bold tracking-[0.24em] text-muted-foreground uppercase">
          Channel {String(index + 1).padStart(2, "0")}
        </span>
        <span className="booking-panel__screws" aria-hidden="true">
          <i />
          <i />
        </span>
      </div>

      <div className="booking-panel__art grain relative aspect-4/3 w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="size-full object-cover"
        />
        <span className="booking-panel__vu" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <h2 className="text-xl text-foreground sm:text-2xl">{service.title}</h2>
        <p className="mt-2 flex-1 text-sm text-muted-foreground sm:mt-3">{service.description}</p>
        <p className="mt-4 font-display text-2xl text-primary sm:mt-6 sm:text-3xl">
          From {formatPrice(service.from)}
        </p>
        <a
          href={mailto(`${service.title} — enquiry`)}
          className="tap-none mt-4 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border px-5 text-xs font-bold tracking-[0.14em] uppercase text-foreground transition-colors duration-200 hover:border-primary hover:text-primary sm:mt-6 sm:rounded-sm"
        >
          <Mail className="size-3.5 shrink-0" aria-hidden="true" />
          Request this
        </a>
      </div>
    </article>
  );
}
