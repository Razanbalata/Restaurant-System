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

    // 1️⃣ تحقق من وجود المطاعم في الداتابيز
    const { data: existingRestaurants, error: dbError } = await supabase
      .from("restaurants")
      .select("*")
      .eq("city", city);

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (existingRestaurants && existingRestaurants.length > 0) {
      // ارجع المطاعم الموجودة من الداتابيز
      return NextResponse.json({ restaurants: existingRestaurants });
    }

    // 2️⃣ إذا ما لقيت، ارسل طلب للـ Overpass API
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
      return NextResponse.json(
        { error: "Failed to fetch from Overpass" },
        { status: 500 }
      );
    }

    const overpassData = await res.json();

    // 3️⃣ تحويل البيانات لهيئة جاهزة للداتابيز
    const restaurants = overpassData.elements.map((el: any) => ({
      name: el.tags?.name || "Unknown",
      category: el.tags?.cuisine || "Restaurant",
      lat: el.lat || el.center?.lat || null,
      lng: el.lon || el.center?.lon || null,
      city,
      country: "Palestine",
      created_at: new Date().toISOString(),
    }));

    // 4️⃣ حفظ المطاعم الجديدة في الداتابيز
    const { data: inserted, error: insertError } = await supabase
      .from("restaurants")
      .upsert(restaurants)
      .select("*");

    if (insertError) {
      console.error("Insert DB error:", insertError);
      // حتى لو الفشل حصل، نرجع البيانات اللي حصلنا عليها من API
      return NextResponse.json({ restaurants }, { status: 200 });
    }

    // 5️⃣ إرجاع البيانات للواجهة
    return NextResponse.json({ restaurants: inserted });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
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
