
import { NextRequest, NextResponse } from "next/server";
import { getUserRole, getSessionToken } from "@/shared/libs/auth/cookies";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = getSessionToken(req);
  const role = getUserRole(req); // "owner" أو "customer"

  // كل الشروط
  const isOwnerPage = pathname.startsWith("/admin");
  const isCustomerPage = pathname.startsWith("/customer");
  const isAuthPage = ["/login", "/sign-up", "/forget-password", "/reset-password"].some(p => pathname.startsWith(p));

  // غير مسجل دخول
  if (!session) {
    if (isOwnerPage || isCustomerPage) return NextResponse.redirect(new URL("/login", req.url));
    return NextResponse.next();
  }

  // منع العودة لصفحات auth
  if (isAuthPage) {
    const redirectTo = role === "owner" ? "/admin/dashboard" : "/customer/cart";
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  // حماية Owner
  if (isOwnerPage && role !== "owner") return NextResponse.redirect(new URL("/unauthorized", req.url));

  // حماية Customer
  if (isCustomerPage && role !== "customer") return NextResponse.redirect(new URL("/unauthorized", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/customer", "/customer/:path*", "/login", "/sign-up", "/forget-password", "/reset-password"],
};



