import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser, withAuth } from "@/shared/libs/auth/auth-file";
import { verifyRestaurantOwner } from "@/shared/libs/auth/verifyRestaurantOwner";

// PATCH + DELETE
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withAuth(req, async (req, user) => {
    const { id } = await params; 
    const userId = user?.userId;

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json(); // Changed name to body because it contains the data
    if (!body)
      return NextResponse.json({ error: "Data is required" }, { status: 400 });

    const { data: category, error: catError } = await supabase
      .from("categories")
      .select("restaurant_id")
      .eq("id", id)
      .single();

    if (catError || !category)
      return NextResponse.json({ error: "Category not found" }, { status: 404 });

    const ownership = await verifyRestaurantOwner(category.restaurant_id, userId);
    
    // Make sure to always return the response
    if (!ownership.ok) return ownership.response!; 

    const { data, error } = await supabase
      .from("categories")
      .update(body) // Ensure body is an object
      .eq("id", id)
      .select("*")
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data, { status: 200 });
  });
}

// DELETE بنفس الطريقة
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withAuth(req, async (req, user) => {
    const { id } = await params;
    const userId = user?.userId;

    const { data: category } = await supabase
      .from("categories")
      .select("restaurant_id")
      .eq("id", id)
      .single();

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const ownership = await verifyRestaurantOwner(category.restaurant_id, userId);
    if (!ownership.ok) return ownership.response!; // Exclamation mark to confirm it's not undefined

    const { data, error } = await supabase
      .from("categories")
      .update({ is_active: false })
      .eq("id", id)
      .select("*")
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data ?? { success: true }); // Ensure final return
  });
}
