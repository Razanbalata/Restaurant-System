// import { supabase } from "@/shared/api/supabaseClient"; 
// import { NextRequest, NextResponse } from "next/server";
// import { hashPassword, validatePasswordStrength } from "@/shared/libs/auth/password-hash";
// import { createToken } from "@/shared/libs/auth/jwt";
// import { createResponseWithSession } from "@/shared/libs/auth/cookies";

// export const POST = async (req: NextRequest) => {
//   try {
//     // 1️⃣ Receive data
//     const { email, name,phone, password, role } = await req.json();

//     // 2️⃣ Verify required data exists
//     if (!email || !password || !role || !phone) {
//       return NextResponse.json({ error: "Email, password, Phone and role are required" }, { status: 400 });
//     }

//     // 3️⃣ Verify email validity
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
//     }

//     // 4️⃣ Verify password strength
//     const passwordValidation = validatePasswordStrength(password);
//     if (!passwordValidation.isValid) {
//       return NextResponse.json(
//         { error: "Weak password", details: passwordValidation.errors },
//         { status: 400 }
//       );
//     }

//     // 5️⃣ Verify user doesn't already exist
//     const { data: existingUser } = await supabase
//       .from("users")
//       .select("id")
//       .eq("email", email)
//       .single();

//     if (existingUser) {
//       return NextResponse.json({ error: "Email is already in use" }, { status: 409 });
//     }

//     // 6️⃣ Hash password
//     const hashedPassword = await hashPassword(password);

//     // 7️⃣ Create user and save role
//     const { data: user, error: dbError } = await supabase
//       .from("users")
//       .insert({
//         email,
//         name: name || email.split("@")[0],
//         phone:phone,
//         password: hashedPassword,
//         role, // 👈 Save role directly here
//         created_at: new Date().toISOString(),
//       })
//       .select("id, email, name, role, created_at")
//       .single();

//     if (dbError || !user) {
//       return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
//     }

//     // 8️⃣ Create JWT Token
//     const token = await createToken({
//       userId: user.id,
//       email: user.email,
//       name: user.name,
//       role: user.role, // 👈 Add role to token
//     });

//     // 9️⃣ Return response with secure Cookie
//     return createResponseWithSession(
//       {
//         message: "Account created successfully",
//         user: {
//           id: user.id,
//           email: user.email,
//           phone:user.phone,
//           name: user.name,
//           role: user.role, // 👈 Return the role
//           createdAt: user.created_at,
//         },
//       },
//       token,
//       201
//     );
//   } catch (error) {
//     console.error("Register error:", error);
//     return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 });
//   }
// };
import { supabase } from "@/shared/api/supabaseClient"; 
import { NextRequest, NextResponse } from "next/server";
import { hashPassword, validatePasswordStrength } from "@/shared/libs/auth/password-hash";
import { createToken } from "@/shared/libs/auth/jwt";
import { createResponseWithSession } from "@/shared/libs/auth/cookies";

export const POST = async (req: NextRequest) => {
  try {
    const { email, name, phone, password, role } = await req.json();

    console.log("➡️ Register Payload:", { email, name, phone, role });

    if (!email || !password || !role || !phone) {
      return NextResponse.json({ error: "Email, password, phone and role are required" }, { status: 400 });
    }

    // Phone validation
    const phoneRegex = /^[0-9+]{9,15}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Password validation
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json({ error: "Weak password", details: passwordValidation.errors }, { status: 400 });
    }

    // Check existing user
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: "Email is already in use" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);
    console.log("🔒 Hashed password:", hashedPassword);

    // Create user
    const { data: user, error: dbError } = await supabase
      .from("users")
      .insert({
        email,
        name: name || email.split("@")[0],
        phone,
        password: hashedPassword,
        role,
        created_at: new Date().toISOString(),
      })
      .select("id, email, name, role, phone, created_at")
      .single();

    if (dbError || !user) {
      console.error("🚨 Supabase Error:", dbError);
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }

    console.log("✅ Created User:", user);

    // Create JWT
    const token = await createToken({ userId: user.id, email: user.email, name: user.name, role: user.role });
    console.log("🔑 JWT Token:", token);

    return createResponseWithSession(
      {
        message: "Account created successfully",
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
          name: user.name,
          role: user.role,
          createdAt: user.created_at,
        },
      },
      token,
      user.role,
      201
    );
  } catch (error) {
    console.error("🔥 Register Error:", error);
    return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 });
  }
};
