import { supabase } from "@/shared/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

// GET: جلب كل الأصناف مع فلترة اختيارية
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const restaurantId = searchParams.get("restaurantId");
  const category = searchParams.get("category");
  const showAvailableOnly = searchParams.get("available") === "true"; // optional

  if (!restaurantId) return NextResponse.json({ error: "restaurantId مطلوب" }, { status: 400 });

  let query = supabase
    .from("menu")
    .select("*")
    .eq("restaurant_id", restaurantId);

  if (category) query = query.eq("category", category);
  if (showAvailableOnly) query = query.eq("is_available", true);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

// POST: إضافة صنف جديد
export async function POST(req: NextRequest) {
  const { restaurant_id, name, description, price, category, is_available, imageUrl } = await req.json();
  const { data, error } = await supabase
    .from("menus")
    .insert({ restaurant_id, name, description, price, category, is_available, image_url: imageUrl, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
