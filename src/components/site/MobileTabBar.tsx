import { Link } from "@tanstack/react-router";
import { CalendarDays, Disc3, Home, Mic2, ShoppingBag } from "lucide-react";

const TABS = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/music", label: "Music", icon: Disc3, exact: false },
  { to: "/shop", label: "Shop", icon: ShoppingBag, exact: false },
  { to: "/events", label: "Shows", icon: CalendarDays, exact: false },
  { to: "/booking", label: "Book", icon: Mic2, exact: false },
] as const;

export function MobileTabBar() {
  return (
    <nav
      aria-label="Primary"
      className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-1">
        {TABS.map(({ to, label, icon: Icon, exact }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact }}
              className="tap-none group flex min-h-[3.75rem] cursor-pointer flex-col items-center justify-center gap-1 py-2 text-muted-foreground transition-colors duration-200 active:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex size-8 items-center justify-center rounded-full transition-colors duration-200 ${
                      isActive ? "bg-primary/15" : "bg-transparent"
                    }`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-[0.625rem] font-bold tracking-[0.12em] uppercase">
                    {label}
                  </span>
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
