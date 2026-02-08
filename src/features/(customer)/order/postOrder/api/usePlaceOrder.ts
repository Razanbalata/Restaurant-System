import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";
import { useCart } from "@/features/(customer)/cart/api/useCart";
import { toast } from "sonner";

export const usePlaceOrder = () => {
  const cart = useCart();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderBody: any) => {
      const normalizedRestaurantId = Number(orderBody.restaurantId);
      console.log("6️⃣ normalizedRestaurantId:", normalizedRestaurantId);

      if (Number.isNaN(normalizedRestaurantId)) {
        console.error("❌ restaurantId is NaN after normalization");
        throw new Error("Invalid restaurant ID");
      }

      const res = await fetch("/api/customer/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderBody,
          restaurantId: normalizedRestaurantId,
        }),
      });
      let data;
      try {
        data = await res.json();
        console.log("9️⃣ Response JSON:", data);
      } catch (e) {
        console.error("❌ Failed to parse response JSON");
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        console.error("❌ Server returned error:", data);
        throw new Error(data?.message || "Failed to create order");
      }

      console.log("✅ Order created successfully");
      console.groupEnd();

      return data;
    },

    onSuccess: (data) => {
      console.log("🎉 onSuccess data:", data);

      cart.clearCart();

      queryClient.invalidateQueries({
        queryKey: queryKeys.customer.orders(data.user_id),
      });

      toast.success("Order sent and cart cleared successfully 🍽️");
    },

    onError: (error: Error) => {
      console.error("🔥 PLACE ORDER ERROR:", error);
      toast.error(error.message);
    },
  });
};
