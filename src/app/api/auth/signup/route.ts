import { supabase } from "@/shared/api/supabaseClient"; 
import { NextRequest, NextResponse } from "next/server";
import { hashPassword, validatePasswordStrength } from "@/shared/libs/auth/password-hash";
import { createToken } from "@/shared/libs/auth/jwt";
import { createResponseWithSession } from "@/shared/libs/auth/cookies";

export const POST = async (req: NextRequest) => {
  try {
    // 1️⃣ استقبال البيانات
    const { email, name, password, role } = await req.json();

    // 2️⃣ التحقق من وجود البيانات المطلوبة
    if (!email || !password || !role) {
      return NextResponse.json({ error: "الإيميل وكلمة المرور والدور مطلوبان" }, { status: 400 });
    }

    // 3️⃣ التحقق من صحة الإيميل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "الإيميل غير صالح" }, { status: 400 });
    }

    // 4️⃣ التحقق من قوة كلمة المرور
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: "كلمة المرور ضعيفة", details: passwordValidation.errors },
        { status: 400 }
      );
    }

    // 5️⃣ التحقق من عدم وجود المستخدم مسبقًا
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: "البريد الإلكتروني مستخدم بالفعل" }, { status: 409 });
    }

    // 6️⃣ تشفير كلمة المرور
    const hashedPassword = await hashPassword(password);

    // 7️⃣ إنشاء المستخدم مع حفظ الدور
    const { data: user, error: dbError } = await supabase
      .from("users")
      .insert({
        email,
        name: name || email.split("@")[0],
        password: hashedPassword,
        role, // 👈 هنا نحفظ الدور مباشرة
        created_at: new Date().toISOString(),
      })
      .select("id, email, name, role, created_at")
      .single();

    if (dbError || !user) {
      return NextResponse.json({ error: "فشل إنشاء المستخدم" }, { status: 500 });
    }

    // 8️⃣ إنشاء JWT Token
    const token = await createToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role, // 👈 نضيف الدور في التوكن
    });

    // 9️⃣ إرجاع الاستجابة مع Cookie آمنة
    return createResponseWithSession(
      {
        message: "تم إنشاء الحساب بنجاح",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // 👈 رجعنا الدور
          createdAt: user.created_at,
        },
      },
      token,
      201
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء التسجيل" }, { status: 500 });
  }
};
