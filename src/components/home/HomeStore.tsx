import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/site-data";

const PREVIEW_HANDLES = ["signature-hoodie", "klondike-kat-t-shirt", "limited-edition-cap", "beats-for-days"];

export function HomeStore() {
  const preview = products.filter((p) => PREVIEW_HANDLES.includes(p.handle));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24">
      <SectionHeading
        eyebrow="Official store"
        title="Merch & music"
        action={
          <Link
            to="/shop"
            className="link-sweep min-h-11 cursor-pointer text-sm font-bold tracking-[0.14em] text-primary uppercase"
          >
            Shop all
          </Link>
        }
      />
      <div className="hc-store-rail snap-rail -mx-4 mt-8 px-4 sm:mx-0 sm:mt-10 sm:grid sm:gap-5 sm:px-0 sm:grid-cols-2 lg:grid-cols-4">
        {preview.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>
    </section>
  );
}
