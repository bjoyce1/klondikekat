import { createFileRoute, Outlet } from "@tanstack/react-router";
import shopCss from "@/styles/shop.css?url";

export const Route = createFileRoute("/shop")({
  head: () => ({ links: [{ rel: "stylesheet", href: shopCss }] }),
  component: ShopShell,
});
function ShopShell() {
  return (
    <div className="shop-shell">
      <Outlet />
    </div>
  );
}
