// GET /api/restaurants
import { supabase } from "@/shared/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("is_active", true); // فقط المطاعم المفعلّة

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
