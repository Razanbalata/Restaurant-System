import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";  
import { getSessionToken } from "@/shared/libs/auth/cookies";
import { verifyToken } from "@/shared/libs/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    // 1. Extract token from cookies
    const token = getSessionToken(req);

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 2. Verify token validity (JWT Payload)
    const payload = await verifyToken(token);

    if (!payload || !payload.userId) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 3. Fetch user data along with related restaurants (Relation)
    // We use "restaurants" table name to fetch related data via owner_id
    const { data: user, error } = await supabase
      .from("users")
      .select(`
        id, 
        email, 
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

    // 4. Handle errors or missing user
    if (error || !user) {
      console.error("Supabase Error or User not found:", error);
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 5. Prepare response data (Formatting)
    // We determine if the user has a restaurant based on the returned array length
    const restaurantData = user.restaurants && user.restaurants.length > 0 
      ? user.restaurants[0] 
      : null;

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role:user.role,
        createdAt: user.created_at,
        // Restaurant data attached
        restaurant: restaurantData,
        hasRestaurant: !!restaurantData,
      },
    });

  } catch (error) {
    console.error("ME API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", user: null }, 
      { status: 500 }
    );
  }
}