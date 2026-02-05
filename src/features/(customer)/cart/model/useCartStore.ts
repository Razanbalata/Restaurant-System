import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

/* =======================
   Types
======================= */
export type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
};

type CartStore = {
  restaurantId: number | null;
  items: CartItem[];

  addItem: (item: Omit<CartItem, "quantity">, restaurantId: number) => void;
  removeItem: (menuItemId: string) => void;
  updateQty: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
};

/* =======================
   Store
======================= */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      restaurantId: null,
      items: [],

      /* ➕ Add item */
      addItem: (item, restaurantId) => {
        const { items, restaurantId: currentRestaurant } = get();

        // ✅ handle restaurant switch (works with 0)
        if (
          currentRestaurant !== null &&
          currentRestaurant !== restaurantId
        ) {
          set({ items: [], restaurantId });
          toast.warning(
            "Previous cart cleared. New restaurant selected 🍽️",
          );
        }

        const existingItem = items.find(
          (i) => i.menuItemId === item.menuItemId,
        );

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.menuItemId === item.menuItemId
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          });
          toast.info(`${item.name} quantity increased`);
          return;
        }

        set({
          items: [...items, { ...item, quantity: 1 }],
          restaurantId,
        });

        toast.success(`${item.name} added to cart`);
      },

      /* ➖ Remove item */
      removeItem: (menuItemId) => {
        const item = get().items.find((i) => i.menuItemId === menuItemId);

        set({
          items: get().items.filter((i) => i.menuItemId !== menuItemId),
        });

        if (item) {
          toast.error(`${item.name} removed`);
        }
      },

      /* 🔄 Update quantity */
      updateQty: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }

        set({
          items: get().items.map((i) =>
            i.menuItemId === menuItemId
              ? { ...i, quantity }
              : i,
          ),
        });
      },

      /* 🗑️ Clear cart */
      clearCart: () => {
        if (get().items.length === 0) return;

        set({ items: [], restaurantId: null });
        toast.success("Cart cleared 🧹");
      },

      /* 💰 Total price */
      totalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
    }),
    {
      name: "cart-storage",
    },
  ),
);
