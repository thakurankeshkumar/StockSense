"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [warehouses, setWarehouses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);

  const [warehouseName, setWarehouseName] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");

  const [locationName, setLocationName] = useState("");
  const [warehouseId, setWarehouseId] = useState("");

  const [categoryName, setCategoryName] = useState("");

  async function loadData() {
    try {
      const [w, l, c] = await Promise.all([
        fetch("/api/warehouses"),
        fetch("/api/locations"),
        fetch("/api/categories"),
      ]);

      const warehousesData = await w.json();
      const locationsData = await l.json();
      const categoriesData = await c.json();

      setWarehouses(warehousesData.data || []);
      setLocations(locationsData.data || []);
      setCategories(categoriesData.data || []);
    } catch (error) {
      console.error("Failed to load settings data:", error);
    }
  }

  useEffect(() => {
    async function fetchInitialData() {
      const [w, l, c] = await Promise.all([
        fetch("/api/warehouses"),
        fetch("/api/locations"),
        fetch("/api/categories"),
      ]);

      const warehousesData = await w.json();
      const locationsData = await l.json();
      const categoriesData = await c.json();

      setWarehouses(warehousesData.data || []);
      setLocations(locationsData.data || []);
      setCategories(categoriesData.data || []);
    }

    fetchInitialData();
  }, []);

  async function createWarehouse(e) {
    e.preventDefault();

    if (!warehouseName.trim()) return;

    const response = await fetch("/api/warehouses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: warehouseName,
        address: warehouseAddress,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to create warehouse");
      return;
    }

    setWarehouseName("");
    setWarehouseAddress("");

    await loadData();
  }

  async function createLocation(e) {
    e.preventDefault();

    if (!locationName.trim() || !warehouseId) return;

    const response = await fetch("/api/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: locationName,
        warehouseId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to create location");
      return;
    }

    setLocationName("");
    setWarehouseId("");

    await loadData();
  }

  async function createCategory(e) {
    e.preventDefault();

    if (!categoryName.trim()) return;

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: categoryName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to create category");
      return;
    }

    setCategoryName("");

    await loadData();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage warehouses, storage locations and product categories.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Warehouse */}
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Warehouses
          </h2>

          <form onSubmit={createWarehouse} className="mt-4 space-y-3">
            <input
              value={warehouseName}
              onChange={(e) => setWarehouseName(e.target.value)}
              placeholder="Warehouse name"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />

            <input
              value={warehouseAddress}
              onChange={(e) => setWarehouseAddress(e.target.value)}
              placeholder="Address (optional)"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Add Warehouse
            </button>
          </form>

          <div className="mt-6 space-y-2">
            {warehouses.map((warehouse) => (
              <div
                key={warehouse._id}
                className="rounded-lg border border-slate-100 bg-slate-50 p-3"
              >
                <p className="font-medium text-slate-900">
                  {warehouse.name}
                </p>

                {warehouse.address && (
                  <p className="mt-1 text-xs text-slate-500">
                    {warehouse.address}
                  </p>
                )}
              </div>
            ))}

            {warehouses.length === 0 && (
              <p className="text-sm text-slate-500">
                No warehouses yet.
              </p>
            )}
          </div>
        </section>

        {/* Locations */}
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Locations
          </h2>

          <form onSubmit={createLocation} className="mt-4 space-y-3">
            <input
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Location name"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />

            <select
              value={warehouseId}
              onChange={(e) => setWarehouseId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm"
            >
              <option value="">Select warehouse</option>

              {warehouses.map((warehouse) => (
                <option key={warehouse._id} value={warehouse._id}>
                  {warehouse.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Add Location
            </button>
          </form>

          <div className="mt-6 space-y-2">
            {locations.map((location) => (
              <div
                key={location._id}
                className="rounded-lg border border-slate-100 bg-slate-50 p-3"
              >
                <p className="font-medium text-slate-900">
                  {location.name}
                </p>
              </div>
            ))}

            {locations.length === 0 && (
              <p className="text-sm text-slate-500">
                No locations yet.
              </p>
            )}
          </div>
        </section>

        {/* Categories */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Categories
          </h2>

          <form
            onSubmit={createCategory}
            className="mt-4 flex flex-col gap-3 sm:flex-row"
          >
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category name"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Add Category
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category._id}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
              >
                {category.name}
              </span>
            ))}

            {categories.length === 0 && (
              <p className="text-sm text-slate-500">
                No categories yet.
              </p>
            )}
          </div>
        </section>
      </div>

      <div className="mt-6">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}