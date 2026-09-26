import { NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/products",
  "/receipts",
  "/deliveries",
  "/transfers",
  "/adjustments",
  "/stock",
];

const AUTH_COOKIE_NAME = "accessToken";

function isPublicRoute(pathname) {
  return PUBLIC_ROUTES.includes(pathname);
}

function isProtectedRoute(pathname) {
  return PROTECTED_PREFIXES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow Next.js internals and static files.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".") && !isProtectedRoute(pathname)
  ) {
    return NextResponse.next();
  }

  // Public pages don't require authentication.
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Routes outside our protected application area are allowed.
  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  // Check for the authentication cookie.
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  // if (!token) {
  //   const loginUrl = new URL("/login", request.url);

  //   // Remember where the user wanted to go.
  //   loginUrl.searchParams.set("callbackUrl", `${pathname}${request.nextUrl.search}`);

  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run middleware on application routes while skipping
     * common static assets.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};