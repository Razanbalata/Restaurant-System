import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser } from "@/shared/libs/auth/auth-file";
import { verifyRestaurantOwner } from "@/shared/libs/auth/verifyRestaurantOwner";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ restaurantId: string }> } // تأكدي من تسمية المتغير id أو restaurantId حسب المجلد
) {
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
      return NextResponse.json({ error: "المطعم غير موجود" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// PATCH: تعديل المطعم
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> }
) {
  const { restaurantId } = await params;

  const user = await getCurrentUser(req);
  const userId = user?.userId;

  // تحقق ملكية
  const ownership = await verifyRestaurantOwner(restaurantId, userId);
  if (!ownership.ok) return ownership.response;

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
}

// DELETE: Soft Delete (تغيير is_active = false)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> }
) {
  const { restaurantId } = await params;

  const user = await getCurrentUser(req);
  const userId = user?.userId;

  const ownership = await verifyRestaurantOwner(restaurantId, userId);
  if (!ownership.ok) return ownership.response;

  const { data, error } = await supabase
    .from("restaurants")
    .update({ is_active: false })
    .eq("id", restaurantId)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}
