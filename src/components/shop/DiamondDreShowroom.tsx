import { useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { diamondDre, products, type Product } from "@/lib/site-data";
import { useShopMotion } from "@/hooks/useShopMotion";
import { useMusicPreview } from "@/hooks/useMusicPreview";
import { previewTime } from "@/lib/music-catalog";
import { isOnSale } from "@/lib/shop-catalog";
import { CheckoutLink, CheckoutNote, ShopArrow, ShopLabel, ShopPrice } from "./ShopDetails";
import {
  MobileShopBuyBar,
  ShopBreadcrumb,
  ShopImageStage,
  ShopRelatedProducts,
} from "./ShopProductShowroom";

const formats = [
  {
    id: "cd",
    label: "PHYSICAL CD",
    price: diamondDre.cdPrice,
    href: diamondDre.cdUrl,
    compareAt: diamondDre.cdCompareAt,
  },
  { id: "album", label: "ALBUM DOWNLOAD", price: diamondDre.albumPrice, href: diamondDre.albumUrl },
  {
    id: "songs",
    label: "INDIVIDUAL SONGS",
    price: diamondDre.singlePrice,
    href: "#shop-tracklist",
  },
] as const;
export function DiamondDreShowroom() {
  const root = useRef<HTMLDivElement>(null);
  const [formatId, setFormatId] = useState<"cd" | "album" | "songs">("cd");
  const format = formats.find((item) => item.id === formatId) ?? formats[0];
  const player = useMusicPreview();
  useShopMotion(root, "diamond-dre");
  const product: Product = products.find((item) => item.handle === diamondDre.handle) ?? {
    handle: diamondDre.handle,
    title: diamondDre.title,
    image: diamondDre.image,
    category: "Albums",
    price: diamondDre.singlePrice,
    blurb: diamondDre.blurb,
    externalUrl: diamondDre.albumUrl,
  };
  return (
    <div className="shop-detail shop-diamond" ref={root}>
      <ShopBreadcrumb title={diamondDre.title} category="Albums" />
      <section className="shop-showroom" aria-labelledby="shop-product-title">
        <ShopImageStage product={product} caption="CD / ALBUM DOWNLOAD / INDIVIDUAL SONGS" />
        <div className="shop-purchase-panel">
          <ShopLabel>DIAMOND DRE / THE COMPLETE PROJECT</ShopLabel>
          <h1 id="shop-product-title">{diamondDre.title}</h1>
          <p className="shop-product-description">{diamondDre.blurb}</p>
          <fieldset className="shop-dre-formats">
            <legend>CHOOSE YOUR FORMAT</legend>
            {formats.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.id === formatId}
                onClick={() => setFormatId(item.id)}
              >
                <i aria-hidden="true" />
                <span>
                  {item.label}
                  {item.id === "cd" && isOnSale(item.price, item.compareAt) && (
                    <small className="shop-sale-inline">SALE</small>
                  )}
                </span>
                <ShopPrice
                  price={item.price}
                  compareAt={"compareAt" in item ? item.compareAt : undefined}
                />
                {item.id === "songs" && <small>EACH</small>}
              </button>
            ))}
          </fieldset>
          <div className="shop-format-checkout" aria-live="polite">
            {format.id === "songs" ? (
              <a className="shop-button" href="#shop-tracklist">
                CHOOSE A SONG
                <ShopArrow />
              </a>
            ) : (
              <CheckoutLink href={format.href}>
                {format.id === "cd" ? "BUY THE PHYSICAL CD" : "BUY THE ALBUM DOWNLOAD"}
              </CheckoutLink>
            )}
          </div>
          <CheckoutNote />
        </div>
      </section>
      <section
        className="shop-dre-tracks"
        id="shop-tracklist"
        aria-labelledby="shop-tracklist-title"
      >
        <div className="shop-related-heading">
          <div>
            <ShopLabel>
              THE MASTER SHEET / {String(diamondDre.tracks.length).padStart(2, "0")} TRACKS
            </ShopLabel>
            <h2 id="shop-tracklist-title">PICK YOUR RECORD.</h2>
          </div>
          <p>
            Every track is available individually.
            <br />
            Choose a song to continue to the official store.
          </p>
        </div>
        <div className="shop-track-head" aria-hidden="true">
          <span>TRACK / TITLE</span>
          <span>DIGITAL SINGLE</span>
        </div>
        <ol>
          {diamondDre.tracks.map((track, index) => {
            const active = player.active?.title === track.title;
            const playing = active && player.playing;
            const failed = active && player.error;
            return (
              <li key={track.title}>
                <span className="shop-track-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="shop-track-name">
                  <h3>{track.title}</h3>
                  <p>{track.audioUrl ? "60-SECOND PREVIEW" : "PREVIEW COMING SOON"}</p>
                </div>
                {track.audioUrl && (
                  <button
                    className="shop-track-play"
                    type="button"
                    aria-label={`${failed ? "Retry" : playing ? "Pause" : "Play"} preview of ${track.title}`}
                    onClick={() => {
                      void player.toggle({
                        title: track.title,
                        image: diamondDre.image,
                        audioUrl: track.audioUrl!,
                      });
                    }}
                  >
                    {failed ? (
                      <RotateCcw size={16} aria-hidden="true" />
                    ) : playing ? (
                      <Pause size={16} aria-hidden="true" />
                    ) : (
                      <Play size={16} aria-hidden="true" />
                    )}
                  </button>
                )}
                <ShopPrice price={diamondDre.singlePrice} />
                <CheckoutLink href={track.externalUrl} className="shop-song-buy">
                  <span className="sr-only">{track.title} — </span>BUY SONG
                </CheckoutLink>
              </li>
            );
          })}
        </ol>
        <audio ref={player.audioRef} hidden preload="none" />
        {player.active && (
          <div className="shop-track-preview" role="region" aria-label="Diamond Dre preview">
            <span>{player.active.title}</span>
            <span role="status">
              {player.error
                ? "Preview unavailable. Try again."
                : player.playing
                  ? "Playing"
                  : "Paused"}
            </span>
            <progress max={player.duration} value={player.elapsed} aria-label="Preview progress" />
            <span>
              {previewTime(player.elapsed)} / {previewTime(player.duration)}
            </span>
            <button type="button" onClick={player.close}>
              STOP PREVIEW
            </button>
          </div>
        )}
      </section>
      <ShopRelatedProducts product={product} />
      <MobileShopBuyBar
        title={`Diamond Dre / ${format.label.toLowerCase()}`}
        price={format.price}
        href={format.href}
        choose={format.id === "songs"}
      />
    </div>
  );
}
