import { supabase } from "@/shared/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const restaurantId = req.nextUrl.searchParams.get("restaurantId");
  console.log("restaurantId-----------------------------",restaurantId)
  if (!restaurantId)
    return NextResponse.json(
      { error: "restaurantId required" },
      { status: 400 }
    );

  const { data, error } = await supabase
    .from("categories")
    .select(
      `
    id,
    name,
    "order",
    items:menu_items(*)  -- تجلب الأصناف المرتبطة بالكاتيجوري
  `
    )
    .eq("restaurant_id", restaurantId)
    .eq("is_active", true)
    .order("created_at", { ascending: true });
console.log("dddd",data)
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
