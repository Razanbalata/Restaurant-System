import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser, withAuth } from "@/shared/libs/auth/auth-file";

export async function GET(req: NextRequest) {
   return withAuth(req, async (req, user) => {
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Fetch orders مع ربط order_items و menu_items
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        total_price,
        status,
        created_at,
        delivery_address,
        customer_phone,
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
      `)
      .eq("user_id", user.userId)
      .order("created_at", { ascending: false });

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    // Normalize the response for easier frontend use
    const normalized = data.map((order: any) => ({
      id: order.id,
      totalPrice: order.total_price,
      status: order.status,
      createdAt: order.created_at,
      deliveryAddress: order.delivery_address,
      customerPhone: order.customer_phone,
      notes: order.notes,
      items: order.order_items.map((oi: any) => ({
        id: oi.id,
        quantity: oi.quantity,
        price: oi.price,
        name: oi.menu_item?.name || "Unknown item",
      })),
    }));

    return NextResponse.json(normalized, { status: 200 });
  });
}

interface OrderItem {
  menuItemId: number; // متوافق مع zustand store
  price: number;
  quantity: number;
}

interface OrderBody {
  restaurantId: number;
  address: string;
  phone: string;
  notes?: string;
  items: OrderItem[];
}

export async function POST(req: NextRequest) {
    return withAuth(req, async (req, user) => {
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body: OrderBody = await req.json();

    const { restaurantId, items, address, phone, notes } = body;

    if (!restaurantId || !items || items.length === 0)
      return NextResponse.json(
        { error: "Missing items or restaurant" },
        { status: 400 }
      );

    // احسبي total
    const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

    // خزن order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.userId,
        restaurant_id: restaurantId,
        total_price: total,
        customer_phone: phone,
        delivery_address: address,
        notes,
      })
      .select("*")
      .single();

    if (orderError)
      return NextResponse.json({ error: orderError.message }, { status: 500 });

    // خزن order_items
    const { error: itemsError } = await supabase.from("order_items").insert(
      items.map((i) => ({
        order_id: order.id,
        menu_item_id: Number(i.menuItemId),
        price: i.price,
        quantity: i.quantity,
      }))
    );

    if (itemsError) {
      // rollback لو فشل تخزين items
      await supabase.from("orders").delete().eq("id", order.id);
      return NextResponse.json({ error: itemsError.message }, { status: 500 });
    }

    return NextResponse.json(order, { status: 201 });
  });
}
