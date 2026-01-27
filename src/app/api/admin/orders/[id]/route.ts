import { supabase } from "@/shared/api/supabaseClient";
import { getCurrentUser, withAuth } from "@/shared/libs/auth/auth-file";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withAuth(req, async (req, user) => {
    const { id } = await params;


    const { status } = await req.json();
    if (!status)
      return NextResponse.json({ error: "status required" }, { status: 400 });

    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select("*")
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  });
}
