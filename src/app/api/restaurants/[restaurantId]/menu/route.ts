import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> }
) {
  try {
    const { restaurantId } = await params;

    if (!restaurantId) {
      return NextResponse.json({ error: "رقم المطعم مطلوب" }, { status: 400 });
    }

    // 1️⃣ جلب الوجبات من الداتابيز
    const { data: items, error: fetchError } = await supabase
      .from("menu_items")
      .select("*")
      .eq("restaurant_id", restaurantId);

    if (fetchError) throw fetchError;

    if (items && items.length > 0) {
      console.log("🍽️ Found menu items in DB:", items);
      return NextResponse.json({ items });
    }

    // 2️⃣ إذا ما في بيانات، نرسل طلب لـ AI endpoint لتوليد المنيو
    console.log("ℹ️ لا توجد وجبات، سيتم طلب المنيو من AI...");
    const aiRes = await fetch(`${baseUrl}/api/restaurants/${restaurantId}/menu/generate-menu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ restaurantId }),
    });

    if (!aiRes.ok) {
      const text = await aiRes.text();
      console.error("❌ AI response failed:", text);
      return NextResponse.json({ error: "فشل توليد المنيو عبر AI" }, { status: 500 });
    }

    const aiData = await aiRes.json();
    console.log("🤖 AI generated menu:", aiData.menu);

    // 3️⃣ حفظ وجبات الـ AI في جدول menu_items
    const itemsToInsert = aiData.menu.map((item: any) => ({
      restaurant_id: restaurantId,
      name: item.name,
      description: item.description,
      price: item.price,
      image_url: item.image_url || null,
    }));

    const { data: savedItems, error: saveError } = await supabase
      .from("menu_items")
      .insert(itemsToInsert)
      .select();

    if (saveError) {
      console.error("❌ Failed to save AI menu:", saveError.message);
      return NextResponse.json({ error: saveError.message }, { status: 500 });
    }

    return NextResponse.json({ items: savedItems });

  } catch (err: any) {
    console.error("🔥 Unexpected error in GET /menu:", err);
    return NextResponse.json({ error: err.message || "حدث خطأ داخلي" }, { status: 500 });
  }
}

// ---------------------------------------------------------
// POST لإضافة وجبة واحدة يدوياً من قبل المالك
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> }
) {
  try {
    const { restaurantId } = await params;
    const body = await req.json();

    // نضمن أن الوجبة مرتبطة بالمطعم الصحيح
    const newItem = { ...body, restaurant_id: restaurantId };

    const { data, error } = await supabase
      .from("menu_items")
      .insert(newItem)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    return NextResponse.json({ item: data });
  } catch (err: any) {
    return NextResponse.json({ error: "فشل في إنشاء الوجبة" }, { status: 500 });
  }
}