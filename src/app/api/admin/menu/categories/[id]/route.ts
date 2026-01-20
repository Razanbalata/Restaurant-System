import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser } from "@/shared/libs/auth/auth-file";
import { verifyRestaurantOwner } from "@/shared/libs/auth/verifyRestaurantOwner";

// PATCH + DELETE
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ مهم جداً

  const user = await getCurrentUser(req);
  const userId = user?.userId;

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const  name  = await req.json();
  if (!name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  // 1️⃣ جلب الـ category للتحقق من restaurant_id
  const { data: category, error: catError } = await supabase
    .from("categories")
    .select("restaurant_id")
    .eq("id", id)
    .single();

  if (catError || !category)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });

  // 2️⃣ التحقق من ملكية المطعم
  const ownership = await verifyRestaurantOwner(category.restaurant_id, userId);
  if (!ownership.ok) return ownership.response;

  // 3️⃣ تحديث الاسم
  const { data, error } = await supabase
    .from("categories")
    .update( name )
    .eq("id", id)
    .select("*")
    .single(); // ← مهم جداً عشان ترجع object وليس array فاضية

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser(req);
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
  if (!ownership.ok) return ownership.response;

  // Soft delete
  const { data, error } = await supabase
    .from("categories")
    .update({ is_active: false })
    .eq("id", id)
    .select("*")
    .single();

   console.log("d---------------====",data) 
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
