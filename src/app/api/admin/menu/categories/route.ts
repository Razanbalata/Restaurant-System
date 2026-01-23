import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser, withAuth } from "@/shared/libs/auth/auth-file";
import { verifyRestaurantOwner } from "@/shared/libs/auth/verifyRestaurantOwner";

// GET + POST
export async function GET(req: NextRequest) {
return withAuth(req,async(req,user)=>{
    const restaurantId = req.nextUrl.searchParams.get("restaurantId");

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
})
}

export async function POST(req: NextRequest) {
return withAuth(req,async(req,user)=>{
  const userId = user?.userId;
  

  if (!userId || user.role !== "restaurant_owner")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { restaurant_id, name } = body;
   
  if (!restaurant_id || !name)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const ownership = await verifyRestaurantOwner(restaurant_id, userId);
  if (!ownership.ok) return ownership.response;

  const { data, error } = await supabase
    .from("categories")
    .insert({ "restaurant_id":restaurant_id, name })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 201 });
})
}
