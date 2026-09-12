import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { productCategories, products, site } from "@/lib/site-data";
import {
  collectionCopy,
  collectionProducts,
  collections,
  featuredProduct,
  heroRecord,
  type ShopCategory,
} from "@/lib/shop-catalog";
import { useShopMotion } from "@/hooks/useShopMotion";
import { ShopArrow, ShopLabel, ShopPrice, ShopSignal } from "./ShopDetails";
import { ShopProductTile } from "./ShopProductTile";

export function ShopFlagship({
  category,
  onCategoryChange,
}: {
  category: ShopCategory;
  onCategoryChange: (category: ShopCategory) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  useShopMotion(root, category);
  const shown = collectionProducts(category);
  return (
    <div className="shop-store" ref={root}>
      <section className="shop-hero" aria-labelledby="store-title">
        <div className="shop-hero-inner">
          <div className="shop-hero-copy">
            <ShopLabel>KLONDIKE KAT / THE FLAGSHIP</ShopLabel>
            <h1 id="store-title">
              OFFICIAL
              <br />
              <span>STORE.</span>
            </h1>
            <p className="shop-hero-statement">STRAIGHT FROM THE KAT.</p>
            <p className="shop-hero-lead">
              The records. The signature pieces. The live experience.
              <br />
              Welcome to the official Klondike Kat collection.
            </p>
            <a className="shop-button" href="#shop-collections">
              EXPLORE THE COLLECTIONS
              <ShopArrow />
            </a>
            <p className="shop-hero-origin">{site.city}</p>
          </div>
          {featuredProduct && (
            <div className="shop-hero-stage" data-shop-stage>
              <div className="shop-stage-rule" aria-hidden="true">
                <span>KLONDIKE KAT / OFFICIAL GOODS</span>
                <i />
              </div>
              <Link
                className="shop-hero-feature"
                to="/shop/$handle"
                params={{ handle: featuredProduct.handle }}
                aria-label={`Discover the ${featuredProduct.title}`}
              >
                <div className="shop-hero-photo">
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.title}
                    width="700"
                    height="700"
                    fetchPriority="high"
                  />
                  <i className="shop-frame-corner" aria-hidden="true" />
                </div>
                <div className="shop-feature-label">
                  <span>FEATURED / OFFICIAL MERCH</span>
                  <strong>{featuredProduct.title}</strong>
                  <ShopPrice price={featuredProduct.price} compareAt={featuredProduct.compareAt} />
                  <ShopArrow />
                </div>
              </Link>
              {heroRecord && (
                <Link
                  className="shop-hero-record"
                  to="/shop/$handle"
                  params={{ handle: heroRecord.handle }}
                  aria-label={`Explore ${heroRecord.title}`}
                >
                  <img src={heroRecord.image} alt={heroRecord.title} width="240" height="240" />
                  <span>
                    THE PHYSICAL ARCHIVE
                    <ShopArrow size={13} />
                  </span>
                </Link>
              )}
              <div className="shop-plinth" aria-hidden="true">
                <i />
                <span>HOUSTON INDEPENDENT</span>
              </div>
            </div>
          )}
        </div>
        <div className="shop-hero-register">
          <span>OFFICIAL ARTIST STORE</span>
          <i aria-hidden="true" />
          <span>MUSIC · MERCH · TICKETS · PRODUCTION</span>
          <span className="shop-hero-total">
            {String(products.length).padStart(2, "0")} GOODS /{" "}
            {String(collections.length).padStart(2, "0")} COLLECTIONS
          </span>
        </div>
      </section>
      <div className="shop-collection-rail" id="shop-collections">
        <div className="shop-rail-inner">
          <span className="shop-rail-label">
            SHOP BY
            <br />
            COLLECTION
          </span>
          <div
            className="shop-collection-controls"
            role="group"
            aria-label="Filter products by category"
          >
            {productCategories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                aria-controls="shop-catalog"
                onClick={() => onCategoryChange(item)}
              >
                <span>{item === "All" ? "ALL GOODS" : item.toUpperCase()}</span>
                <small>{String(collectionProducts(item).length).padStart(2, "0")}</small>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="shop-catalog" id="shop-catalog">
        <p className="shop-result-status" role="status" aria-live="polite">
          {shown.length} {shown.length === 1 ? "item" : "items"} /{" "}
          {category === "All" ? "The complete collection" : category}
        </p>
        <div key={category} className="shop-filter-content">
          {collections
            .filter((item) => category === "All" || category === item)
            .map((item) => (
              <section
                className={`shop-collection shop-collection-${item.toLowerCase()}`}
                key={item}
                aria-labelledby={`collection-${item}`}
              >
                <div className="shop-collection-heading">
                  <div>
                    <ShopLabel>{collectionCopy[item].label}</ShopLabel>
                    <h2 id={`collection-${item}`}>{collectionCopy[item].title}</h2>
                  </div>
                  <div className="shop-collection-intro">
                    <p>{collectionCopy[item].note}</p>
                    {item === "Albums" ? (
                      <Link to="/music">
                        EXPLORE THE MUSIC ARCHIVE
                        <ShopArrow size={15} />
                      </Link>
                    ) : item === "Production" ? (
                      <ShopSignal />
                    ) : (
                      <span>
                        {String(collectionProducts(item).length).padStart(2, "0")}{" "}
                        {item.toUpperCase()} / KLONDIKE KAT
                      </span>
                    )}
                  </div>
                </div>
                <div className="shop-product-grid">
                  {collectionProducts(item).map((product) => (
                    <ShopProductTile product={product} key={product.handle} />
                  ))}
                </div>
              </section>
            ))}
        </div>
      </div>
      <section className="shop-store-closing">
        <ShopLabel>INDEPENDENT. HOUSTON. KLONDIKE KAT.</ShopLabel>
        <h2>
          MORE THAN THE GOODS.
          <br />
          <span>PART OF THE STORY.</span>
        </h2>
        <p>Every order supports independent Houston rap.</p>
        <Link className="shop-text-link" to="/music">
          STEP INTO THE MUSIC ARCHIVE
          <ShopArrow />
        </Link>
      </section>
    </div>
  );
}
