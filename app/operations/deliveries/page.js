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

export default function DeliveriesPage() {
    const [products, setProducts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [items, setItems] = useState([]);
    const [customer, setCustomer] = useState("");
    const [locationId, setLocationId] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");

    async function load() {
        const [p, l, d] = await Promise.all([
            fetch("/api/products"),
            fetch("/api/locations"),
            fetch("/api/deliveries"),
        ]);

        setProducts((await p.json()).data || []);
        setLocations((await l.json()).data || []);
        setItems((await d.json()).data || []);
    }

    useEffect(() => {
        async function fetchInitialData() {
            const [p, l, d] = await Promise.all([
                fetch("/api/products"),
                fetch("/api/locations"),
                fetch("/api/deliveries"),
            ]);

            const productsData = await p.json();
            const locationsData = await l.json();
            const deliveriesData = await d.json();

            setProducts(productsData.data || []);
            setLocations(locationsData.data || []);
            setItems(deliveriesData.data || []);
        }

        fetchInitialData();
    }, []);

    async function create(e) {
        e.preventDefault();

        const response = await fetch("/api/deliveries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customer,
                locationId,
                items: [{ productId, quantity: Number(quantity) }],
            }),
        });

        const result = await response.json();

        if (!result.success) return alert(result.message);

        setCustomer("");
        setQuantity("");
        load();
    }

    async function action(id, actionName) {
        const result = await (
            await fetch(`/api/deliveries/${id}/${actionName}`, {
                method: "POST",
            })
        ).json();

        if (!result.success) alert(result.message);

        load();
    }

    return (
        <AppShell>
            <PageTitle
                title="Deliveries"
                description="Pick, pack and validate outgoing inventory."
            />

            <OperationForm onSubmit={create}>
                <Input
                    label="Customer"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
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

                <button className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm text-white">
                    Create Delivery
                </button>
            </OperationForm>

            <OperationTable
                title="Recent Deliveries"
                columns={["Customer", "Status", "Action"]}
                rows={items.map((item) => [
                    item.customer,
                    item.status,
                    item.status === "DRAFT" ? (
                        <button
                            onClick={() => action(item._id, "pick")}
                            className="rounded bg-slate-900 px-3 py-1.5 text-xs text-white"
                        >
                            Pick
                        </button>
                    ) : item.status === "WAITING" ? (
                        <button
                            onClick={() => action(item._id, "pack")}
                            className="rounded bg-slate-900 px-3 py-1.5 text-xs text-white"
                        >
                            Pack
                        </button>
                    ) : item.status === "READY" ? (
                        <button
                            onClick={() => action(item._id, "validate")}
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