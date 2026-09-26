"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Signup failed");
                return;
            }

            router.push("/dashboard");
        } catch (error) {
            console.error("Signup error:", error);
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f4f6f8] px-6 py-10">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-3 text-2xl font-bold text-slate-900">
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0f766e] text-sm text-white">S</span>
                        Stock<span className="text-[#0f766e]">Sense</span>
                    </Link>

                    <h1 className="mt-8 text-2xl font-bold text-slate-900">
                        Create your account
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Start managing your inventory with StockSense
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="border border-[#dce2e7] bg-white p-7 shadow-[0_16px_40px_rgba(22,32,42,0.06)]"
                >
                    <div className="space-y-4">
                        <label className="block">
                            <span className="mb-1.5 block text-sm font-medium text-slate-700">
                                Full Name
                            </span>

                            <input
                                name="name"
                                type="text"
                                required
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#e5f3f0]"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-1.5 block text-sm font-medium text-slate-700">
                                Email
                            </span>

                            <input
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#e5f3f0]"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-1.5 block text-sm font-medium text-slate-700">
                                Password
                            </span>

                            <input
                                name="password"
                                type="password"
                                required
                                minLength={8}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#e5f3f0]"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-1.5 block text-sm font-medium text-slate-700">
                                Confirm Password
                            </span>

                            <input
                                name="confirmPassword"
                                type="password"
                                required
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#e5f3f0]"
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full rounded-md bg-[#0f766e] px-4 py-3 text-sm font-semibold text-white hover:bg-[#115e59]"
                    >
                        Create Account
                    </button>

                    <p className="mt-5 text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link
                            href="/signin"
                            className="font-semibold text-[#0f766e] hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </form>

                <Link
                    href="/"
                    className="mt-6 block text-center text-sm text-slate-500 hover:text-slate-700"
                >
                    ← Back to home
                </Link>
            </div>
        </main>
    );
}