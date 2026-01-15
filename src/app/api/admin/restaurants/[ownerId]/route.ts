import { supabase } from "@/shared/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

// PATCH: تعديل المطعم
export async function PATCH(req: NextRequest) {
  const id = req.url.split("/").pop();
  const updates = await req.json();
  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("restaurants")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// DELETE: Soft Delete (تغيير is_active = false)
export async function DELETE(req: NextRequest) {
  const id = req.url.split("/").pop();

  const { data, error } = await supabase
    .from("restaurants")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: "تم حذف المطعم (Soft Delete)", restaurant: data });
}
