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
    <main className="flex min-h-screen items-center justify-center bg-[#f4f6f8] px-6 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 text-2xl font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0f766e] text-sm text-white">S</span>
            Stock<span className="text-[#0f766e]">Sense</span>
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
          className="border border-[#dce2e7] bg-white p-7 shadow-[0_16px_40px_rgba(22,32,42,0.06)]"
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
              className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#e5f3f0]"
            />
          </label>

          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-[#0f766e] px-4 py-3 text-sm font-semibold text-white hover:bg-[#115e59]"
          >
            Send OTP
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            Remember your password?{" "}
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