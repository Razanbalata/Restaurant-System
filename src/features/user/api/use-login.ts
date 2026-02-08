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

      return res.json();
    },

    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.me(), data.user);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.users()});
      toast.success("Login successful!")
    },
    onError(error) {
      toast.error("An error occurred during login", {
        description: "Please check your credentials and try again.",
      }
      )
    },
  });
};
