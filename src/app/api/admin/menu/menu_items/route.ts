import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser, withAuth } from "@/shared/libs/auth/auth-file";
import { verifyRestaurantOwner } from "@/shared/libs/auth/verifyRestaurantOwner";

// GET all items for a category (Owner)
export async function GET(req: NextRequest) {
  return withAuth(req, async (req, user) => {
    const categoryId = req.nextUrl.searchParams.get("categoryId");
    if (!categoryId)
      return NextResponse.json(
        { error: "categoryId required" },
        { status: 400 },
      );

    if (!user || user.role !== "restaurant_owner")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // Fetch category to verify restaurant ownership
    const { data: category, error: catError } = await supabase
      .from("categories")
      .select("restaurant_id")
      .eq("id", categoryId)
      .single();
    if (catError || !category)
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );

    const ownership = await verifyRestaurantOwner(
      category.restaurant_id,
      user.userId,
    );
    if (!ownership.ok) return ownership.response ?? NextResponse.json({ error: "Ownership check failed" }, { status: 403 });

    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("category_id", categoryId)
      .order("created_at", { ascending: true });

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  });
}

// POST new item (Owner)
export async function POST(req: NextRequest) {
return withAuth(req,async(req,user)=>{


  if (!user || user.role !== "restaurant_owner")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { category_id, restaurant_id, name, description, price } = body.newItem;


  if (!category_id || !name || !price)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  // Verify restaurant ownership via category
  const { data: category, error: catError } = await supabase
    .from("categories")
    .select("restaurant_id")
    .eq("id", category_id)
    .single();

  if (catError || !category)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });

  const ownership = await verifyRestaurantOwner(restaurant_id, user.userId);
  if (!ownership.ok) return ownership.response ?? NextResponse.json({ error: "Ownership check failed" }, { status: 403 });

  const { data, error } = await supabase
    .from("menu_items")
    .insert({
      category_id: category_id,
      name,
      description,
      price,
      restaurant_id,
    })
    .select("*")
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 201 });
})
}
