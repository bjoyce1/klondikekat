import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useState } from "react";
import { ProductCard, formatPrice } from "@/components/site/ProductCard";
import { products } from "@/lib/site-data";

export const Route = createFileRoute("/shop/$handle")({
  loader: ({ params }) => {
    const product = products.find((p) => p.handle === params.handle);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found | Klondike Kat" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.title} — ${formatPrice(product.price)} | Klondike Kat`;
    return {
      meta: [
        { title },
        { name: "description", content: product.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: product.blurb },
        { property: "og:type", content: "product" },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <h1 className="text-5xl text-gold">Not in stock</h1>
      <p className="mt-4 text-muted-foreground">We couldn't find that item in the store.</p>
      <Link
        to="/shop"
        className="mt-8 inline-flex min-h-12 cursor-pointer items-center rounded-sm bg-primary px-6 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors hover:bg-primary/85"
      >
        Back to shop
      </Link>
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState(product.options?.values[0] ?? "");
  const related = products.filter(
    (p) => p.category === product.category && p.handle !== product.handle,
  );

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <Link
          to="/shop"
          className="link-sweep inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-bold tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Shop
        </Link>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div className="grain overflow-hidden border border-border bg-surface">
          <img
            src={product.image}
            alt={product.title}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
            {product.category}
          </p>
          <h1 className="mt-4 text-4xl sm:text-6xl">
            <span className="text-gold">{product.title}</span>
          </h1>
          <p className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-4xl text-primary">
              {formatPrice(product.price)}
            </span>
            {product.compareAt !== undefined && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </p>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{product.blurb}</p>

          {product.options && (
            <fieldset className="mt-8">
              <legend className="text-xs font-bold tracking-[0.18em] text-muted-foreground uppercase">
                {product.options.name}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.options.values.map((v) => {
                  const active = v === size;
                  return (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSize(v)}
                      className={`inline-flex size-12 cursor-pointer items-center justify-center rounded-sm border text-sm font-bold transition-colors duration-200 ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          <a
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-none mt-9 hidden min-h-13 cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary px-8 py-3 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85 lg:inline-flex"
          >
            Buy now
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
          <p className="mt-3 hidden text-xs text-muted-foreground lg:block">
            Checkout is handled on the secure Klondike Kat store.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:pb-20">
          <h2 className="text-3xl sm:text-4xl">
            <span className="text-gold">More {product.category.toLowerCase()}</span>
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4">
            {related.slice(0, 4).map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile buy bar, sits above the tab bar */}
      <div
        style={{ bottom: "calc(3.75rem + env(safe-area-inset-bottom, 0px))" }}
        className="fixed inset-x-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden"
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs text-muted-foreground">{product.title}</p>
            <p className="font-display text-xl leading-none text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
          <a
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-none ml-auto inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground"
          >
            Buy now
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </>
  );
}
