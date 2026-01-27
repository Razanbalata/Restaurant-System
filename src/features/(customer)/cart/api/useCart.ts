

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

