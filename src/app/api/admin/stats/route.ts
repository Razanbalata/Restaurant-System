import { supabase } from "@/shared/api/supabaseClient";
import { withAuth } from "@/shared/libs/auth/auth-file";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return withAuth(req, async (request, user) => {
    const userId = user.userId;

    // 1. جلب كل الطلبات اللي بتخص مطاعم هاد اليوزر
    // بنعمل Join مع جدول المطاعم عشان نتأكد إن صاحب المطعم هو نفسه اليوزر المسجل
    const { data: adminOrders, error } = await supabase
      .from("orders")
      .select(`
        total_price,
        status,
        created_at,
        restaurant_id,
        restaurants!inner(owner_id)
      `)
      .eq("restaurants.owner_id", userId);
   console.log('Admin Orders:', adminOrders);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. الحسابات الذكية (Server-Side)
    
    // أ. إجمالي المبيعات (فقط للطلبات اللي تم توصيلها)
    const totalSales = adminOrders
      .filter(o => o.status === "delivered")
      .reduce((sum, o) => sum + Number(o.total_price || 0), 0);

    // ب. طلبات اليوم (بنقارن تاريخ اليوم مع تاريخ الطلب)
    const today = new Date().toISOString().split("T")[0];
    const todayOrders = adminOrders.filter(o => 
      o.created_at.startsWith(today)
    ).length;

    // ج. الطلبات النشطة (اللي لسه ما خلصت)
    const activeOrders = adminOrders.filter(o => 
      ["pending", "preparing"].includes(o.status)
    ).length;

    // د. عدد المطاعم الفريدة اللي بتجيلها طلبات
    const restaurantCount = new Set(adminOrders.map(o => o.restaurant_id)).size;

    // 3. نرسل النتيجة النهائية "مطبوخة" وجاهزة
    return NextResponse.json({
      totalSales,
      todayOrders,
      activeOrders,
      restaurantCount
    });
  });
}