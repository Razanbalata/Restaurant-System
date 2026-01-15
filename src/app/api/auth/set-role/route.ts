import { supabase } from "@/shared/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json({ error: "مطلوب userId و role" }, { status: 400 });
    }

    const { error } = await supabase
      .from("users")
      .update({ role })
      .eq("id", userId);

    if (error) {
      return NextResponse.json({ error: "فشل تحديث الدور" }, { status: 500 });
    }

    return NextResponse.json({ message: "تم تحديث الدور بنجاح" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "حدث خطأ أثناء تحديث الدور" }, { status: 500 });
  }
}
