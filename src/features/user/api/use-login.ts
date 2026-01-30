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

      if (!res.ok) {
        throw new Error(res?.error || "Login failed");
      }
      console.log("Login response status:", res.status);

      return res.json();
    },

    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user.me(), data.user);
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
      toast.success("Login successful!")
    },
    onError(error) {
      toast.error("An error occurred during login", {
        description: error.message, // عرض التفاصيل تحت العنوان
      }
      )
    },
  });
};
