import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";
import { useCart } from "@/features/(customer)/cart/api/useCart";
import { toast } from "sonner";

export const usePlaceOrder = () => {
  const cart = useCart();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderBody: any) => {
      console.group("🧾 PLACE ORDER DEBUG");

      console.log("1️⃣ Raw orderBody:", orderBody);
      console.log("2️⃣ restaurantId:", orderBody?.restaurantId);
      console.log("3️⃣ restaurantId type:", typeof orderBody?.restaurantId);
      console.log("4️⃣ items:", orderBody?.items);
      console.log("5️⃣ items length:", orderBody?.items?.length);

      if (!orderBody) {
        console.error("❌ orderBody is undefined or null");
        throw new Error("Order body is missing");
      }

      if (!orderBody.items || orderBody.items.length === 0) {
        console.error("❌ Cart items are empty");
        throw new Error("Cart is empty");
      }

      if (
        orderBody.restaurantId === null ||
        orderBody.restaurantId === undefined
      ) {
        console.error("❌ restaurantId is missing");
        throw new Error("Restaurant ID is missing");
      }

      const normalizedRestaurantId = Number(orderBody.restaurantId);
      console.log("6️⃣ normalizedRestaurantId:", normalizedRestaurantId);

      if (Number.isNaN(normalizedRestaurantId)) {
        console.error("❌ restaurantId is NaN after normalization");
        throw new Error("Invalid restaurant ID");
      }

      console.log("7️⃣ Sending request to API...");

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

      console.log("8️⃣ Response status:", res.status);

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
        queryKey: queryKeys.orders.all,
      });

      toast.success("Order sent and cart cleared successfully 🍽️");
    },

    onError: (error: Error) => {
      console.error("🔥 PLACE ORDER ERROR:", error);
      toast.error(error.message);
    },
  });
};
