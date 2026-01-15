import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys"; 

// useAddToCart.ts
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ menuItemId }: { menuItemId: number }) => {
      const res = await fetch(`/api/cart`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ menuItemId, quantity: 1 }), // بدون userId
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل الإضافة للسلة");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
};

