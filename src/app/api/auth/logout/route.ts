/**
 * Logout API Route
 * Handles user logout
 * 
 * Steps:
 * 1. Receive request
 * 2. Delete session cookie
 * 3. Return success response
 * 
 * Note: JWT itself cannot be "revoked" because it's stateless
 * But by deleting the cookie from the browser, the user won't be able to use it
 */

import { NextRequest } from "next/server";
import { createResponseWithoutSession } from "@/shared/libs/auth/cookies";

export const POST = async (req: NextRequest) => {
  try {
    // Delete session cookie and return response
    return createResponseWithoutSession(
      { message: "Logged out successfully" },
      200
    );
  } catch (error) {
    console.error('Logout error:', error);
    return createResponseWithoutSession(
      { error: "An error occurred during logout" },
      500
    );
  }
}; 