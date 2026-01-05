import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "الاسم قصير جدًا"),
  email: z.string().email("إيميل غير صالح"),
  password: z
    .string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
