import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold text-slate-900">
            Stock<span className="text-blue-600">Sense</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Smart Inventory Management
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Manage your inventory
            <span className="block text-blue-600">
              with confidence.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            StockSense helps businesses manage products, stock levels,
            receipts, deliveries, transfers and inventory adjustments
            from one centralized platform.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Get Started
            </Link>

            <Link
              href="/signin"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon="📦"
            title="Product Management"
            description="Manage products, SKUs, categories, units and reorder levels."
          />

          <FeatureCard
            icon="🔄"
            title="Stock Operations"
            description="Handle receipts, deliveries, internal transfers and adjustments."
          />

          <FeatureCard
            icon="📊"
            title="Stock Visibility"
            description="Track inventory across locations with a centralized stock ledger."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} StockSense. Inventory Management System.
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-xl">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}