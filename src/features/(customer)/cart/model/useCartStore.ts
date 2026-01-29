import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner"; // Make sure to install via npm install sonner

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

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      restaurantId: null,
      items: [],

      // 1️⃣ Add item to cart
      addItem: (item, restaurantId) => {
        const state = get();

        // 🧠 If customer tries to order from another restaurant, warn and clear cart
        if (state.restaurantId && state.restaurantId !== restaurantId) {
          set({ items: [], restaurantId });
          toast.warning("Previous cart cleared and new order started from different restaurant");
        }

        const existing = state.items.find(
          (i) => i.menuItemId === item.menuItemId,
        );

        if (existing) {
          set({
            items: state.items.map((i) =>
              i.menuItemId === item.menuItemId
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          });
          toast.info(`Quantity of ${item.name} increased`);
        } else {
          set({
            items: [...state.items, { ...item, quantity: 1 }],
            restaurantId,
          });
          toast.success(`${item.name} added to cart`);
        }
      },

      // 2️⃣ Remove single item
      removeItem: (menuItemId) => {
        const itemToDelete = get().items.find(i => i.menuItemId === menuItemId);
        set({
          items: get().items.filter((i) => i.menuItemId !== menuItemId),
        });
        
        if (itemToDelete) {
          toast.error(`${itemToDelete.name} removed`);
        }
      },

      // 3️⃣ Update quantity (increase or decrease)
      updateQty: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }

        set({
          items: get().items.map((i) =>
            i.menuItemId === menuItemId ? { ...i, quantity } : i,
          ),
        });
      },

      // 4️⃣ Clear entire cart
      clearCart: () => {
        if (get().items.length === 0) return;
        
        set({ items: [], restaurantId: null });
        toast.success("Cart cleared");
      },

      // 5️⃣ Calculate total price
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { 
      name: "cart-storage", // Storage in LocalStorage
    },
  ),
);