import { supabase } from "@/shared/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const ownerId = req.nextUrl.searchParams.get("ownerId");
  console.log("ownerId",ownerId)
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("owner_id", ownerId)
    .eq("is_active", true);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { name, description, city,country, owner_id } = await req.json();
  const { data, error } = await supabase
    .from("restaurants")
    .insert({ name, description, city,country, owner_id, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .select("*")
    .single();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
