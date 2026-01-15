import { supabase } from "@/shared/api/supabaseClient";
import { withAuth } from "@/shared/libs/auth/auth-file";
import { NextResponse } from "next/server";


// ========================
// GET /orders
// ========================

export async function GET(req: Request) {
  return withAuth(req, async (request, user) => {
    console.log("user orders api",user)
    const userId = user.userId; // التأكد أن user.sub هو الـ UUID الصحيح

    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        total_price,
        status,
        created_at,
        order_items (
          quantity,
          price,
          menu_items (name, image_url)
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    
    return NextResponse.json(data);
  });
}


// ========================
// POST /orders
// ========================

export async function POST(req: Request) {
  return withAuth(req, async (request, user) => {
    console.log("user placing order",user)
    const userId = user.userId; // التأكد أن user.sub هو الـ UUID الصحيح

    // 1. جلب الكارت (مع التحقق من وجود بيانات)
    const { data: cartItems, error: cartError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", userId);

    if (cartError || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "السلة فارغة أو حدث خطأ" }, { status: 400 });
    }

    // 2. حساب المجموع (تأكد أن السعر رقم Number)
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.price_at_time),
      0
    );

    // 3. إنشاء الطلب (تأكد من مطابقة أسماء الأعمدة في قاعدة بياناتك)
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        total_price: total, // تأكد هل اسم العمود total_price أم total_amount؟
        status: "pending",
      })
      .select()
      .single();

    if (orderError) return NextResponse.json({ error: orderError.message }, { status: 500 });

    // 4. إنشاء عناصر الطلب
    const orderItemsData = cartItems.map(item => ({
      order_id: order.id,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      price: item.price_at_time,
    }));
    console.log("order items data",orderItemsData)

    const { error: itemsError } = await supabase.from("order_items").insert(orderItemsData);

    if (itemsError) {
      // ملاحظة: هنا يفضل عمل Rollback لكن في JS العادي صعب، لذا نكتفي بتسجيل الخطأ
      return NextResponse.json({ error: "فشل في حفظ تفاصيل الطلب" }, { status: 500 });
    }

    // 5. تفريغ السلة (فقط إذا نجح كل ما سبق)
    await supabase.from("cart_items").delete().eq("user_id", userId);

    return NextResponse.json(order);
  });
}
