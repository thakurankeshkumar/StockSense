"use client";

import { useEffect, useState } from "react";

import AppShell from "@/components/layout/AppShell";
import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await fetch("/api/dashboard");

        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to load dashboard");
        }

        setDashboard(result.data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <AppShell>
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Good afternoon, Ankesh 👋
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s what&apos;s happening with your inventory today.
          </p>
        </div>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-xl border border-slate-200 bg-white"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {dashboard && !loading && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Products"
                value={dashboard.totalProducts}
                description="Products in catalog"
                icon="□"
              />

              <StatCard
                title="Total Stock"
                value={dashboard.totalQuantity}
                description="Across all locations"
                icon="▦"
              />

              <StatCard
                title="Low Stock"
                value={dashboard.lowStockItems}
                description="Below reorder level"
                icon="!"
              />

              <StatCard
                title="Out of Stock"
                value={dashboard.outOfStockItems}
                description="Currently unavailable"
                icon="×"
              />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-base font-semibold text-slate-900">
                  Pending Operations
                </h3>

                <div className="mt-5 space-y-4">
                  <OperationRow
                    label="Receipts"
                    value={dashboard.pendingReceipts}
                  />

                  <OperationRow
                    label="Deliveries"
                    value={dashboard.pendingDeliveries}
                  />

                  <OperationRow
                    label="Internal Transfers"
                    value={dashboard.pendingTransfers}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-base font-semibold text-slate-900">
                  Inventory Overview
                </h3>

                <div className="mt-5">
                  <div className="flex items-center justify-between border-b border-slate-100 py-3">
                    <span className="text-sm text-slate-600">
                      Total inventory quantity
                    </span>

                    <span className="font-semibold text-slate-900">
                      {dashboard.totalQuantity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 py-3">
                    <span className="text-sm text-slate-600">
                      Low stock products
                    </span>

                    <span className="font-semibold text-amber-600">
                      {dashboard.lowStockItems}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-slate-600">
                      Out of stock products
                    </span>

                    <span className="font-semibold text-red-600">
                      {dashboard.outOfStockItems}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}

function OperationRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-600">
        {label}
      </span>

      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-900">
        {value}
      </span>
    </div>
  );
}