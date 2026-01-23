
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
        throw new Error(err?.error || "فشل إنشاء الحساب");
      }

      return res.json(); // { user: {...}, message: "..." }
    },
    onSuccess: (data) => {
      // نحفظ الـ user في cache
      queryClient.setQueryData(queryKeys.user.me(), data.user);
      toast.success("تم انشاء الحساب بنجاح!")
    },
    onError(error) {
      toast.error("حدث خطأ أثناء انشاء الحساب",error)
    },
  });
};

