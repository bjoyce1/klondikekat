import { createFileRoute } from "@tanstack/react-router";
import { LiveHero } from "@/components/events/LiveHero";
import { ShowBill } from "@/components/events/ShowBill";
import { LiveGoods } from "@/components/events/LiveGoods";
import { PromoterCta } from "@/components/events/PromoterCta";
import { events, products } from "@/lib/site-data";
import eventsCss from "@/styles/events.css?url";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Live | Klondike Kat" },
      {
        name: "description",
        content:
          "Klondike Kat live — the tour board, ticket booth and booking line. Real shows, real tickets, no invented dates.",
      },
      { property: "og:title", content: "Live | Klondike Kat" },
      {
        property: "og:description",
        content: "Catch Klondike Kat live. Tickets, festival passes and booking, straight up.",
      },
    ],
    links: [{ rel: "stylesheet", href: eventsCss }],
  }),
  component: EventsPage,
});

function EventsPage() {
  const liveGoodsProducts = products.filter(
    (p) => p.handle === "concert-ticket" || p.handle === "festival-pass",
  );

  return (
    <div className="live-page">
      <LiveHero />
      <ShowBill events={events} />
      <LiveGoods products={liveGoodsProducts} />
      <PromoterCta />
    </div>
  );
}
