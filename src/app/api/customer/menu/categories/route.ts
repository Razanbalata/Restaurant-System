import { supabase } from "@/shared/api/supabaseClient";
import { withAuth } from "@/shared/libs/auth/auth-file";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return withAuth(req, async (req, user) => {
    const restaurantId = req.nextUrl.searchParams.get("restaurantId");
    if (!restaurantId)
      return NextResponse.json(
        { error: "restaurantId required" },
        { status: 400 },
      );

    const { data, error } = await supabase
      .from("categories")
      .select(
        `
    id,
    name,
    "order",
    items:menu_items(*)  -- Fetch items related to category
  `,
      )
      .eq("restaurant_id", restaurantId)
      .eq("is_active", true)
      .order("created_at", { ascending: true });
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  });
}
