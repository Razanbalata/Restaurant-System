import { supabase } from "@/shared/api/supabaseClient";

// /shared/libs/auth/handleGoogleUser.ts

export async function handleGoogleUser(googleUser: {
  googleId: string;
  email: string;
  name: string;
  picture: string;
}) {
  // 1️⃣ البحث عن مستخدم موجود بنفس google_id (تأكد من جلب الـ role)
  const { data: googleLinkedUser } = await supabase
    .from("users")
    .select("id, email, name, role, avatar_url") // 👈 حدد الـ role صراحة لضمان وجودها
    .eq("google_id", googleUser.googleId)
    .single();

  if (googleLinkedUser) {
    console.log("🔗 User found by Google ID with role:", googleLinkedUser.role);
    return googleLinkedUser;
  }

  // 2️⃣ البحث بالمستخدم بنفس email
  const { data: emailUser } = await supabase
    .from("users")
    .select("id, email, name, role") // 👈 تأكد من جلب الـ role هنا أيضاً
    .eq("email", googleUser.email)
    .single();

  // 3️⃣ إذا موجود بالايميل -> اربط google_id وحافظ على الـ role القديمة
  if (emailUser) {
    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update({
        google_id: googleUser.googleId,
        avatar_url: googleUser.picture,
        provider: "google",
      })
      .eq("id", emailUser.id)
      .select("id, email, name, role") // 👈 استرجع الـ role المحدثة
      .single();

    if (updateError) throw updateError;
    return updatedUser;
  }

  // 4️⃣ مستخدم جديد كلياً
  console.log("🆕 Creating new Google user with default role: customer");
  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert({
      email: googleUser.email,
      name: googleUser.name,
      avatar_url: googleUser.picture,
      google_id: googleUser.googleId,
      provider: "google",
      role: "customer", // 👈 الـ Role الافتراضية للجدد
      password: null,
    })
    .select("id, email, name, role") // 👈 استرجع الـ role
    .single();

  if (insertError) throw insertError;
  return newUser;
}
