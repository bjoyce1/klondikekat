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
      className="group flex cursor-pointer flex-col border border-border bg-surface transition-colors duration-200 hover:border-primary"
    >
      <div className="grain relative aspect-square overflow-hidden bg-surface-2">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="size-full object-cover transition-opacity duration-300 group-hover:opacity-85"
        />
        <span className="absolute top-3 left-3 bg-background/85 px-2 py-1 text-[0.65rem] font-bold tracking-[0.16em] text-primary uppercase">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg leading-tight text-foreground">{product.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{product.blurb}</p>
        <p className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-2xl text-primary">{formatPrice(product.price)}</span>
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
