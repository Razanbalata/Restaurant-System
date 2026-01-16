// import { NextRequest, NextResponse } from "next/server";
// import { supabase } from "@/shared/api/supabaseClient";

// // GET + POST
// export async function GET(req: NextRequest) {
//   const categoryId = req.nextUrl.searchParams.get("categoryId");
//   if (!categoryId) return NextResponse.json({ error: "categoryId required" }, { status: 400 });

//   const { data, error } = await supabase
//     .from("menu_items")
//     .select("*")
//     .eq("category_id", categoryId)
//     .eq("available", true)
//     .order("created_at", { ascending: true });

//   if (error) return NextResponse.json({ error: error.message }, { status: 500 });

//   return NextResponse.json(data);
// }

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const { category_id, name, description, price } = body;

//   if (!category_id || !name || price == null) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

//   const { data, error } = await supabase
//     .from("menu_items")
//     .insert({ category_id, name, description, price })
//     .select("*")
//     .single();

//   if (error) return NextResponse.json({ error: error.message }, { status: 500 });

//   return NextResponse.json(data);
// }


import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser } from "@/shared/libs/auth/auth-file";
import { verifyRestaurantOwner } from "@/shared/libs/auth/verifyRestaurantOwner";

// GET all items for a category (Owner)
export async function GET(req: NextRequest) {
  const categoryId = req.nextUrl.searchParams.get("categoryId");
  if (!categoryId)
    return NextResponse.json({ error: "categoryId required" }, { status: 400 });

  const user = await getCurrentUser(req);
  if (!user || user.role !== "owner")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // جلب category للتحقق من ملكية المطعم
  const { data: category, error: catError } = await supabase
    .from("categories")
    .select("restaurant_id")
    .eq("id", categoryId)
    .single();

  if (catError || !category)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });

  const ownership = await verifyRestaurantOwner(category.restaurant_id, user.userId);
  if (!ownership.ok) return ownership.response;

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("category_id", categoryId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

// POST new item (Owner)
export async function POST(req: NextRequest) {
  const user = await getCurrentUser(req);
  if (!user || user.role !== "owner")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { category_id, name, description, price } = body;

  if (!category_id || !name || !price)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  // التحقق من ملكية المطعم عبر category
  const { data: category, error: catError } = await supabase
    .from("categories")
    .select("restaurant_id")
    .eq("id", category_id)
    .single();

  if (catError || !category)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });

  const ownership = await verifyRestaurantOwner(category.restaurant_id, user.userId);
  if (!ownership.ok) return ownership.response;

  const { data, error } = await supabase
    .from("menu_items")
    .insert({ category_id, name, description, price })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 201 });
}
