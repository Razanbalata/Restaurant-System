import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ restaurantId: string; itemId: string }> }
) {
  const { restaurantId, itemId } = await params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("menu_items")
    .update(body)
    .eq("id", itemId)
    .eq("restaurant_id", restaurantId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ item: data });
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ restaurantId: string; itemId: string }> }
) {
  const { restaurantId, itemId } = await params;

  const { error } = await supabase
    .from("menu_items")
    .delete()
    .eq("id", itemId)
    .eq("restaurant_id", restaurantId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

