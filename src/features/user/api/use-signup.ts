
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";
import { SignupPayload } from "../model/type";
import { toast } from "sonner";

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignupPayload) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Account creation failed");
      }

      return res.json(); // { user: {...}, message: "..." }
    },
    onSuccess: (data) => {
      // Save user in cache
      queryClient.setQueryData(queryKeys.user.me(), data.user);
      toast.success("Account created successfully!")
    },
    onError(error) {
      toast.error("An error occurred during account creation", {
        description: error.message, // عرض التفاصيل تحت العنوان   
      }
      )
    },
  });
};

