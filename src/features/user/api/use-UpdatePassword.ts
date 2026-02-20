"use client";
import { queryKeys } from "@/shared/keys/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ oldPassword, newPassword }: UpdatePasswordPayload) => {
      if (!oldPassword || !newPassword) {
        toast.error("Please fill in all fields");
        throw new Error("Missing fields");
      }

      const formData = new FormData();
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);

      const res = await fetch("/api/auth/update-password", {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update password");
        throw new Error(data.error || "Failed to update password");
      }

      toast.success("Password updated successfully!");

      queryClient.invalidateQueries({queryKey:queryKeys.auth.me()});

      return data;
    },
  });

  return mutation; // { mutate, mutateAsync, isLoading, isError, isSuccess }
};
