"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { PageTitle, Input, Select, OperationForm, OperationTable, } from "@/components/operations";

export default function ReceiptsPage() {
    const [products, setProducts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [receipts, setReceipts] = useState([]);

    const [supplier, setSupplier] = useState("");
    const [locationId, setLocationId] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");

    async function load() {
        const [p, l, r] = await Promise.all([
            fetch("/api/products"),
            fetch("/api/locations"),
            fetch("/api/receipts"),
        ]);

        setProducts((await p.json()).data || []);
        setLocations((await l.json()).data || []);
        setReceipts((await r.json()).data || []);
    }

    useEffect(() => {
        async function fetchInitialData() {
            const [p, l, r] = await Promise.all([
                fetch("/api/products"),
                fetch("/api/locations"),
                fetch("/api/receipts"),
            ]);

            const productsData = await p.json();
            const locationsData = await l.json();
            const receiptsData = await r.json();

            setProducts(productsData.data || []);
            setLocations(locationsData.data || []);
            setReceipts(receiptsData.data || []);
        }

        fetchInitialData();
    }, []);

    async function createReceipt(e) {
        e.preventDefault();

        const response = await fetch("/api/receipts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                supplier,
                locationId,
                items: [{ productId, quantity: Number(quantity) }],
            }),
        });

        const result = await response.json();

        if (!result.success) {
            alert(result.message);
            return;
        }

        setSupplier("");
        setQuantity("");
        await load();
    }

    async function validate(id) {
        const response = await fetch(`/api/receipts/${id}/validate`, {
            method: "POST",
        });

        const result = await response.json();

        if (!result.success) alert(result.message);

        await load();
    }

    return (
        <AppShell>
            <PageTitle
                title="Receipts"
                description="Receive products into inventory."
            />

            <OperationForm onSubmit={createReceipt}>
                <Input
                    label="Supplier"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    placeholder="Supplier name"
                />

                <Select
                    label="Location"
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                    options={locations}
                />

                <Select
                    label="Product"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    options={products}
                />

                <Input
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <button className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">
                    Create Receipt
                </button>
            </OperationForm>

            <OperationTable
                title="Recent Receipts"
                columns={["Supplier", "Status", "Action"]}
                rows={receipts.map((item) => [
                    item.supplier,
                    item.status,
                    item.status === "DRAFT" ? (
                        <button
                            key={item._id}
                            onClick={() => validate(item._id)}
                            className="rounded-md bg-slate-900 px-3 py-1.5 text-xs text-white"
                        >
                            Validate
                        </button>
                    ) : (
                        <span key={item._id}>—</span>
                    ),
                ])}
            />
        </AppShell>
    );
}