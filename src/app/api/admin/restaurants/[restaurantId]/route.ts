import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser, withAuth } from "@/shared/libs/auth/auth-file";
import { verifyRestaurantOwner } from "@/shared/libs/auth/verifyRestaurantOwner";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> }, // Make sure variable is named id or restaurantId according to folder
) {
  return withAuth(request,async(request, user) => {
    try {
      const { restaurantId } = await params;

      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("id", restaurantId)
        .single(); // تجلب كائن واحد فقط بدل مصفوفة

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      if (!data) {
        return NextResponse.json(
          { error: "Restaurant not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(data);
    } catch (err) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  });
}

// PATCH: Update restaurant
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> },
) {
  return withAuth(req, async (req, user) => {
    const { restaurantId } = await params;

    const userId = user?.userId;

    // Verify ownership
    const ownership = await verifyRestaurantOwner(restaurantId, userId);
    if (!ownership.ok) return ownership.response ?? NextResponse.json({ error: "Ownership check failed" }, { status: 403 });

    const updates = await req.json();

    const { data, error } = await supabase
      .from("restaurants")
      .update(updates)
      .eq("id", restaurantId)
      .select()
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(data);
  });
}

// DELETE: Soft Delete (change is_active = false)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> },
) {
  return withAuth(req, async (req, user) => {
    const { restaurantId } = await params;

    const userId = user?.userId;

    const ownership = await verifyRestaurantOwner(restaurantId, userId);
    if (!ownership.ok) return ownership.response ?? NextResponse.json({ error: "Ownership check failed" }, { status: 403 });

    const { data, error } = await supabase
      .from("restaurants")
      .update({ is_active: false })
      .eq("id", restaurantId)
      .select()
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(data);
  });
}
