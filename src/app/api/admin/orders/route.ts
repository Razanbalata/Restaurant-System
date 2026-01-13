import { supabase } from "@/shared/api/supabaseClient";
import { withAuth } from "@/shared/libs/auth/auth-file";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return withAuth(req, async (request, user) => {
    const userId = user.userId;

    // جلب الطلبات الواردة لمطاعم هذا الإدمن
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        total_price,
        status,
        created_at,
        user_id,
        restaurant_id,
        restaurants!inner(name, owner_id),
        order_items (
          id,
          quantity,
          price,
          menu_items (name, image_url)
        )
      `)
      .eq("restaurants.owner_id", userId) // الفلترة حسب صاحب المطعم
      .order("created_at", { ascending: false }); // الأحدث أولاً

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  });
}

// ========================
// PATCH /api/admin/orders
// ========================

export async function PATCH(req: Request) {
  return withAuth(req, async (request, user) => {
    const { orderId, newStatus } = await req.json(); // بنستلم رقم الطلب والحالة الجديدة
    const userId = user.userId;

    // خطوة حماية إضافية: التأكد إن الطلب هاد فعلاً تابع لمطعم بيملكه هاد الإدمن
    // عشان ما يجي إدمن مطعم (أ) يغير حالة طلب في مطعم (ب)
    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("id, restaurants!inner(owner_id)")
      .eq("id", orderId)
      .eq("restaurants.owner_id", userId)
      .single();

    if (fetchError || !order) {
      return NextResponse.json({ error: "الطلب غير موجود أو لا تملك صلاحية تعديله" }, { status: 403 });
    }

    // التحديث الفعلي للحالة
    const { data, error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  });
}