import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { formatPrice } from "@/components/site/ProductCard";
import { DiamondDreBundle } from "@/components/site/DiamondDreBundle";
import { ShopNotFound, ShopProductShowroom } from "@/components/shop/ShopProductShowroom";
import { diamondDre, productAliases, products } from "@/lib/site-data";

export const Route = createFileRoute("/shop/$handle")({
  loader: ({ params }) => {
    const alias = Object.hasOwn(productAliases, params.handle)
      ? productAliases[params.handle]
      : undefined;
    if (alias) throw redirect({ to: "/shop/$handle", params: { handle: alias } });
    const product = products.find((p) => p.handle === params.handle);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Product not found | Klondike Kat" },
          { name: "robots", content: "noindex" },
        ],
      };
    const { product } = loaderData;
    const title = `${product.title} — ${formatPrice(product.price)} | Klondike Kat`;
    return {
      meta: [
        { title },
        { name: "description", content: product.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: product.blurb },
        { property: "og:type", content: "product" },
      ],
    };
  },
  notFoundComponent: ShopNotFound,
  component: ProductPage,
});
function ProductPage() {
  const { product } = Route.useLoaderData();
  return product.handle === diamondDre.handle ? (
    <DiamondDreBundle />
  ) : (
    <ShopProductShowroom key={product.handle} product={product} />
  );
}
