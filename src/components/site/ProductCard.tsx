import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/site-data";

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/shop/$handle"
      params={{ handle: product.handle }}
      className="tap-none group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-200 hover:border-primary active:border-primary sm:rounded-sm"
    >
      <div className="grain relative aspect-square overflow-hidden bg-surface-2">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="size-full object-cover transition-opacity duration-300 group-hover:opacity-85"
        />
        <span className="absolute top-2.5 left-2.5 rounded-full bg-background/85 px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.14em] text-primary uppercase sm:top-3 sm:left-3 sm:rounded-none sm:text-[0.65rem] sm:tracking-[0.16em]">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="text-base leading-tight text-foreground sm:text-lg">{product.title}</h3>
        <p className="mt-1.5 flex-1 text-sm text-muted-foreground sm:mt-2">{product.blurb}</p>
        <p className="mt-3 flex items-baseline gap-2 sm:mt-4">
          <span className="font-display text-xl text-primary sm:text-2xl">
            {formatPrice(product.price)}
          </span>
          {product.compareAt !== undefined && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
