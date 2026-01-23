import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser, withAuth } from "@/shared/libs/auth/auth-file";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return withAuth(req, async (req, user) => {
    const ownerId = user?.userId;

    if (!ownerId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data, error } = await supabase
      .from("restaurants")
      .select("*")
      .eq("owner_id", ownerId);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(data);
  });
}

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, user) => {
    const ownerId = user?.userId;

    if (!ownerId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, description, city, country } = await req.json();

    const { data, error } = await supabase
      .from("restaurants")
      .insert({
        name,
        description,
        city,
        country,
        owner_id: ownerId,
        is_active: true,
      })
      .select()
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(data, { status: 201 });
  });
}
