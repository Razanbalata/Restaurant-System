// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";
// import { supabase } from "@/shared/api/supabaseClient"; // تأكدي من مسار ملف السوبا عندك

// const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// export async function POST(req: Request) {
//   try {
//     const { restaurantName, category, osmId } = await req.json();

//     // 1. محاولة جلب المنيو من Supabase أولاً
//     const { data: existingMenu } = await supabase
//       .from("menus")
//       .select("items")
//       .eq("osm_id", osmId)
//       .single();

//     if (existingMenu) {
//       console.log("✅ تم جلب المنيو من قاعدة البيانات");
//       return NextResponse.json({ menu: existingMenu.items });
//     }

//     // 2. إذا لم يوجد، نطلب من Gemini توليده
//     console.log("🤖 جاري توليد منيو جديد عبر الذكاء الاصطناعي...");
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const prompt = `
//       Generate a menu for a Palestinian restaurant named "${restaurantName}" specializing in "${category || "General"}". 
//       I want 8 meals at realistic prices in Shekel (ILS) with random image links from Unsplash.
//       The result should be a JSON array only:
//       [{"id": 1, "name": "...", "price": 0, "description": "...", "image_url": "..."}]
//     `;

//     const result = await model.generateContent(prompt);
//     const text = result.response.text();
//     const cleanJson = text.replace(/```json|```/g, "").trim();
//     const menuData = JSON.parse(cleanJson);

//     // 3. حفظ المنيو الجديد في Supabase للمرة القادمة
//     const { error: saveError } = await supabase
//       .from("menus")
//       .insert([{ osm_id: osmId, items: menuData }]);

//     if (saveError) console.error("❌ فشل حفظ المنيو في سوبا:", saveError.message);

//     return NextResponse.json({ menu: menuData });

//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { field, userPrompt } = await req.json();
    /**
     * field: "name" | "description" | "price" | "image_url"
     * userPrompt: Text written by the owner to guide AI
     */

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an AI assistant for Palestinian restaurants. 
      The owner wants a suggestion value for the field "${field}" for a single meal.
      Text provided by the owner: "${userPrompt}"
      Answer in JSON format only:
      {"value": "..."}

      Do not write anything else outside of JSON.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Clean text from any ```json or ``` extra
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanJson);

    return NextResponse.json({ value: parsed.value });
  } catch (error: any) {
    console.error("AI Field Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
