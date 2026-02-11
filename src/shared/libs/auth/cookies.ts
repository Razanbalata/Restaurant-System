import { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE_NAME = "session";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false, // dev: false, production: true
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 أيام
  path: "/",
};

// حفظ Session و Role
export function setSessionCookie(response: NextResponse, token: string, role?: string): NextResponse {
  response.cookies.set(SESSION_COOKIE_NAME, token, COOKIE_OPTIONS);

  if (role) {
    response.cookies.set("user_intent", role, COOKIE_OPTIONS);
  }

  return response;
}

// مسح Session و Role
export function clearSessionCookie(response: NextResponse): NextResponse {
  response.cookies.set(SESSION_COOKIE_NAME, "", { ...COOKIE_OPTIONS, maxAge: 0 });
  response.cookies.set("user_intent", "", { ...COOKIE_OPTIONS, maxAge: 0 });
  return response;
}

// جلب Session Token
export function getSessionToken(request: NextRequest): string | undefined {
  return request.cookies.get(SESSION_COOKIE_NAME)?.value;
}

// جلب Role
export function getUserRole(request: NextRequest): string | undefined {
  return request.cookies.get("user_intent")?.value;
}

// إنشاء Response مع Session
export function createResponseWithSession(data: any, token: string, role?: string, status = 200): NextResponse {
  const response = NextResponse.json(data, { status });
  return setSessionCookie(response, token, role);
}

// إنشاء Response بدون Session
export function createResponseWithoutSession(data: any, status = 200): NextResponse {
  const response = NextResponse.json(data, { status });
  return clearSessionCookie(response);
}
