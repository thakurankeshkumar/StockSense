"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // OTP API will be connected here.
    console.log({ email });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Stock<span className="text-blue-600">Sense</span>
          </Link>

          <h1 className="mt-8 text-2xl font-bold text-slate-900">
            Forgot your password?
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Enter your email and we&apos;ll send you an OTP to reset your password.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
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

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Send OTP
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            Remember your password?{" "}
            <Link
              href="/signin"
              className="font-semibold text-blue-600 hover:underline"
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