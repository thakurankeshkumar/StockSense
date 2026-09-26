"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";

export default function MovementsPage() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/movements")
      .then((res) => res.json())
      .then((result) => {
        setMovements(result.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppShell>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Move History
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Track every inventory movement.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-50">
              <tr>
                {["Product", "Type", "Quantity", "From", "To", "Date"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    Loading movements...
                  </td>
                </tr>
              ) : movements.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No stock movements yet.
                  </td>
                </tr>
              ) : (
                movements.map((movement) => (
                  <tr key={movement._id}>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {movement.productId?.name}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">
                        {movement.type}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {movement.quantity}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {movement.fromLocationId?.name || "—"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {movement.toLocationId?.name || "—"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(movement.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}