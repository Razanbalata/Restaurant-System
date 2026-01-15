// hooks/useOrders.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface OrderItem {
  menu_id: string;
  quantity: number;
}

export interface Order {
  id: string;
  customer_id: string;
  restaurant_id: string;
  items: OrderItem[];
  total_price: number;
  status: "pending" | "accepted" | "preparing" | "delivered" | "cancelled";
  created_at: string;
  updated_at: string;
}

export const useOrders = (restaurantId?: string, customerId?: string) => {
  const queryClient = useQueryClient();

  // ✅ 1. GET الطلبات
  // إذا restaurantId موجود → جلب الطلبات الخاصة بالمطعم
  // إذا customerId موجود → جلب الطلبات الخاصة بالزبون
  const ordersQuery = useQuery({
    queryKey: ["orders", restaurantId ?? customerId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (restaurantId) params.append("restaurantId", restaurantId);
      if (customerId) params.append("customerId", customerId);

      const res = await fetch(`/api/orders?${params.toString()}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "فشل جلب الطلبات");
      }
      return res.json() as Promise<Order[]>;
    },
    staleTime: 1000 * 30, // 30 ثانية قبل refetch
    refetchOnWindowFocus: true,
  });

  // ✅ 2. POST إنشاء طلب جديد
  const createOrder = useMutation({
    mutationFn: async (newOrder: Partial<Order>) => {
      const res = await fetch(`/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "فشل إنشاء الطلب");
      }
      return res.json() as Promise<Order>;
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey:["orders", customerId]}),
  });

  // ✅ 3. PATCH تحديث حالة الطلب
  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Order["status"] }) => {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "فشل تحديث حالة الطلب");
      }
      return res.json() as Promise<Order>;
    },
    onSuccess: () => {
      if (restaurantId) queryClient.invalidateQueries({ queryKey: ["orders", restaurantId] });
      if (customerId) queryClient.invalidateQueries({ queryKey: ["orders", customerId] });
    },
  });

  // ✅ 4. DELETE حذف الطلب / Soft Delete
  const deleteOrder = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "فشل حذف الطلب");
      }
      return res.json() as Promise<Order>;
    },
    onSuccess: () => {
      if (restaurantId) queryClient.invalidateQueries({ queryKey: ["orders", restaurantId] });
      if (customerId) queryClient.invalidateQueries({ queryKey: ["orders", customerId] });
    },
  });

  return { ordersQuery, createOrder, updateOrderStatus, deleteOrder };
};
