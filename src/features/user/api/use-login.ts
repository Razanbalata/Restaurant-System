import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../shared/keys/query-keys";
import { LoginPayload } from "../model/type";
import {toast} from "sonner"

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // --- هاد الجزء هو السر ---
      const result = await res.json();

      if (!res.ok) {
        // إذا كان الـ status code مش 200-299 ارمي خطأ يدوياً
        throw new Error(result.message || "Email or password incorrect");
      }

      return result; // إذا الأمور تمام، بيرجع البيانات للـ onSuccess
    },

    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.me(), data.user);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.users()});
      toast.success("Login successful!");
    },
    
    onError: (error: any) => {
      // الآن هاد الجزء سيتم استدعاؤه فقط عند الخطأ الحقيقي
      toast.error(error.message || "An error occurred");
    },
  });
};
