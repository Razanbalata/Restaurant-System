import { supabase } from "@/shared/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const id = req.url.split("/").pop();
  const updates = await req.json();
  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
