// app/cart/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser, withAuth } from "@/shared/libs/auth/auth-file";

// ========================
// GET /cart?userId=...
// ========================

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  console.log("GET /cart called", searchParams);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      id,
      quantity,
      price_at_time,
      menu_items:menu_item_id (
        id,
        name,
        price,
        image_url
      )
    `
    )
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// ========================
// POST /cart
// body: { userId, menuItemId, quantity? }
// ========================

export async function POST(req: Request) {
  return withAuth(req, async (request, user) => {
    // 1. استخراج الـ ID الصحيح (تأكد هل هو user.userId أم user.id أم user.sub)
    // بناءً على رسائل الخطأ السابقة، سوبابيس يتوقع UUID
    const actualUserId = user.userId || user.id || user.sub;

    if (!actualUserId) {
      return NextResponse.json(
        { error: "User ID is missing in token" },
        { status: 401 }
      );
    }

    const { menuItemId, quantity = 1 } = await req.json();

    if (!menuItemId) {
      return NextResponse.json(
        { error: "Missing menuItemId" },
        { status: 400 }
      );
    }

    // 2. جلب سعر الصنف (استعلام واحد فقط)
    const { data: menuItem, error: menuError } = await supabase
      .from("menu_items")
      .select("price")
      .eq("id", menuItemId)
      .single();

    if (menuError || !menuItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // 3. استخدام Upsert (تحديث إذا وجد أو إضافة إذا لم يوجد) في استعلام واحد!
    // ملاحظة: لكي يعمل الـ upsert، يجب وجود Unique Constraint على (user_id, menu_item_id)
    const { data, error } = await supabase
      .from("cart_items")
      .upsert(
        {
          user_id: actualUserId,
          menu_item_id: menuItemId,
          quantity: quantity, // يمكنك تعديل المنطق لزيادة الكمية بدلاً من استبدالها
          price_at_time: menuItem.price,
        },
        { onConflict: "user_id, menu_item_id" }
      )
      .select()
      .single();

    if (error) {
      console.error("Database Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  });
}

// ========================
// PATCH /cart
// body: { cartItemId, newQuantity }
// ========================

export async function PATCH(req: Request) {
  return withAuth(req, async (request, user) => {
    const actualUserId = user.userId || user.id || user.sub;

    if (!actualUserId) {
      return NextResponse.json(
        { error: "User ID is missing in token" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { cartItemId, newQuantity } = body;

    if (!cartItemId || newQuantity == null || newQuantity < 1) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

  const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", cartItemId) // معرف الصف
      .eq("user_id", actualUserId) // حماية: تأكد أن الصف يخص هذا المستخدم
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  });
}

// ========================
// DELETE /cart
// body: { cartItemId }
// ========================

export async function DELETE(req: Request) {
  const body = await req.json();
  const { cartItemId } = body;

  if (!cartItemId) {
    return NextResponse.json(
      { error: "cartItemId is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted successfully", data });
}
