"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "▦",
  },
  {
    name: "Products",
    href: "/products",
    icon: "□",
  },
  {
    name: "Receipts",
    href: "/operations/receipts",
    icon: "↓",
  },
  {
    name: "Deliveries",
    href: "/operations/deliveries",
    icon: "↑",
  },
  {
    name: "Transfers",
    href: "/operations/transfers",
    icon: "⇄",
  },
  {
    name: "Adjustments",
    href: "/operations/adjustments",
    icon: "±",
  },
  {
    name: "Move History",
    href: "/movements",
    icon: "◷",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
            S
          </div>

          <div>
            <p className="text-base font-bold text-slate-900">
              StockSense
            </p>
            <p className="text-xs text-slate-500">
              Inventory Management
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
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
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className="flex w-5 justify-center text-base">
                {item.icon}
              </span>

              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-200 p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          <span className="w-5 text-center">⚙</span>
          Settings
        </Link>

        <div className="mt-3 flex items-center gap-3 rounded-lg bg-slate-50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900">
              Ankesh
            </p>
            <p className="truncate text-xs text-slate-500">
              Inventory Manager
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}