"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Login failed");
                return;
            }

            // window.location.href = "/dashboard";
            Response.redirect("/dashboard")
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link href="/" className="text-2xl font-bold text-slate-900">
                        Stock<span className="text-blue-600">Sense</span>
                    </Link>

                    <h1 className="mt-8 text-2xl font-bold text-slate-900">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to manage your inventory
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <div className="space-y-4">
                        <label className="block">
                            <span className="mb-1.5 block text-sm font-medium text-slate-700">
                                Email
                            </span>

                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-1.5 block text-sm font-medium text-slate-700">
                                Password
                            </span>

                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                            />
                        </label>
                    </div>

                    <div className="mt-3 text-right">
                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Sign In
                    </button>

                    <p className="mt-5 text-center text-sm text-slate-500">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Sign up
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