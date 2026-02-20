// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/shared/api/supabaseClient";
import jwt from "jsonwebtoken";

const RESET_PASSWORD_SECRET = process.env.RESET_PASSWORD_SECRET || "secret123";
const RESET_PASSWORD_EXP = "2m";  

export async function POST(req: Request) {
  const { email } = await req.json();
  const { data: user } = await supabase
    .from("users")
    .select("id,email")
    .eq("email", email)
    .maybeSingle();

  if (!user) {
    return NextResponse.json({ success: true });
  }

  const token = jwt.sign({ userId: user.id }, RESET_PASSWORD_SECRET, { expiresIn: RESET_PASSWORD_EXP });

const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await fetch(`${process.env.NEXT_PUBLIC_API}/email/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: user.email,
      resetLink,
    }),
  });

  return NextResponse.json({ success: true,token  });
}
