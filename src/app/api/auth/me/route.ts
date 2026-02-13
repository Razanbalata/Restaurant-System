
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { getSessionToken } from "@/shared/libs/auth/cookies";
import { verifyToken } from "@/shared/libs/auth/jwt";

export async function GET(req: NextRequest) {

  try {
    // 1️⃣ Extract token from cookies
    const token = getSessionToken(req);

    if (!token) {
      console.warn("⚠️ No token found");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 2️⃣ Verify JWT
    const payload = await verifyToken(token);

    if (!payload || !payload.userId) {
      console.warn("⚠️ Invalid token payload");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 3️⃣ Fetch user + restaurants
    const { data: user, error } = await supabase
      .from("users")
      .select(`
        id,
        email,
        phone,
        name,
        role,
        created_at,
        restaurants (
          id,
          name,
          city
        )
      `)
      .eq("id", payload.userId)
      .single();


    if (error || !user) {
      console.error("🚨 User not found or Supabase error");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 4️⃣ Normalize restaurants
    const restaurants = Array.isArray(user.restaurants)
      ? user.restaurants
      : [];


    // 5️⃣ Final response
    const responseUser = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      name: user.name,
      role: user.role,
      createdAt: user.created_at,
      restaurants,
      hasRestaurant: restaurants.length > 0,
    };


    return NextResponse.json({ user: responseUser });

  } catch (error) {
    console.error("🔥 ME API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", user: null },
      { status: 500 }
    );
  }
}
