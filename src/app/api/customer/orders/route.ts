import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser, withAuth } from "@/shared/libs/auth/auth-file";

export async function GET(req: NextRequest) {
  return withAuth(req, async (req, user) => {
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
      .eq("user_id", user.userId)
      .order("created_at", { ascending: false });

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  });
}

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, user) => {
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    
    // تعريف نوع العناصر بوضوح
    interface OrderItem {
      id: string;
      price: number;
      quantity: number;
    }

    const restaurantId = body.restaurantId;
    const items = body.items as OrderItem[]; // هنا حددنا النوع للمصفوفة كاملة

    if (!restaurantId || !items || items.length === 0)
      return NextResponse.json(
        { error: "Missing items or restaurant" },
        { status: 400 },
      );

    // حساب total - الآن i معروفة تلقائياً أنها OrderItem
    const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.userId,
        restaurant_id: restaurantId,
        total_price: total,
        phone: body.phone,
        address: body.address,
        notes: body.notes,
      })
      .select("*")
      .single();

    if (orderError)
      return NextResponse.json({ error: orderError.message }, { status: 500 });

    // إنشاء order_items - الآن map ستعرف نوع i تلقائياً
    const { error: itemsError } = await supabase.from("order_items").insert(
      items.map((i) => ({
        order_id: order.id,
        menu_item_id: i.id,
        price: i.price,
        quantity: i.quantity,
      })),
    );

    if (itemsError)
      return NextResponse.json({ error: itemsError.message }, { status: 500 });

    return NextResponse.json(order, { status: 201 });
  });
}
