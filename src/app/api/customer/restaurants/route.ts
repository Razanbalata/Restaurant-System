// GET /api/restaurants
import { supabase } from "@/shared/api/supabaseClient";
import { withAuth } from "@/shared/libs/auth/auth-file";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return withAuth(req, async (req, user) => {
    const { data, error } = await supabase
      .from("restaurants")
      .select("*")
      .eq("is_active", true); // فقط المطاعم المفعلّة

    console.log("Fetched restaurants:", data, error);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  });
}
