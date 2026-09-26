"use client";

import { usePathname } from "next/navigation";

const pageNames = {
  "/dashboard": "Dashboard",
  "/products": "Products",
  "/operations/receipts": "Receipts",
  "/operations/deliveries": "Deliveries",
  "/operations/transfers": "Transfers",
  "/operations/adjustments": "Adjustments",
  "/movements": "Move History",
};

export default function Header() {
  const pathname = usePathname();

  const title =
    pageNames[pathname] ||
    Object.entries(pageNames).find(([path]) =>
      pathname.startsWith(`${path}/`)
    )?.[1] ||
    "StockSense";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">
          {title}
        </h1>

        <p className="text-xs text-slate-500">
          Manage your inventory efficiently
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          🔔
        </button>

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            A
          </div>

          <span className="hidden text-sm font-medium text-slate-700 sm:block">
            Ankesh
          </span>
        </div>
      </div>
    </header>
  );
}