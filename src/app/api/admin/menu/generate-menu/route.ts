import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {
    const { restaurantName, userPrompt, type } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

   const prompt =
  type === "single"
    ? `
Generate ONE meal for a Palestinian restaurant called "${restaurantName}".
User request: "${userPrompt}"

Return ONLY valid JSON array like this:
[
  {
    "name": "Meal Name",
    "price": 0,
    "description": "Description here",
    "image_url": "A valid image URL, must be publicly accessible, preferably from Unsplash related to the meal"
  }
]
`
    : `
Generate 5-8 meals for a Palestinian restaurant called "${restaurantName}".
User request: "${userPrompt}"

Return ONLY valid JSON array like this:
[
  {
    "name": "Meal Name",
    "price": 0,
    "description": "Description here",
    "image_url": "A valid image URL, must be publicly accessible, preferably from Unsplash related to the meal"
  }
]
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleanJson = text.replace(/```json|```/g, "").trim();
    const menu = JSON.parse(cleanJson);

    // 🔐 حماية إضافية
    if (!Array.isArray(menu)) {
      throw new Error("AI did not return an array");
    }

    return NextResponse.json({ menu });
  } catch (error: any) {
    console.error("AI Generate Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
