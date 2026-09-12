import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { formatPrice } from "@/components/site/ProductCard";
import { isOnSale } from "@/lib/shop-catalog";

export function ShopArrow({ size = 18 }: { size?: number }) {
  return <ArrowUpRight size={size} aria-hidden="true" />;
}
export function ShopLabel({ children }: { children: ReactNode }) {
  return (
    <p className="shop-label">
      <i aria-hidden="true" />
      {children}
    </p>
  );
}
export function ShopPrice({
  price,
  compareAt,
  from = false,
}: {
  price: number;
  compareAt?: number | undefined;
  from?: boolean;
}) {
  return (
    <span className="shop-price">
      {from && <small>FROM</small>}
      <strong>{formatPrice(price)}</strong>
      {compareAt !== undefined && isOnSale(price, compareAt) && (
        <>
          <span className="sr-only">Previously</span>
          <s>{formatPrice(compareAt)}</s>
        </>
      )}
    </span>
  );
}
export function CheckoutLink({
  href,
  children = "CONTINUE TO CHECKOUT",
  className = "",
}: {
  href: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`shop-button ${className}`}>
      {children}
      <ShopArrow />
    </a>
  );
}
export function CheckoutNote({ sizes = false }: { sizes?: boolean }) {
  return (
    <div className="shop-checkout-note">
      <span>OFFICIAL STORE / EXTERNAL CHECKOUT</span>
      <p>
        You’ll continue to klondikekat.com in a new tab.
        {sizes ? " Choose your final size there." : ""}
      </p>
    </div>
  );
}
export function ShopSignal() {
  return (
    <svg className="shop-signal" viewBox="0 0 180 32" aria-hidden="true">
      {Array.from({ length: 45 }, (_, index) => {
        const height = 3 + ((index * 7) % 26);
        return (
          <path
            key={index}
            d={`M${index * 4 + 1} ${(32 - height) / 2}v${height}`}
            stroke="currentColor"
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}
