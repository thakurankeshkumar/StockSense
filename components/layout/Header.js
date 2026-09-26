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

  async function handleLogout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        alert("Logout failed");
        return;
      }

      window.location.href = "/signin";
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong while logging out");
    }
  }


  const title =
    pageNames[pathname] ||
    Object.entries(pageNames).find(([path]) =>
      pathname.startsWith(`${path}/`)
    )?.[1] ||
    "StockSense";

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#dce2e7] bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
          StockSense workspace
        </p>
        <h1 className="mt-1 text-lg font-semibold text-[#16202a]">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-[#66727d] hover:border-[#dce2e7] hover:bg-[#f4f6f8]"
          aria-label="Notifications"
        >
          <span className="relative block h-4 w-4 rounded-t-full border-2 border-current border-b-0 after:absolute after:-bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-current" />
        </button>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-slate-600 hover:text-red-600"
        >
          Logout
        </button>

        <div className="h-7 w-px bg-[#dce2e7]" />

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#16202a] text-xs font-semibold text-white">
            A
          </div>

          <span className="hidden text-sm font-medium text-[#3d4a55] sm:block">
            Ankesh
          </span>
        </div>
      </div>
    </header>
  );
}