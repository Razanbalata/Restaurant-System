import { supabase } from "@/shared/api/supabaseClient";

export async function handleGoogleUser(googleUser: {
  googleId: string;
  email: string;
  name: string;
  picture: string;
}) {
  // 1️⃣ البحث عن مستخدم موجود بنفس google_id
  const { data: googleLinkedUser } = await supabase
    .from("users")
    .select("*")
    .eq("google_id", googleUser.googleId)
    .single();

  if (googleLinkedUser) return googleLinkedUser;

  // 2️⃣ البحث بالمستخدم بنفس email
  const { data: emailUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", googleUser.email)
    .single();

  // 3️⃣ إذا موجود → اربط google_id
  if (emailUser) {
    const { data: updatedUser } = await supabase
      .from("users")
      .update({
        google_id: googleUser.googleId,
        avatar_url: googleUser.picture,
        provider: "google",
      })
      .eq("id", emailUser.id)
      .select()
      .single();

    return updatedUser;
  }

  // 4️⃣ مستخدم جديد
  const { data: newUser } = await supabase
    .from("users")
    .insert({
      email: googleUser.email,
      name: googleUser.name,
      avatar_url: googleUser.picture,
      google_id: googleUser.googleId,
      provider: "google",
      role: "customer",
      password: null, // مهم: Google User ما يحتاج password
    })
    .select()
    .single();

  return newUser;
}
