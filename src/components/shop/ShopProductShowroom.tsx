import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { products, type Product } from "@/lib/site-data";
import { productContext } from "@/lib/shop-catalog";
import { useShopMotion } from "@/hooks/useShopMotion";
import { CheckoutLink, CheckoutNote, ShopArrow, ShopLabel, ShopPrice } from "./ShopDetails";
import { ShopProductTile } from "./ShopProductTile";

export function ShopBreadcrumb({
  title,
  category,
}: {
  title: string;
  category?: Product["category"];
}) {
  return (
    <nav className="shop-breadcrumb" aria-label="Breadcrumb">
      <Link to="/shop">OFFICIAL STORE</Link>
      <span aria-hidden="true">/</span>
      {category && (
        <>
          <span>{category}</span>
          <span aria-hidden="true">/</span>
        </>
      )}
      <span aria-current="page">{title}</span>
    </nav>
  );
}
export function ShopImageStage({
  product,
  caption,
}: {
  product: Pick<Product, "title" | "image" | "category">;
  caption: string;
}) {
  return (
    <figure
      className={`shop-product-stage shop-stage-${product.category.toLowerCase()}`}
      data-shop-stage
    >
      <div className="shop-product-image">
        <img
          src={product.image}
          alt={product.title}
          width="800"
          height="800"
          fetchPriority="high"
        />
        <span className="shop-stage-edge" aria-hidden="true" />
      </div>
      <figcaption>
        <span>KLONDIKE KAT / OFFICIAL STORE</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
export function MobileShopBuyBar({
  title,
  price,
  href,
  sizes = false,
  choose = false,
}: {
  title: string;
  price: number;
  href: string;
  sizes?: boolean;
  choose?: boolean;
}) {
  return (
    <aside className="shop-buy-bar" aria-label="Product purchase">
      <div className="shop-buy-product">
        <p>{title}</p>
        <ShopPrice price={price} />
        {sizes && <span>Final size selected at checkout</span>}
      </div>
      {choose ? (
        <a className="shop-button" href={href}>
          CHOOSE SONG
          <ShopArrow />
        </a>
      ) : (
        <CheckoutLink href={href}>BUY NOW</CheckoutLink>
      )}
    </aside>
  );
}
export function ShopRelatedProducts({ product }: { product: Product }) {
  const related = products
    .filter((item) => item.category === product.category && item.handle !== product.handle)
    .slice(0, 4);
  if (!related.length) return null;
  return (
    <section className="shop-related" aria-labelledby="shop-related-title">
      <div className="shop-related-heading">
        <div>
          <ShopLabel>KEEP EXPLORING</ShopLabel>
          <h2 id="shop-related-title">MORE {product.category.toUpperCase()}.</h2>
        </div>
        <Link
          to="/shop"
          search={{ category: product.category === "Singles" ? "All" : product.category }}
          className="shop-text-link"
        >
          VIEW THE COLLECTION
          <ShopArrow />
        </Link>
      </div>
      <div className="shop-related-grid">
        {related.map((item) => (
          <ShopProductTile product={item} key={item.handle} />
        ))}
      </div>
    </section>
  );
}
export function ShopProductShowroom({ product }: { product: Product }) {
  const root = useRef<HTMLDivElement>(null);
  useShopMotion(root, product.handle);
  const [size, setSize] = useState(product.options?.values[0] ?? "");
  return (
    <div className="shop-detail" ref={root}>
      <ShopBreadcrumb title={product.title} category={product.category} />
      <section className="shop-showroom" aria-labelledby="shop-product-title">
        <ShopImageStage product={product} caption={productContext(product)} />
        <div className="shop-purchase-panel">
          <ShopLabel>{product.category} / OFFICIAL COLLECTION</ShopLabel>
          <h1 id="shop-product-title">{product.title}</h1>
          <ShopPrice price={product.price} compareAt={product.compareAt} />
          <p className="shop-product-description">{product.blurb}</p>
          <p className="shop-format-label">{productContext(product)}</p>
          {product.options && (
            <fieldset className="shop-size-options" aria-describedby="shop-size-note">
              <legend>
                {product.options.name} <span>VIEW OPTIONS</span>
              </legend>
              <div>
                {product.options.values.map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={size === value}
                    onClick={() => setSize(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <p id="shop-size-note">
                Your choice here is for reference. Select your final size again in the official
                store.
              </p>
            </fieldset>
          )}
          {product.category === "Tickets" && (
            <div className="shop-event-note">
              <span>BEFORE YOU BUY</span>
              <p>Review the date, venue, and entry details in the official store.</p>
            </div>
          )}
          <CheckoutLink href={product.externalUrl} />
          <CheckoutNote sizes={Boolean(product.options)} />
        </div>
      </section>
      <ShopRelatedProducts product={product} />
      <MobileShopBuyBar
        title={product.title}
        price={product.price}
        href={product.externalUrl}
        sizes={Boolean(product.options)}
      />
    </div>
  );
}
export function ShopNotFound() {
  return (
    <div className="shop-not-found">
      <ShopLabel>OFFICIAL STORE / CATALOG</ShopLabel>
      <p className="shop-missing-index" aria-hidden="true">
        —
      </p>
      <h1>ITEM NOT FOUND.</h1>
      <p>This item isn’t available in the current store catalog.</p>
      <Link className="shop-button" to="/shop">
        BACK TO THE STORE
        <ShopArrow />
      </Link>
    </div>
  );
}
