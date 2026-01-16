// // features/cart/model/use-cart-logic.ts
// import { useCart } from "@/features/cart/api/useCart";
// import { useUpdateCart } from "@/features/cart/api/useUpdateCart";
// import { useDeleteCartItem } from "@/features/cart/api/useDeleteCartItem";

// export const useCartLogic = (userId: string) => {
//   const cartQuery = useCart(userId);
//   const update = useUpdateCart();
//   const remove = useDeleteCartItem();

//   const total =
//     cartQuery.data?.reduce(
//       (sum, item) =>
//         sum + Number(item.quantity) * Number(item.price_at_time),
//       0
//     ) ?? 0;

//   return {
//     cart: cartQuery.data ?? [],
//     isLoading: cartQuery.isLoading,
//     update,
//     remove,
//     total,
//   };
// };

import { create } from "zustand";

type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
};

type CartStore = {
  restaurantId: number | null;
  items: CartItem[];

  addItem: (item: CartItem, restaurantId: number) => void;
  removeItem: (menuItemId: string) => void;
  updateQty: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;

  totalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  restaurantId: null,
  items: [],

  addItem: (item, restaurantId) => {
    const state = get();

    // 🧠 مطعم مختلف؟ نفرغ الكارت
    if (
      state.restaurantId &&
      state.restaurantId !== restaurantId
    ) {
      set({ items: [], restaurantId });
    }

    const existing = state.items.find(
      (i) => i.menuItemId === item.menuItemId
    );

    if (existing) {
      set({
        items: state.items.map((i) =>
          i.menuItemId === item.menuItemId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      });
    } else {
      set({
        items: [...state.items, { ...item, quantity: 1 }],
        restaurantId,
      });
    }
  },

  removeItem: (menuItemId) =>
    set({
      items: get().items.filter(
        (i) => i.menuItemId !== menuItemId
      ),
    }),

  updateQty: (menuItemId, quantity) =>
    set({
      items: get().items.map((i) =>
        i.menuItemId === menuItemId
          ? { ...i, quantity }
          : i
      ),
    }),

  clearCart: () =>
    set({ items: [], restaurantId: null }),

  totalPrice: () =>
    get().items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    ),
}));

