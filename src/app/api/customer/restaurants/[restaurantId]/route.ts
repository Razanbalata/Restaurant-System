import { supabase } from "@/shared/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: Request,
  { params }: { params: Promise<{ restaurantId: string }> } // Make sure variable is named id or restaurantId according to folder
) {
  try {
    const { restaurantId } = await params;

    const { data, error } = await supabase
      .from("restaurants")
      .select("*")
      .eq("id", restaurantId)
      .single(); // Fetch only one object instead of array

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ restaurantId: string }> }, // تأكدي من تسمية المتغير id أو restaurantId حسب المجلد
// ) {
//   return withAuth(request, async (request, user) => {
//     try {
//       const { restaurantId } = await params;

//       const { data, error } = await supabase
//         .from("restaurants")
//         .select("*")
//         .eq("id", restaurantId)
//         .single(); // تجلب كائن واحد فقط بدل مصفوفة

//       if (error) {
//         return NextResponse.json({ error: error.message }, { status: 400 });
//       }

//       if (!data) {
//         return NextResponse.json(
//           { error: "Restaurant not found" },
//           { status: 404 },
//         );
//       }

//       return NextResponse.json(data);
//     } catch (err) {
//       return NextResponse.json(
//         { error: "Internal Server Error" },
//         { status: 500 },
//       );
//     }
//   });
// }
