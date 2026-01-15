// features/cart/model/use-cart-logic.ts
import { useCart } from "@/features/cart/api/useCart";
import { useUpdateCart } from "@/features/cart/api/useUpdateCart";
import { useDeleteCartItem } from "@/features/cart/api/useDeleteCartItem";

export const useCartLogic = (userId: string) => {
  const cartQuery = useCart(userId);
  const update = useUpdateCart();
  const remove = useDeleteCartItem();

  const total =
    cartQuery.data?.reduce(
      (sum, item) =>
        sum + Number(item.quantity) * Number(item.price_at_time),
      0
    ) ?? 0;

  return {
    cart: cartQuery.data ?? [],
    isLoading: cartQuery.isLoading,
    update,
    remove,
    total,
  };
};
