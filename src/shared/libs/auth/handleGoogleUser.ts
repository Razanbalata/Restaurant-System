import { supabase } from "@/shared/api/supabaseClient";

// /shared/libs/auth/handleGoogleUser.ts

export async function handleGoogleUser(googleUser: {
  googleId: string;
  email: string;
  name: string;
  picture: string;
}) {
  const { data: googleLinkedUser } = await supabase
    .from("users")
    .select("id, email, name, role, avatar_url")
    .eq("google_id", googleUser.googleId)
    .single();

  if (googleLinkedUser) {
    console.log("🔗 User found by Google ID with role:", googleLinkedUser.role);
    return googleLinkedUser;
  }

  const { data: emailUser } = await supabase
    .from("users")
    .select("id, email, name, role") 
    .eq("email", googleUser.email)
    .single();

  if (emailUser) {
    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update({
        google_id: googleUser.googleId,
        avatar_url: googleUser.picture,
        provider: "google",
      })
      .eq("id", emailUser.id)
      .select("id, email, name, role")
      .single();

    if (updateError) throw updateError;
    return updatedUser;
  }

  console.log("🆕 Creating new Google user with default role: customer");
  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert({
      email: googleUser.email,
      name: googleUser.name,
      avatar_url: googleUser.picture,
      google_id: googleUser.googleId,
      provider: "google",
      role: "customer",
      password: null,
    })
    .select("id, email, name, role")
    .single();

  if (insertError) throw insertError;
  return newUser;
}
