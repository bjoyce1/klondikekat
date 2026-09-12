import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/site-data";
import { isDiamondDre, isOnSale, productContext } from "@/lib/shop-catalog";
import { ShopArrow, ShopPrice } from "./ShopDetails";

export function ShopProductTile({ product }: { product: Product }) {
  return (
    <article
      className={`shop-tile shop-tile-${product.category.toLowerCase()} shop-reveal`}
      data-product-handle={product.handle}
    >
      <Link
        to="/shop/$handle"
        params={{ handle: product.handle }}
        className="shop-tile-link"
        aria-label={`View ${product.title}`}
      >
        <div className="shop-tile-image">
          <img
            src={product.image}
            alt={product.title}
            width="600"
            height="600"
            loading="lazy"
            decoding="async"
          />
          <span className="shop-tile-open" aria-hidden="true">
            <ShopArrow />
          </span>
          {isOnSale(product.price, product.compareAt) && <span className="shop-sale">SALE</span>}
        </div>
        <div className="shop-tile-copy">
          <p className="shop-tile-meta">
            <span>{product.category}</span>
            <span>{productContext(product)}</span>
          </p>
          <h3>{product.title}</h3>
          <p className="shop-tile-description">{product.blurb}</p>
          <div className="shop-tile-bottom">
            <ShopPrice
              price={product.price}
              compareAt={product.compareAt}
              from={isDiamondDre(product)}
            />
            <span className="shop-tile-discover">
              VIEW {isDiamondDre(product) ? "FORMATS" : "DETAILS"}
              <ShopArrow size={14} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
