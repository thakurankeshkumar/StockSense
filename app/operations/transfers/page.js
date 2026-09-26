"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import {
    PageTitle,
    Input,
    Select,
    OperationForm,
    OperationTable,
} from "@/components/operations";

export default function TransfersPage() {
    const [products, setProducts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [transfers, setTransfers] = useState([]);

    const [fromLocationId, setFrom] = useState("");
    const [toLocationId, setTo] = useState("");
    const [productId, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");

    async function load() {
        const [p, l, t] = await Promise.all([
            fetch("/api/products"),
            fetch("/api/locations"),
            fetch("/api/transfers"),
        ]);

        setProducts((await p.json()).data || []);
        setLocations((await l.json()).data || []);
        setTransfers((await t.json()).data || []);
    }

    useEffect(() => {
        async function fetchInitialData() {
            const [p, l, t] = await Promise.all([
                fetch("/api/products"),
                fetch("/api/locations"),
                fetch("/api/transfers"),
            ]);

            const productsData = await p.json();
            const locationsData = await l.json();
            const transfersData = await t.json();

            setProducts(productsData.data || []);
            setLocations(locationsData.data || []);
            setTransfers(transfersData.data || []);
        }

        fetchInitialData();
    }, []);

    async function create(e) {
        e.preventDefault();

        const response = await fetch("/api/transfers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fromLocationId,
                toLocationId,
                items: [{ productId, quantity: Number(quantity) }],
            }),
        });

        const result = await response.json();

        if (!result.success) return alert(result.message);

        setQuantity("");
        load();
    }

    async function validate(id) {
        const result = await (
            await fetch(`/api/transfers/${id}/validate`, {
                method: "POST",
            })
        ).json();

        if (!result.success) alert(result.message);

        load();
    }

    return (
        <AppShell>
            <PageTitle
                title="Internal Transfers"
                description="Move stock between locations."
            />

            <OperationForm onSubmit={create}>
                <Select
                    label="From Location"
                    value={fromLocationId}
                    onChange={(e) => setFrom(e.target.value)}
                    options={locations}
                />

                <Select
                    label="To Location"
                    value={toLocationId}
                    onChange={(e) => setTo(e.target.value)}
                    options={locations}
                />

                <Select
                    label="Product"
                    value={productId}
                    onChange={(e) => setProduct(e.target.value)}
                    options={products}
                />

                <Input
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <button className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm text-white">
                    Create Transfer
                </button>
            </OperationForm>

            <OperationTable
                title="Recent Transfers"
                columns={["From", "To", "Status", "Action"]}
                rows={transfers.map((item) => [
                    item.fromLocationId?.name,
                    item.toLocationId?.name,
                    item.status,
                    item.status === "DRAFT" ? (
                        <button
                            onClick={() => validate(item._id)}
                            className="rounded bg-slate-900 px-3 py-1.5 text-xs text-white"
                        >
                            Validate
                        </button>
                    ) : (
                        "—"
                    ),
                ])}
            />
        </AppShell>
    );
}