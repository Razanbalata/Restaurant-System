import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";  
import { getSessionToken } from "@/shared/libs/auth/cookies";
import { verifyToken } from "@/shared/libs/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = getSessionToken(req);

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, name, created_at")
      .eq("id", payload.userId)
      .single();

    if (error || !user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error("ME error:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
