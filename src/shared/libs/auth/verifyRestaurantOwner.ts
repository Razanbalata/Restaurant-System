import { supabase } from "@/shared/api/supabaseClient"; 
import { NextResponse } from "next/server";

export async function verifyRestaurantOwner(
  restaurantId: string,
  userId: string
) {
  const { data, error } = await supabase
    .from("restaurants")
    .select("id")
    .eq("id", restaurantId)
    .eq("owner_id", userId)
    .single();

  if (error || !data) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Forbidden: You are not the owner of this restaurant" },
        { status: 403 }
      ),
    };
  }

  return { ok: true };
}
