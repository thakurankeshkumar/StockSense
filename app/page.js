import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f6f8]">
      <nav className="border-b border-[#dce2e7] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3 text-xl font-bold text-[#16202a]">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0f766e] text-sm text-white">S</span>
            Stock<span className="text-[#0f766e]">Sense</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="rounded-md px-4 py-2 text-sm font-medium text-[#3d4a55] hover:bg-[#f4f6f8]"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="rounded-md bg-[#16202a] px-4 py-2 text-sm font-medium text-white hover:bg-[#263542]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0f766e]">Inventory operations</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-[#16202a] sm:text-6xl">
              Know what is in stock, where it is, and what needs attention.
          </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#66727d]">
              StockSense keeps products, stock levels, receipts, deliveries, transfers, and adjustments in one operational workspace.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-md bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#115e59]"
            >
              Get Started
            </Link>

            <Link
              href="/signin"
              className="rounded-md border border-[#cbd4da] bg-white px-6 py-3 text-sm font-semibold text-[#3d4a55] hover:bg-[#f4f6f8]"
            >
              Sign In
            </Link>
          </div>
          </div>

          <div className="border-l-2 border-[#0f766e] bg-white p-7 shadow-[0_16px_40px_rgba(22,32,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66727d]">A clear operating picture</p>
            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4 border-b border-[#edf0f2] pb-5">
                <span className="font-mono text-xs font-semibold text-[#0f766e]">01</span>
                <p className="text-sm leading-6 text-[#3d4a55]">Keep a reliable product catalog with SKUs, units, categories, and reorder levels.</p>
              </div>
              <div className="flex items-start gap-4 border-b border-[#edf0f2] pb-5">
                <span className="font-mono text-xs font-semibold text-[#0f766e]">02</span>
                <p className="text-sm leading-6 text-[#3d4a55]">Record every receipt, delivery, transfer, and adjustment as it happens.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-mono text-xs font-semibold text-[#0f766e]">03</span>
                <p className="text-sm leading-6 text-[#3d4a55]">See stock by location and spot low or unavailable items early.</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-[#dce2e7] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-[#66727d]">
          © {new Date().getFullYear()} StockSense. Inventory Management System.
        </div>
      </footer>
    </main>
  );
}