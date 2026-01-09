import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "./cookies"; // دالة تجيب التوكن من الكوكيز
import { verifyToken, JWTPayload } from "./jwt"; // دوال التحقق من التوكن

/**
 * التحقق من وجود جلسة صالحة
 * @param request NextRequest
 */
export async function checkAuth(request: NextRequest): Promise<{
  isAuthenticated: boolean;
  user: JWTPayload | null;
  error?: string;
}> {
  const token = getSessionToken(request);

  if (!token) {
    return {
      isAuthenticated: false,
      user: null,
      error: "لا توجد جلسة نشطة",
    };
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return {
      isAuthenticated: false,
      user: null,
      error: "جلسة غير صالحة أو منتهية",
    };
  }

  return {
    isAuthenticated: true,
    user: payload as JWTPayload,
  };
}

/**
 * Wrapper لحماية أي API Route
 * @param request NextRequest
 * @param handler دالة الRoute اللي تعمل العملية
 */
export async function withAuth(
  request: NextRequest,
  handler: (req: NextRequest, user: JWTPayload) => Promise<NextResponse | Response>
): Promise<NextResponse | Response> {
  const { isAuthenticated, user, error } = await checkAuth(request);
  if (!isAuthenticated || !user) {
    return NextResponse.json(
      { error: error || "غير مصرح" },
      { status: 401 }
    );
  }

  return handler(request, user);
}

/**
 * الحصول على المستخدم الحالي من التوكن بدون التحقق من المسار
 */
export async function getCurrentUser(request: NextRequest): Promise<JWTPayload | null> {
  const token = getSessionToken(request);
  if (!token) return null;
  return await verifyToken(token);
}
