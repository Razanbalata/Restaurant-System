// import { NextRequest, NextResponse } from "next/server";
// import { checkAuth } from "@/shared/libs/auth/auth-file";

// // Pages by type
// const PUBLIC_ROUTES = ["/", "/login", "/register"]; // Public pages
// const OWNER_ROUTES = ["/owner"];
// const CUSTOMER_ROUTES = ["/customer"];
// const SHARED_ROUTES = ["/dashboard", "/restaurants", "/menu"];

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // 1️⃣ Ignore files and API
//   if (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/api") ||
//     pathname.includes(".")
//   ) {
//     return NextResponse.next();
//   }

//   // 2️⃣ Check authentication token
//   const { isAuthenticated, user } = await checkAuth(request);

//   // If not authenticated → block protected pages
//   if (!isAuthenticated || !user) {
//     if (!PUBLIC_ROUTES.includes(pathname)) {
//       return NextResponse.redirect(
//         new URL(`/login?redirect=${pathname}`, request.url),
//       );
//     }
//     return NextResponse.next();
//   }

//   // If authenticated → prevent access to login/signup
//   if (isAuthenticated && PUBLIC_ROUTES.includes(pathname)) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Owner pages
//   if (
//     OWNER_ROUTES.some((r) => pathname.startsWith(r)) &&
//     user.role !== "OWNER"
//   ) {
//     return NextResponse.redirect(new URL("/403", request.url));
//   }

//   // Customer pages
//   if (
//     CUSTOMER_ROUTES.some((r) => pathname.startsWith(r)) &&
//     user.role !== "CUSTOMER"
//   ) {
//     return NextResponse.redirect(new URL("/403", request.url));
//   }

//   if (SHARED_ROUTES.some((r) => pathname.startsWith(r))) {
//     if (!isAuthenticated) {
//       return NextResponse.redirect(
//         new URL(`/login?redirect=${pathname}`, request.url),
//       );
//     }
//     return NextResponse.next(); // Any authenticated user can access
//   }

//   return NextResponse.next();
// }
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = request.cookies.get("session")?.value;
  const role = request.cookies.get("user_intent")?.value; // 'owner' | 'customer'

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/forget-password") ||
    pathname.startsWith("/reset-password");

  const isOwnerPage = pathname.startsWith("/owner");
  const isCustomerPage = pathname.startsWith("/customer");
  const isSharedPage = pathname.startsWith("/shared");

  /* =========================
     غير مسجل دخول
  ========================== */
  if (!session && (isOwnerPage || isCustomerPage)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // مش مسجل دخول + صفحة مشتركة
  if (!session && isSharedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  /* =========================
     مسجل دخول + Auth Pages
  ========================== */
  if (session && isAuthPage) {
    const redirectTo = role === "owner" ? "/owner/dashboard" : "/customer/cart";

    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  /* =========================
     Customer داخل Owner
  ========================== */
  if (session && role === "customer" && isOwnerPage) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  /* =========================
     Owner داخل Customer
  ========================== */
  if (session && role === "owner" && isCustomerPage) {
    return NextResponse.redirect(new URL("/owner/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/owner/:path*",
    "/customer/:path*",
    "/shared/:path*",
    "/login",
    "/sign-up",
    "/forget-password",
    "/reset-password",
  ],
};
