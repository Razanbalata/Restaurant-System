import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner"; // تأكد من تثبيتها عبر npm install sonner

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

      // 1️⃣ إضافة صنف للسلة
      addItem: (item, restaurantId) => {
        const state = get();

        // 🧠 إذا حاول الزبون يطلب من مطعم ثاني، بننبهه وبنصفر السلة
        if (state.restaurantId && state.restaurantId !== restaurantId) {
          set({ items: [], restaurantId });
          toast.warning("تم مسح السلة القديمة وبدء طلب من مطعم جديد");
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
          toast.info(`تم زيادة كمية ${item.name}`);
        } else {
          set({
            items: [...state.items, { ...item, quantity: 1 }],
            restaurantId,
          });
          toast.success(`تم إضافة ${item.name} للسلة`);
        }
      },

      // 2️⃣ حذف صنف واحد
      removeItem: (menuItemId) => {
        const itemToDelete = get().items.find(i => i.menuItemId === menuItemId);
        set({
          items: get().items.filter((i) => i.menuItemId !== menuItemId),
        });
        
        if (itemToDelete) {
          toast.error(`تم حذف ${itemToDelete.name}`);
        }
      },

      // 3️⃣ تحديث الكمية (سواء زيادة أو نقصان)
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

      // 4️⃣ تفريغ السلة بالكامل
      clearCart: () => {
        if (get().items.length === 0) return;
        
        set({ items: [], restaurantId: null });
        toast.success("تم إفراغ السلة");
      },

      // 5️⃣ حساب المجموع النهائي
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { 
      name: "cart-storage", // التخزين في الـ LocalStorage
    },
  ),
);