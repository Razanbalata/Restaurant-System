import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/shared/libs/auth/auth-file"; // الفنكشن الموجودة عندك
import { supabase } from "@/shared/api/supabaseClient";
import { verifyPassword, hashPassword } from "@/shared/libs/auth/password-hash";

export async function PATCH(req: NextRequest) {
  // استخدم withAuth لتأكيد دخول المستخدم
  return withAuth(req, async (req, user) => {
    try {
      const userId = user.userId; // مع withAuth تحصل على user.userId

      // قراءة الفورم داتا
      const formData = await req.formData();
      const oldPassword = formData.get("oldPassword") as string;
      const newPassword = formData.get("newPassword") as string;

      if (!oldPassword || !newPassword) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }

      // جلب الباسورد الحالي من DB
      const { data: dbUser, error: dbError } = await supabase
        .from("users")
        .select("password")
        .eq("id", userId)
        .single();

      if (dbError || !dbUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // تحقق من كلمة السر القديمة
      const isPasswordValid = await verifyPassword(oldPassword, dbUser.password);
      if (!isPasswordValid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
      }

      // هاش الباسورد الجديد
      const hashedPassword = await hashPassword(newPassword);

      // تحديث قاعدة البيانات
      const { error: updateError } = await supabase
        .from("users")
        .update({ password: hashedPassword })
        .eq("id", userId);

      if (updateError) {
        return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
      }

      return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    } catch (error) {
      console.error("Update password error:", error);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  });
}
