import { supabase } from "@/shared/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 1. تحديد أن params هي Promise
) {
  const body = await request.json();
  
  // 2. فك التشفير باستخدام await (هذا هو السطر الناقص)
  const { id } = await params; 

  const { data, error } = await supabase
    .from("restaurants")
    .update(body)
    .eq("id", id); // 3. استخدام المتغير id الذي استخرجناه

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  return Response.json({ restaurant: data });
}


export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 1. تعريف الـ params كـ Promise
) {
  // 2. فك التشفير باستخدام await قبل استخدام الـ id
  const { id } = await params;

  const { error } = await supabase
    .from("restaurants")
    .delete()
    .eq("id", id); // 3. استخدام المتغير id بعد فكه

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  return new Response(null, { status: 204 });
}
