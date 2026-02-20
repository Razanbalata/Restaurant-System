import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { supabase } from "@/shared/api/supabaseClient";


export const getUserServer = async () => {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session");
        
        
        if (!sessionCookie?.value) {
            return null;
        }

        const payload = await verifyToken(sessionCookie.value);
        
        if (!payload) {
            return null;
        }

        const { data: user, error: dbError } = await supabase
            .from("users")
            .select("id, email, name, created_at,role")
            .eq("id", payload.userId)
            .single();
        if (dbError || !user) {
            console.error("❌ Failed to fetch user from DB:", dbError);
            return null;
        }

        
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.created_at,
                role:user.role
            },
        };
    } catch (error) {
        console.error("❌ Failed to fetch user data on server:", error);
        return null;
    }
}