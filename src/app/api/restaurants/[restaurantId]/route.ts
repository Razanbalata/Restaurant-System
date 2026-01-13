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


export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ restaurantId: string }> } // 1. تحديد أن params هي Promise
) {
  const body = await request.json();
  
  // 2. فك التشفير باستخدام await (هذا هو السطر الناقص)
  const { restaurantId } = await params; 

  const { data, error } = await supabase
    .from("restaurants")
    .update(body)
    .eq("id", restaurantId); // 3. استخدام المتغير id الذي استخرجناه

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  return Response.json({ restaurant: data });
}


export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ restaurantId: string }> } // 1. تعريف الـ params كـ Promise
) {
  // 2. فك التشفير باستخدام await قبل استخدام الـ id
  const { restaurantId } = await params;

  const { error } = await supabase
    .from("restaurants")
    .delete()
    .eq("id", restaurantId); // 3. استخدام المتغير id بعد فكه

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  return new Response(null, { status: 204 });
}
