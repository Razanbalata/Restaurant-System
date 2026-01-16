import { z } from "zod";

export const checkoutSchema = z.object({
  address: z.string().min(5),
  phone: z.string().min(9),
  notes: z.string().optional(),
});
