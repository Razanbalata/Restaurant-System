import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../shared/keys/query-keys";
import { toast } from "sonner";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", { method: "POST" });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.user.me(), null); // Remove user from React Query cache
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all }); // Reload any related data
     toast.success("Logout successful!")
    },
    onError:(error)=>{
      toast.error("An error occurred during logout", {
        description: error.message, // عرض التفاصيل تحت العنوان
      }
      )
    }
  });
};
