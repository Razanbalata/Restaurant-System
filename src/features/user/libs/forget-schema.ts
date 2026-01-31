import { z } from "zod"

// Forgot Password validation schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    
})
