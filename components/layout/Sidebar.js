"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "01",
  },
  {
    name: "Products",
    href: "/products",
    icon: "02",
  },
  {
    name: "Receipts",
    href: "/operations/receipts",
    icon: "03",
  },
  {
    name: "Deliveries",
    href: "/operations/deliveries",
    icon: "04",
  },
  {
    name: "Transfers",
    href: "/operations/transfers",
    icon: "05",
  },
  {
    name: "Adjustments",
    href: "/operations/adjustments",
    icon: "06",
  },
  {
    name: "Move History",
    href: "/movements",
    icon: "07",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r border-[#dce2e7] bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-[72px] items-center border-b border-[#dce2e7] px-5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0f766e] text-sm font-bold text-white">
            S
          </div>

          <div>
            <p className="text-base font-bold text-[#16202a]">
              StockSense
            </p>
            <p className="text-xs text-[#66727d]">
              Inventory Management
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a959e]">
          Workspace
        </p>

        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "border-[#0f766e] bg-[#e5f3f0] text-[#115e59]"
                  : "border-transparent text-[#66727d] hover:bg-[#f4f6f8] hover:text-[#16202a]"
              }`}
            >
              <span className="flex w-5 justify-center font-mono text-[10px] font-semibold tracking-tight opacity-70">
                {item.icon}
              </span>

              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-[#dce2e7] p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-[#66727d] hover:bg-[#f4f6f8]"
        >
          <span className="w-5 text-center font-mono text-xs">--</span>
          Settings
        </Link>

        <div className="mt-3 flex items-center gap-3 rounded-md bg-[#f4f6f8] p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#dce2e7] text-sm font-semibold text-[#3d4a55]">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#16202a]">
              Ankesh
            </p>
            <p className="truncate text-xs text-[#66727d]">
              Inventory Manager
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}