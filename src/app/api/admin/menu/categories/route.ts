import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser } from "@/shared/libs/auth/auth-file";
import { verifyRestaurantOwner } from "@/shared/libs/auth/verifyRestaurantOwner";

// GET + POST
export async function GET(req: NextRequest) {
  const restaurantId = req.nextUrl.searchParams.get("restaurantId");

  const user = await getCurrentUser(req);
  console.log("user-----------------------------",user)

  if (!restaurantId)
    return NextResponse.json(
      { error: "restaurantId required" },
      { status: 400 }
    );

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .order("created_at");

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser(req);
  const userId = user?.userId;
  
  console.log("user",user)

  // if (!userId || user.role !== "owner")
  //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  console.log("body",body)
  const { restaurantId, name } = body;

  if (!restaurantId || !name)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const ownership = await verifyRestaurantOwner(restaurantId, userId);
  if (!ownership.ok) return ownership.response;

  const { data, error } = await supabase
    .from("categories")
    .insert({ "restaurant_id":restaurantId, name })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 201 });
}
