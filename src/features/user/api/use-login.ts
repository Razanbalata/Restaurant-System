import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../shared/keys/query-keys";
import { LoginPayload } from "../model/type";


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
        throw new Error("فشل تسجيل الدخول");
      }

      return res.json();
    },

    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user.me(), data.user);
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
  });
};
