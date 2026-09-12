import { diamondDre, productCategories, products, releases, type Product } from "./site-data";

export type ShopCategory = (typeof productCategories)[number];
export type CollectionCategory = Exclude<ShopCategory, "All">;
export const collections: CollectionCategory[] = productCategories.filter(
  (category) => category !== "All",
);
export const collectionCopy: Record<
  CollectionCategory,
  { label: string; title: string; note: string }
> = {
  Albums: {
    label: "THE RECORD ROOM",
    title: "OWN THE RECORD.",
    note: "Physical releases and the Diamond Dre project. A catalog with Houston at its core.",
  },
  Merch: {
    label: "THE WARDROBE",
    title: "WEAR THE NAME.",
    note: "The signature hoodie, classic tee, and limited edition caps. Official Klondike Kat goods.",
  },
  Tickets: {
    label: "THE LIVE COUNTER",
    title: "TAKE IT LIVE.",
    note: "Concert tickets and festival passes. Review event details in the official store before checkout.",
  },
  Production: {
    label: "THE STUDIO",
    title: "FROM THE BOOTH.",
    note: "The production side of Klondike Kat. Explore the beat catalog.",
  },
};
export function parseShopSearch(search: Record<string, unknown>): { category?: ShopCategory } {
  const category = productCategories.find((item) => item === search["category"]);
  // Override invalid raw parameters retained by the router's search merge.
  return { category: category ?? "All" };
}
export const collectionProducts = (category: ShopCategory) =>
  category === "All" ? products : products.filter((product) => product.category === category);
export const featuredProduct =
  products.find((product) => product.handle === "signature-hoodie") ?? products[0];
export const heroRecord = products.find((product) => product.handle === "the-lyrical-lion-cd");
export const isDiamondDre = (product: Product) => product.handle === diamondDre.handle;
export const isOnSale = (price: number, compareAt?: number) =>
  compareAt !== undefined && compareAt > price;
export function productContext(product: Product) {
  if (isDiamondDre(product)) return "CD / DOWNLOAD / SINGLES";
  if (product.category === "Albums") {
    const release = releases.find((entry) => entry.shopHandle === product.handle);
    return release?.year ? `COMPACT DISC / ${release.year}` : "COMPACT DISC";
  }
  if (product.options) return product.options.values.join(" / ");
  if (product.category === "Tickets") return "LIVE / EVENT ENTRY";
  if (product.category === "Production") return "STUDIO / BEAT PACK";
  return "OFFICIAL MERCH";
}
