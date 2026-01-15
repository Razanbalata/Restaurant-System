// hooks/useMenu.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface MenuItem {
  id: string;
  restaurant_id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  is_available: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export const useMenu = (restaurantId: string) => {
  const queryClient = useQueryClient();

  // ✅ 1. GET الأصناف مع فلترة اختيارية
  const menuQuery = useQuery({
    queryKey: ["menu", restaurantId],
    queryFn: async () => {
      const res = await fetch(`/api/menu?restaurantId=${restaurantId}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "فشل جلب المنيو");
      }
      return res.json() as Promise<MenuItem[]>;
    },
    staleTime: 1000 * 60, // دقيقة واحدة قبل refetch
    refetchOnWindowFocus: false,
  });

  // ✅ 2. POST إضافة صنف جديد
  const createMenuItem = useMutation({
    mutationFn: async (newItem: Partial<MenuItem>) => {
      const res = await fetch(`/api/menu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newItem, restaurant_id: restaurantId }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "فشل إضافة الصنف");
      }
      return res.json() as Promise<MenuItem>;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["menu", restaurantId] }),
  });

  // ✅ 3. PATCH تعديل صنف
  const updateMenuItem = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<MenuItem>;
    }) => {
      const res = await fetch(`/api/menu/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "فشل تعديل الصنف");
      }
      return res.json() as Promise<MenuItem>;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["menu", restaurantId] }),
  });

  // ✅ 4. DELETE حذف صنف (Soft Delete)
  const deleteMenuItem = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/menu?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "فشل تعطيل الصنف");
      }
      return res.json();
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["menu", restaurantId] }),
  });

  return { menuQuery, createMenuItem, updateMenuItem, deleteMenuItem };
};
