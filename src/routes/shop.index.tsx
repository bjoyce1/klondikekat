import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { ShopFlagship } from "@/components/shop/ShopFlagship";
import { parseShopSearch } from "@/lib/shop-catalog";

export const Route = createFileRoute("/shop/")({
  validateSearch: parseShopSearch,
  search: { middlewares: [stripSearchParams({ category: "All" })] },
  head: () => ({
    meta: [
      { title: "Shop — Music, Merch & Tickets | Klondike Kat" },
      {
        name: "description",
        content:
          "Buy Klondike Kat music, hoodies, tees, caps, beat packs, concert tickets and festival passes direct from the artist.",
      },
      { property: "og:title", content: "Shop — Music, Merch & Tickets | Klondike Kat" },
      {
        property: "og:description",
        content: "Official Klondike Kat store: singles, albums, merch, tickets and beat packs.",
      },
    ],
  }),
  component: ShopPage,
});
function ShopPage() {
  const { category = "All" } = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <ShopFlagship
      category={category}
      onCategoryChange={(next) => {
        void navigate({
          search: next === "All" ? {} : { category: next },
          resetScroll: false,
        }).then(() => {
          requestAnimationFrame(() => {
            document.getElementById("shop-catalog")?.scrollIntoView({
              block: "start",
              behavior: "instant",
            });
          });
        });
      }}
    />
  );
}
