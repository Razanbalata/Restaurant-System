import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { verifyRestaurantOwner } from "@/shared/libs/auth/verifyRestaurantOwner";
import { getCurrentUser, withAuth } from "@/shared/libs/auth/auth-file";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withAuth(req, async (req, user) => {
    const { id } = await params;

    const { name, description, price } = await req.json();

    const { data: item, error: itemError } = await supabase
      .from("menu_items")
      .select("category_id")
      .eq("id", id)
      .single();

    if (itemError || !item)
      return NextResponse.json({ error: "Item not found" }, { status: 404 });

    // جلب category للتحقق من ملكية المطعم
    const { data: category, error: catError } = await supabase
      .from("categories")
      .select("restaurant_id")
      .eq("id", item.category_id)
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
    if (!ownership.ok) return ownership.response;

    const { data, error } = await supabase
      .from("menu_items")
      .update({ name, description, price })
      .eq("id", id)
      .select("*")
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withAuth(req, async (req, user) => {
    const { id } = await params;
    if (!user || user.role !== "restaurant_owner")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { data: item, error: itemError } = await supabase
      .from("menu_items")
      .select("category_id")
      .eq("id", id)
      .single();

    if (itemError || !item)
      return NextResponse.json({ error: "Item not found" }, { status: 404 });

    // جلب category للتحقق من ملكية المطعم
    const { data: category, error: catError } = await supabase
      .from("categories")
      .select("restaurant_id")
      .eq("id", item.category_id)
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
    if (!ownership.ok) return ownership.response;

    const { data, error } = await supabase
      .from("menu_items")
      .update({ is_active: false })
      .eq("id", id)
      .select("*")
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  });
}
