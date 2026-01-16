import { supabase } from "@/shared/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: Request,
  { params }: { params: Promise<{ restaurantId: string }> } // تأكدي من تسمية المتغير id أو restaurantId حسب المجلد
) {
  try {
    const { restaurantId } = await params;

    const { data, error } = await supabase
      .from("restaurants")
      .select("*")
      .eq("id", restaurantId)
      .single(); // تجلب كائن واحد فقط بدل مصفوفة

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ error: "المطعم غير موجود" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}