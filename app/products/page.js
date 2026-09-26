"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import AppShell from "@/components/layout/AppShell";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const [productsResponse, stockResponse] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/stock"),
        ]);

        const productsResult = await productsResponse.json();
        const stockResult = await stockResponse.json();

        if (!productsResult.success) {
          throw new Error(productsResult.message);
        }

        if (!stockResult.success) {
          throw new Error(stockResult.message);
        }

        setProducts(productsResult.data);
        setStock(stockResult.data);
      } catch (error) {
        console.error(error);
        setError(error.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const stockByProduct = useMemo(() => {
    const map = {};

    for (const item of stock) {
      const productId = item.productId?._id;

      if (!productId) continue;

      map[productId] = (map[productId] || 0) + item.quantity;
    }

    return map;
  }, [stock]);

  const filteredProducts = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return products;

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(value) ||
        product.sku.toLowerCase().includes(value) ||
        product.categoryId?.name?.toLowerCase().includes(value)
      );
    });
  }, [products, search]);

  return (
    <AppShell>
      <div>
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Products
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your inventory catalog.
            </p>
          </div>

          <Link
            href="/products/new"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            + Add Product
          </Link>
        </div>

        {/* Search */}
        <div className="mt-6">
          <div className="relative max-w-md">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs font-semibold text-slate-400">
              /_
            </span>

            <input
              type="text"
              placeholder="Search by name, SKU or category..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-200">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    SKU
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Unit
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Reorder Level
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      Loading products...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center"
                    >
                      <p className="text-sm font-medium text-slate-700">
                        No products found
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Create a product to start managing inventory.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const quantity =
                      stockByProduct[product._id] || 0;

                    const isOutOfStock = quantity === 0;
                    const isLowStock =
                      quantity > 0 &&
                      quantity <= product.reorderLevel;

                    return (
                      <tr
                        key={product._id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900">
                            {product.name}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {product.sku}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {product.categoryId?.name || "—"}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {product.unit}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`font-semibold ${
                              isOutOfStock
                                ? "text-red-600"
                                : isLowStock
                                  ? "text-amber-600"
                                  : "text-slate-900"
                            }`}
                          >
                            {quantity}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {product.reorderLevel}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}