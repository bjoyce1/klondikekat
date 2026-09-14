import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/site-data";
import { formatPrice } from "@/components/site/ProductCard";

export function LiveGoods({ products }: { products: Product[] }) {
  return (
    <section className="live-goods" aria-labelledby="live-goods-title">
      <div className="live-goods-head">
        <p className="live-eyebrow">
          <span className="live-tally" aria-hidden="true" />
          Booth
        </p>
        <h2 id="live-goods-title" className="live-bill-title">
          Live <span className="live-gold">goods</span>
        </h2>
      </div>

      <div className="live-goods-grid">
        {products.map((product) => (
          <Link
            key={product.handle}
            to="/shop/$handle"
            params={{ handle: product.handle }}
            className="live-goods-card"
          >
            <div className="live-goods-media">
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                decoding="async"
                className="live-goods-img"
              />
              <span className="live-goods-grille" aria-hidden="true" />
            </div>
            <div className="live-goods-body">
              <h3 className="live-goods-name">{product.title}</h3>
              <p className="live-goods-blurb">{product.blurb}</p>
              <span className="live-goods-price">{formatPrice(product.price)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
