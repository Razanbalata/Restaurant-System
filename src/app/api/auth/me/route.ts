import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";  
import { getSessionToken } from "@/shared/libs/auth/cookies";
import { verifyToken } from "@/shared/libs/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    // 1. استخراج التوكن من الكوكيز
    const token = getSessionToken(req);

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 2. التحقق من صحة التوكن (JWT Payload)
    const payload = await verifyToken(token);

    if (!payload || !payload.userId) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 3. جلب بيانات اليوزر مع المطاعم المرتبطة به (Relation)
    // نستخدم اسم الجدول "restaurants" لجلب البيانات المرتبطة عبر owner_id
    const { data: user, error } = await supabase
      .from("users")
      .select(`
        id, 
        email, 
        name, 
        role,
        created_at,
        restaurants (
          id,
          name,
          city
        )
      `)
      .eq("id", payload.userId)
      .single();

    // 4. معالجة الأخطاء أو عدم وجود يوزر
    if (error || !user) {
      console.error("Supabase Error or User not found:", error);
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 5. تجهيز البيانات الراجعة (Formatting)
    // نحدد إذا كان عنده مطعم أو لا بناءً على طول المصفوفة الراجعة
    const restaurantData = user.restaurants && user.restaurants.length > 0 
      ? user.restaurants[0] 
      : null;

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role:user.role,
        createdAt: user.created_at,
        // بيانات المطعم الملحقة
        restaurant: restaurantData,
        hasRestaurant: !!restaurantData,
      },
    });

  } catch (error) {
    console.error("ME API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", user: null }, 
      { status: 500 }
    );
  }
}