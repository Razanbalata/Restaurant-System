import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import { withAuth } from "@/shared/libs/auth/auth-file";
import { verifyRestaurantOwner } from "@/shared/libs/auth/verifyRestaurantOwner";

// GET all items for a category (Owner)
export async function GET(req: NextRequest) {
  return withAuth(req, async (req, user) => {
    const categoryId = req.nextUrl.searchParams.get("categoryId");
    if (!categoryId) {
      return NextResponse.json(
        { error: "categoryId required" },
        { status: 400 }
      );
    }

    // Fetch category to verify restaurant ownership
    const { data: category, error: catError } = await supabase
      .from("categories")
      .select("restaurant_id")
      .eq("id", categoryId)
      .single();

    if (catError || !category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const ownership = await verifyRestaurantOwner(
      category.restaurant_id,
      user.userId
    );

    if (!ownership.ok) {
      return ownership.response ?? NextResponse.json(
        { error: "Ownership check failed" },
        { status: 403 }
      );
    }

    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("category_id", categoryId)
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  });
}

// POST new item (Owner)
export async function POST(req: NextRequest) {
  return withAuth(req, async (req, user) => {
    try {
      const body = await req.json();
      const { categoryId, restaurantId, items } = body;

      if (!categoryId || !restaurantId || !items || !Array.isArray(items)) {
        return NextResponse.json({ error: "Missing data" }, { status: 400 });
      }

      const ownership = await verifyRestaurantOwner(restaurantId, user.userId);
      
      if (!ownership.ok) {
        return ownership.response ?? NextResponse.json(
          { error: "You don't have permission to modify this restaurant" },
          { status: 403 }
        );
      }

      const insertData = items.map((item: any) => ({
        category_id: categoryId,
        name: item.name,
        description: item.description || "",
        price: item.price,
        restaurant_id: restaurantId,
        image_url: item.image_url || null,
      }));

      const { data, error } = await supabase
        .from("menu_items")
        .insert(insertData)
        .select(`
          *,
          categories (
            id,
            name
          )
        `);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      const formattedData = data.map((item: any) => ({
        ...item,
        category_id: item.category_id,
        categoryName: item.categories?.name,
      }));

      return NextResponse.json(
        { added: formattedData, count: data.length },
        { status: 201 }
      );
    } catch (err: any) {
      return NextResponse.json(
        { error: err.message || "Internal Server Error" },
        { status: 500 }
      );
    }
  });
}