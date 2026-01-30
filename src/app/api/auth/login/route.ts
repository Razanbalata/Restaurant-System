/**
 * Login API Route
 * Responsible for user login
 *
 * Steps:
 * 1. Receive email + password
 * 2. Search for user in database
 * 3. Fetch stored hash
 * 4. Compare entered password with hash (using bcrypt)
 * 5. If match is correct → create JWT
 * 6. Store JWT in secure Cookie
 * 7. Return user data
 */

import { supabase } from "@/shared/api/supabaseClient"; 
import { NextRequest, NextResponse } from "next/server";
import { verifyPassword } from "@/shared/libs/auth/password-hash";
import { createToken } from "@/shared/libs/auth/jwt";
import { createResponseWithSession } from "@/shared/libs/auth/cookies";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const { data: user, error: dbError } = await supabase
      .from("users")
      .select("id, email, name, password, role, created_at")
      .eq("email", email)
      .single();

    if (dbError || !user) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = await createToken({
      userId: user.id,                
      email: user.email,
      name: user.name,
    });

    return createResponseWithSession(
      {
        message: "Logged in successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // 👈 Very important
          createdAt: user.created_at,
        },
      },
      token,
      200
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }

}
