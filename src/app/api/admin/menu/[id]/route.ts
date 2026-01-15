import { supabase } from "@/shared/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

// PATCH: تعديل أي بيانات للصنف
export async function PATCH(req: NextRequest) {
  const id = req.url.split("/").pop();
  const updates = await req.json();
  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("menus")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// DELETE حذف صنف
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id مطلوب" }, { status: 400 });

  const { data, error } = await supabase
    .from("menu")
    .update({ is_available: false, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

