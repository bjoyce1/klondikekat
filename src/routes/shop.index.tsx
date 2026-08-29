import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { ProductCard } from "@/components/site/ProductCard";
import { productCategories, products } from "@/lib/site-data";

export const Route = createFileRoute("/shop/")({
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
  const [category, setCategory] = useState<(typeof productCategories)[number]>("All");
  const list = category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <>
      <PageHero
        eyebrow="Official store"
        title="Shop"
        lead="Music, merch and tickets straight from the Kat. Every order supports independent Houston rap."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div
          role="group"
          aria-label="Filter products by category"
          className="flex flex-wrap gap-2"
        >
          {productCategories.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(c)}
                className={`inline-flex min-h-11 cursor-pointer items-center rounded-sm border px-4 text-xs font-bold tracking-[0.14em] uppercase transition-colors duration-200 ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
