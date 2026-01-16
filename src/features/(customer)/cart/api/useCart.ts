// import { useQuery } from "@tanstack/react-query";
// import { queryKeys } from "@/shared/keys/query-keys"; 

// export const useCart = (userId: string) => {
//   console.log("userId in useCart:", userId);
//   return useQuery({
//     queryKey: queryKeys.cart.all,
//     queryFn: async () => {
//       const res = await fetch(`/api/cart?userId=${userId}`);
//       if (!res.ok) throw new Error("فشل جلب السلة");
//       return res.json();
//     },
//     enabled: !!userId,
//   });
// };


import { useCartStore } from "../model/useCartStore"; 

export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const restaurantId = useCartStore((state) => state.restaurantId);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQty = useCartStore((state) => state.updateQty);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice());

  return {
    items,
    restaurantId,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    totalPrice,
  };
};

