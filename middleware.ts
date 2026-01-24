import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/shared/libs/auth/auth-file";

// الصفحات حسب النوع
const PUBLIC_ROUTES = ["/", "/login", "/register"]; // صفحات عامة
const OWNER_ROUTES = ["/owner"];
const CUSTOMER_ROUTES = ["/customer"];
const SHARED_ROUTES = ["/dashboard", "/restaurants", "/menu"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1️⃣ تجاهل الملفات والـ API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2️⃣ التحقق من التوكن
  const { isAuthenticated, user } = await checkAuth(request);

  // لو مش مسجل → يمنع صفحات محمية
  if (!isAuthenticated || !user) {
    if (!PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url),
      );
    }
    return NextResponse.next();
  }

  // لو مسجّل → يمنعه من اللوجين / التسجيل
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
    return NextResponse.next(); // أي مستخدم مسجّل يقدر يدخل
  }

  return NextResponse.next();
}
