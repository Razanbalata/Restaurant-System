// src/app/api/restaurants/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser, withAuth } from "@/shared/libs/auth/auth-file";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

export async function GET(req: NextRequest) {
  try {
    const city = req.nextUrl.searchParams.get("city");
    if (!city) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    // --- دالة مساعدة لإضافة الصورة الديناميكية بناءً على التصنيف والـ ID ---
    const enrichWithImage = (res: any) => {
      const categorySearch = res.category || "restaurant,food";
      // نستخدم sig=${res.id} لضمان أن كل مطعم يحجز صورته ولا تتغير عند التحديث
      // استخدمي هذا الرابط بدلاً من القديم
const dynamicImage = `https://picsum.photos/seed/${res.id}/800/600`;      
      return {
        ...res,
        image_url: res.image_url || dynamicImage,
      };
    };

    // 1️⃣ البحث عن المطاعم الموجودة مسبقاً في الداتابيز لهذه المدينة
    const { data: existingRestaurants, error: dbError } = await supabase
      .from("restaurants")
      .select("*")
      .eq("city", city);

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // إذا وُجدت مطاعم، نرجعها فوراً مع الصور
    if (existingRestaurants && existingRestaurants.length > 0) {
      const restaurantsWithImages = existingRestaurants.map(enrichWithImage);
      return NextResponse.json({ restaurants: restaurantsWithImages });
    }

    // 2️⃣ إذا لم توجد بيانات، نطلبها من Overpass API
    const query = `
      [out:json][timeout:25];
      area["name:en"="${city}"]->.searchArea;
      (
        node["amenity"="restaurant"](area.searchArea);
        node["amenity"="fast_food"](area.searchArea);
        way["amenity"="restaurant"](area.searchArea);
      );
      out tags center;
    `;

    const res = await fetch(OVERPASS_URL, {
      method: "POST",
      body: query,
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch from Overpass" }, { status: 500 });
    }

    const overpassData = await res.json();

    // 3️⃣ تحويل بيانات الخريطة لتناسب جدول الداتابيز
    const restaurantsToInsert = overpassData.elements.map((el: any) => ({
      name: el.tags?.name || "مطعم غير معروف",
      category: el.tags?.cuisine || "Restaurant",
      lat: el.lat || el.center?.lat || null,
      lng: el.lon || el.center?.lon || null,
      city,
      country: "Palestine",
      created_at: new Date().toISOString(),
    }));

    if (restaurantsToInsert.length === 0) {
      return NextResponse.json({ restaurants: [] });
    }

    // 4️⃣ حفظ المطاعم الجديدة في Supabase
    const { data: insertedRestaurants, error: insertError } = await supabase
      .from("restaurants")
      .insert(restaurantsToInsert)
      .select("*");

    if (insertError) {
      console.error("Insert DB error:", insertError);
      // في حال فشل الحفظ، نرجع البيانات المستخرجة مع صور عشوائية مؤقتة
      return NextResponse.json({ 
        restaurants: restaurantsToInsert.map(enrichWithImage) 
      });
    }

    // 5️⃣ إرجاع المطاعم الجديدة بعد أن أخذت IDs حقيقية لضمان ثبات الصور
    const finalData = insertedRestaurants.map(enrichWithImage);
    console.log("Inserted restaurants:", finalData);

    return NextResponse.json({ restaurants: finalData });

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    // تحقق من الأعمدة الأساسية
    if (!body.name || !body.city || !body.country) {
      return NextResponse.json({ error: "name, city, and country are required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("restaurants")
      .insert([{
        ...body,
        owner_id: user.userId, // ربط المطعم باليوزر الحالي
      }])
      .select()
      .single();

    console.log("Supabase insert output:", { data, error });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ restaurant: data }, { status: 201 });
  } catch (err: any) {
    console.error("POST /restaurants error:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
