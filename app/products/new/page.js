"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AppShell from "@/components/layout/AppShell";

export default function NewProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    categoryId: "",
    unit: "",
    reorderLevel: "",
    initialStock: "",
    initialStockLocationId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      const [categoryRes, locationRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/locations"),
      ]);

      const categoriesData = await categoryRes.json();
      const locationsData = await locationRes.json();

      if (categoriesData.success) setCategories(categoriesData.data);
      if (locationsData.success) setLocations(locationsData.data);
    }

    loadData();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          reorderLevel: Number(form.reorderLevel || 0),
          initialStock:
            form.initialStock === ""
              ? undefined
              : Number(form.initialStock),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create product");
      }

      router.push("/products");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Add Product
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Add a new product to your inventory catalog.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white p-6"
        >
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Product Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <Field
              label="SKU / Code"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              required
            />

            <Select
              label="Category"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              options={categories.map((item) => ({
                value: item._id,
                label: item.name,
              }))}
              required
            />

            <Field
              label="Unit of Measure"
              name="unit"
              placeholder="kg, pcs, litre..."
              value={form.unit}
              onChange={handleChange}
              required
            />

            <Field
              label="Reorder Level"
              name="reorderLevel"
              type="number"
              value={form.reorderLevel}
              onChange={handleChange}
            />

            <Field
              label="Initial Stock"
              name="initialStock"
              type="number"
              value={form.initialStock}
              onChange={handleChange}
            />

            <div className="sm:col-span-2">
              <Select
                label="Initial Stock Location"
                name="initialStockLocationId"
                value={form.initialStockLocationId}
                onChange={handleChange}
                options={locations.map((item) => ({
                  value: item._id,
                  label: item.name,
                }))}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
      />
    </label>
  );
}

function Select({ label, options, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <select
        {...props}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400"
      >
        <option value="">Select...</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}