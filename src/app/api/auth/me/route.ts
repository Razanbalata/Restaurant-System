// import { NextRequest, NextResponse } from "next/server";
// import { supabase } from "@/shared/api/supabaseClient";  
// import { getSessionToken } from "@/shared/libs/auth/cookies";
// import { verifyToken } from "@/shared/libs/auth/jwt";

// export async function GET(req: NextRequest) {
//   try {
//     // 1. Extract token from cookies
//     const token = getSessionToken(req);

//     if (!token) {
//       return NextResponse.json({ user: null }, { status: 401 });
//     }

//     // 2. Verify token validity (JWT Payload)
//     const payload = await verifyToken(token);

//     if (!payload || !payload.userId) {
//       return NextResponse.json({ user: null }, { status: 401 });
//     }

//     // 3. Fetch user data along with related restaurants (Relation)
//     // We use "restaurants" table name to fetch related data via owner_id
//     const { data: user, error } = await supabase
//       .from("users")
//       .select(`
//         id, 
//         email, 
//         phone,
//         name, 
//         role,
//         created_at,
//         restaurants (
//           id,
//           name,
//           city
//         )
//       `)
//       .eq("id", payload.userId)
//       .single();

//     // 4. Handle errors or missing user
//     if (error || !user) {
//       console.error("Supabase Error or User not found:", error);
//       return NextResponse.json({ user: null }, { status: 401 });
//     }

//     // 5. Prepare response data (Formatting)
//     // We determine if the user has a restaurant based on the returned array length
//     const restaurantData = user.restaurants && user.restaurants.length > 0 
//       ? user.restaurants[0] 
//       : null;

//     return NextResponse.json({
//       user: {
//         id: user.id,
//         email: user.email,
//         phone:user.phone,
//         name: user.name,
//         role:user.role,
//         createdAt: user.created_at,
//         // Restaurant data attached
//         restaurant: restaurantData,
//         hasRestaurant: !!restaurantData,
//       },
//     });

//   } catch (error) {
//     console.error("ME API Route Error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error", user: null }, 
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { getSessionToken } from "@/shared/libs/auth/cookies";
import { verifyToken } from "@/shared/libs/auth/jwt";

export async function GET(req: NextRequest) {
  console.log("➡️ [ME] Request received");

  try {
    // 1️⃣ Extract token from cookies
    const token = getSessionToken(req);
    console.log("🔑 Token from cookies:", token);

    if (!token) {
      console.warn("⚠️ No token found");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 2️⃣ Verify JWT
    const payload = await verifyToken(token);
    console.log("🧾 JWT payload:", payload);

    if (!payload || !payload.userId) {
      console.warn("⚠️ Invalid token payload");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 3️⃣ Fetch user + restaurants
    console.log("📡 Fetching user from Supabase...");
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

    console.log("👤 Supabase user data:", user);
    console.log("❌ Supabase error:", error);

    if (error || !user) {
      console.error("🚨 User not found or Supabase error");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 4️⃣ Normalize restaurants
    const restaurants = Array.isArray(user.restaurants)
      ? user.restaurants
      : [];

    console.log("🏪 Restaurants array:", restaurants);

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

    console.log("✅ Final response user:", responseUser);

    return NextResponse.json({ user: responseUser });

  } catch (error) {
    console.error("🔥 ME API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", user: null },
      { status: 500 }
    );
  }
}
