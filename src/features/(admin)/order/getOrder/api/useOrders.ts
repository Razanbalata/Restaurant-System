// hooks/useOrders.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useOrders = (restaurantId?: string) => {
  const queryClient = useQueryClient();

  const useOrders = useQuery({
    queryKey: ["orders", restaurantId],
    queryFn: async () => {
      const res = await fetch(`/api/orders?restaurantId=${restaurantId}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
  });

  // ✅ 3. PATCH تحديث حالة الطلب
  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "فشل تحديث حالة الطلب");
      }
      return res.json();
    },
    onSuccess: () => {
      if (restaurantId)
        queryClient.invalidateQueries({ queryKey: ["orders", restaurantId] });
    },
  });


  return { useOrders, updateOrderStatus };
};
