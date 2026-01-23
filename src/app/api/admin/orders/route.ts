import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser, withAuth } from "@/shared/libs/auth/auth-file";

export async function GET(req: NextRequest) {
  return withAuth(req, async (req, user) => {
    const restaurantId = req.nextUrl.searchParams.get("restaurantId");
    if (!restaurantId)
      return NextResponse.json(
        { error: "restaurantId required" },
        { status: 400 },
      );

    if (!user || user.role !== "restaurant_owner")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
    id,
    total_price,
    status,
    created_at,
    address,
    phone,
    notes,
    order_items (
      id,
      quantity,
      price,
      menu_item:menu_items (
        id,
        name
      )
    )
  `,
      )
      .eq("restaurant_id", restaurantId)
      .order("created_at", { ascending: false });

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  });
}
