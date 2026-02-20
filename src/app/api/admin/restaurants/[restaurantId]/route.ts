import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser, withAuth } from "@/shared/libs/auth/auth-file";
import { verifyRestaurantOwner } from "@/shared/libs/auth/verifyRestaurantOwner";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> }, // Make sure variable is named id or restaurantId according to folder
) {
  return withAuth(request, async (request, user) => {
    try {
      const { restaurantId } = await params;

      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("id", restaurantId)
        .single(); 

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
    if (!ownership.ok)
      return (
        ownership.response ??
        NextResponse.json({ error: "Ownership check failed" }, { status: 403 })
      );

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
  { params }: { params: Promise<{ restaurantId: string }> }
) {
  return withAuth(req, async (req, user) => {
    try {
      const { restaurantId } = await params;
      const userId = user?.userId;

      console.log("🚀 [API DELETE]: Starting process for ID:", restaurantId);

      // 1. قراءة الـ Query Parameter (هل هو حذف نهائي أم أرشفة؟)
      const { searchParams } = new URL(req.url);
      const isHardDelete = searchParams.get("hard") === "true";
      
      console.log("🛠 [API MODE]:", isHardDelete ? "HARD DELETE (Permanent)" : "SOFT DELETE (Toggle Status)");

      const ownership = await verifyRestaurantOwner(restaurantId, userId);
      if (!ownership.ok) {
        console.error("❌ [API AUTH]: Ownership check failed for user:", userId);
        return (
          ownership.response ??
          NextResponse.json({ error: "Ownership check failed" }, { status: 403 })
        );
      }

      if (isHardDelete) {
        // (Hard Delete) ---
        console.log("⚠️ [API]: Executing Hard Delete from Supabase...");
        
        const { error: deleteError } = await supabase
          .from("restaurants")
          .delete()
          .eq("id", restaurantId);

        if (deleteError) {
          console.error("❌ [API DATABASE ERROR]:", deleteError.message);
          return NextResponse.json({ error: deleteError.message }, { status: 400 });
        }

        console.log("✅ [API]: Restaurant deleted permanently from DB.");
        return NextResponse.json({ 
          message: "Restaurant deleted permanently", 
          id: restaurantId,
          mode: "hard" 
        });

      } else {
        // --- (Toggle is_active) ---
        console.log("🔍 [API]: Fetching current status...");

        const { data: currentRestaurant, error: fetchError } = await supabase
          .from("restaurants")
          .select("is_active, name")
          .eq("id", restaurantId)
          .single();

        if (fetchError || !currentRestaurant) {
          console.error("❌ [API]: Could not find restaurant to update");
          return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
        }

        const newStatus = !currentRestaurant.is_active;
        console.log(`🔄 [API]: Toggling status from ${currentRestaurant.is_active} to ${newStatus}`);

        const { data: updatedData, error: updateError } = await supabase
          .from("restaurants")
          .update({ is_active: newStatus })
          .eq("id", restaurantId)
          .select()
          .single();

        if (updateError) {
          console.error("❌ [API UPDATE ERROR]:", updateError.message);
          return NextResponse.json({ error: updateError.message }, { status: 400 });
        }

        console.log("✅ [API]: Status updated successfully. New is_active:", updatedData.is_active);
        
        return NextResponse.json(updatedData);
      }

    } catch (globalError: any) {
      console.error("🚨 [API CRITICAL ERROR]:", globalError.message);
      return NextResponse.json(
        { error: "Internal Server Error", details: globalError.message },
        { status: 500 }
      );
    }
  });
}
