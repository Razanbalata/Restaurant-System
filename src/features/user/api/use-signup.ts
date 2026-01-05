import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../shared/keys/query-keys";
import { SignupPayload } from "../model/type";


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
        throw new Error("فشل إنشاء الحساب");
      }

      return res.json();
    },

    onSuccess: (data) => {
      // 1️⃣ تعيين المستخدم في الكاش
      queryClient.setQueryData(queryKeys.user.me(), data.user);
      // 2️⃣ إعادة تحميل أي كويريز مرتبطة بالمستخدم
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
  });
};
