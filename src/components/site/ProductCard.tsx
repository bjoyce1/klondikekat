import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/site-data";

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.compareAt !== undefined && product.compareAt > product.price;

  return (
    <Link
      to="/shop/$handle"
      params={{ handle: product.handle }}
      className="tap-none card-elevated hover-lift group flex cursor-pointer flex-col overflow-hidden rounded-xl sm:rounded-sm"
    >
      <div className="grain media-zoom relative aspect-square bg-surface-2">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
        <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-background/80 px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.14em] text-primary uppercase backdrop-blur-sm sm:top-3 sm:left-3 sm:rounded-none sm:text-[0.65rem] sm:tracking-[0.16em]">
          {product.category}
        </span>
        {onSale && (
          <span className="absolute top-2.5 right-2.5 z-10 rounded-full bg-ember px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.14em] text-background uppercase sm:top-3 sm:right-3 sm:rounded-none">
            Sale
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="text-base leading-tight text-foreground transition-colors duration-200 group-hover:text-primary sm:text-lg">
          {product.title}
        </h3>
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
