// hooks/useOrders.ts
import { supabase } from "@/shared/api/supabaseRealTime";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export const useOrders = (restaurantId?: string) => {
  const queryClient = useQueryClient();

  const useOrdersQuery = useQuery({
    queryKey: ["orders", restaurantId],
    queryFn: async () => {
      const res = await fetch(`/api/admin/orders?restaurantId=${restaurantId}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
  });

  // ✅ 3. PATCH update order status
  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Failed to update order status");
      }
      return res.json();
    },
    onSuccess: () => {
      if (restaurantId) toast.success("Order updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["orders", restaurantId] });
    },
    onError(error: Error) {
        toast.error("An error occurred while updating the order", {
          description: error.message, // Show details below title
        });
      },
  });

  return { useOrdersQuery, updateOrderStatus };
};
