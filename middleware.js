import { NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/products",
  "/operations",
  "/movements",
  "/settings",
  "/profile",
];

const AUTH_COOKIE_NAME = "auth_token";

function isPublicRoute(pathname) {
  return PUBLIC_ROUTES.includes(pathname);
}

function isProtectedRoute(pathname) {
  return PROTECTED_PREFIXES.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow Next.js internals and static files.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Let API routes handle their own authentication/authorization.
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Public pages don't require authentication.
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Routes outside the protected application area are allowed.
  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  // Check authentication cookie.
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL("/signin", request.url);

    // Remember the page the user originally requested.
    loginUrl.searchParams.set(
      "callbackUrl",
      `${pathname}${request.nextUrl.search}`
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};