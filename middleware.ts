import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/shared/libs/auth/auth-file";

// Pages by type
const PUBLIC_ROUTES = ["/", "/login", "/signUp"]; // Public pages
const OWNER_ROUTES = ["/owner"];
const CUSTOMER_ROUTES = ["/customer"];
const SHARED_ROUTES = ["/dashboard", "/restaurants", "/menu"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1️⃣ Ignore files and API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2️⃣ Check authentication token
  const { isAuthenticated, user } = await checkAuth(request);

  // If not authenticated → block protected pages
  if (!isAuthenticated || !user) {
    if (!PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url),
      );
    }
    return NextResponse.next();
  }

  // If authenticated → prevent access to login/signup
  if (isAuthenticated && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Owner pages
  if (
    OWNER_ROUTES.some((r) => pathname.startsWith(r)) &&
    user.role !== "OWNER"
  ) {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  // Customer pages
  if (
    CUSTOMER_ROUTES.some((r) => pathname.startsWith(r)) &&
    user.role !== "CUSTOMER"
  ) {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  if (SHARED_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url),
      );
    }
    return NextResponse.next(); // Any authenticated user can access
  }

  return NextResponse.next();
}
