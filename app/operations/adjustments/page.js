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

export default function AdjustmentsPage() {
    const [products, setProducts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [adjustments, setAdjustments] = useState([]);

    const [productId, setProduct] = useState("");
    const [locationId, setLocation] = useState("");
    const [countedQuantity, setCounted] = useState("");
    const [reason, setReason] = useState("");

    async function load() {
        const [p, l, a] = await Promise.all([
            fetch("/api/products"),
            fetch("/api/locations"),
            fetch("/api/adjustments"),
        ]);

        setProducts((await p.json()).data || []);
        setLocations((await l.json()).data || []);
        setAdjustments((await a.json()).data || []);
    }

    useEffect(() => {
        async function fetchInitialData() {
            const [p, l, a] = await Promise.all([
                fetch("/api/products"),
                fetch("/api/locations"),
                fetch("/api/adjustments"),
            ]);

            const productsData = await p.json();
            const locationsData = await l.json();
            const adjustmentsData = await a.json();

            setProducts(productsData.data || []);
            setLocations(locationsData.data || []);
            setAdjustments(adjustmentsData.data || []);
        }

        fetchInitialData();
    }, []);

    async function create(e) {
        e.preventDefault();

        const response = await fetch("/api/adjustments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId,
                locationId,
                countedQuantity: Number(countedQuantity),
                reason,
            }),
        });

        const result = await response.json();

        if (!result.success) return alert(result.message);

        setCounted("");
        setReason("");
        load();
    }

    async function validate(id) {
        const result = await (
            await fetch(`/api/adjustments/${id}/validate`, {
                method: "POST",
            })
        ).json();

        if (!result.success) alert(result.message);

        load();
    }

    return (
        <AppShell>
            <PageTitle
                title="Inventory Adjustments"
                description="Reconcile system stock with physical counts."
            />

            <OperationForm onSubmit={create}>
                <Select
                    label="Product"
                    value={productId}
                    onChange={(e) => setProduct(e.target.value)}
                    options={products}
                />

                <Select
                    label="Location"
                    value={locationId}
                    onChange={(e) => setLocation(e.target.value)}
                    options={locations}
                />

                <Input
                    label="Physical Count"
                    type="number"
                    value={countedQuantity}
                    onChange={(e) => setCounted(e.target.value)}
                />

                <Input
                    label="Reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Damaged, missing, recount..."
                />

                <button className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm text-white">
                    Create Adjustment
                </button>
            </OperationForm>

            <OperationTable
                title="Recent Adjustments"
                columns={["Product", "Difference", "Status", "Action"]}
                rows={adjustments.map((item) => [
                    item.productId?.name,
                    item.difference,
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