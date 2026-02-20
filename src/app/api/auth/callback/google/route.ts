// /app/api/auth/callback/google/route.ts
import { NextRequest, NextResponse } from "next/server";
import { handleGoogleUser } from "@/shared/libs/auth/handleGoogleUser";
import { createToken } from "@/shared/libs/auth/jwt";
import {
  setSessionCookie,
  clearSessionCookie,
} from "@/shared/libs/auth/cookies";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code)
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    if (!state)
      return NextResponse.json({ error: "No state provided" }, { status: 400 });

    const cookieStore = await cookies();
    const savedState = cookieStore.get("google_oauth_state")?.value;

    if (state !== savedState) {
      return NextResponse.json({ error: "Invalid state" }, { status: 400 });
    }

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    });

    const tokenText = await tokenRes.text();
    let tokenData: any;
    try {
      tokenData = JSON.parse(tokenText);
    } catch {
      tokenData = null;
    }

    if (!tokenRes.ok || !tokenData || !tokenData.id_token) {
      console.error("❌ Google token exchange failed:", tokenText);
      return NextResponse.json(
        { error: "Google token exchange failed", details: tokenText },
        { status: 500 },
      );
    }

    const { id_token } = tokenData;

    const verifyRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`,
    );
    const googleUser = await verifyRes.json();

    if (googleUser.aud !== process.env.GOOGLE_CLIENT_ID) {
      return NextResponse.json({ error: "Invalid audience" }, { status: 401 });
    }

    const appUser = await handleGoogleUser({
      googleId: googleUser.sub,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
    });
    console.log(appUser);
    // 🔹 إنشاء JWT
    const jwt = await createToken({
      userId: appUser.id,
      email: appUser.email,
      name: appUser.name,
      role: appUser.role,
    });

    const targetPath =
      appUser.role === "restaurant_owner"
        ? "/shared/dashboard"
        : "/customer/cart";
    const response = NextResponse.redirect(new URL(targetPath, req.url));

    setSessionCookie(response, jwt, appUser.role);

    response.cookies.set("google_oauth_state", "", {
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("❌ Google callback error:", err);

    return NextResponse.json(
      {
        error: "Google authentication failed",
        message: err?.message ?? "Unknown error",
        stack: process.env.NODE_ENV === "development" ? err?.stack : undefined,
      },
      { status: 500 },
    );
  }
}
