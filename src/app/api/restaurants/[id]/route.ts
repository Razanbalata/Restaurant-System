import { supabase } from "@/shared/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const { error } = await supabase
    .from("restaurants")
    .update(body)
    .eq("id", params.id);

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  return NextResponse.json({ success: true });
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error } = await supabase
    .from("restaurants")
    .delete()
    .eq("id", params.id);

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
