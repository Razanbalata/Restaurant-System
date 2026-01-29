import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "./cookies"; // Function to get token from cookies
import { verifyToken, JWTPayload } from "./jwt"; // Token verification functions

/**
 * Check for a valid session
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
      error: "No active session",
    };
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return {
      isAuthenticated: false,
      user: null,
      error: "Invalid or expired session",
    };
  }

  return {
    isAuthenticated: true,
    user: payload as JWTPayload,
  };
}

/**
 * Wrapper to protect any API Route
 * @param request NextRequest
 * @param handler Route function that performs the operation
 */
export async function withAuth(
  request: NextRequest,
  handler: (req: NextRequest, user: JWTPayload) => Promise<NextResponse | Response>
): Promise<NextResponse | Response> {
  const { isAuthenticated, user, error } = await checkAuth(request);
  if (!isAuthenticated || !user) {
    return NextResponse.json(
      { error: error || "Unauthorized" },
      { status: 401 }
    );
  }

  return handler(request, user);
}

/**
 * Get the current user from the token without path verification
 */
export async function getCurrentUser(request: NextRequest): Promise<JWTPayload | null> {
  const token = getSessionToken(request);
  if (!token) return null;
  return await verifyToken(token);
}
