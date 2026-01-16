// features/(admin)/menu/api/useMenuItems.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useMenuItems = (categoryId: string) => {
  const queryClient = useQueryClient();

  // 1️⃣ جلب الأصناف
  const useAdminMenuItems = useQuery({
    queryKey: ["menu_items", categoryId],
    queryFn: async () => {
      const res = await fetch(`/api/admin/menu_items?categoryId=${categoryId}`);
      if (!res.ok) throw new Error("فشل جلب الأصناف");
      return res.json();
    },
  });

  // 2️⃣ إضافة صنف
  const useAddMenuItem = () =>
    useMutation({
      mutationFn: async (newItem: { name: string; price: number; description?: string }) => {
        const res = await fetch("/api/admin/menu_items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newItem, category_id: categoryId }),
        });
        if (!res.ok) throw new Error("فشل إضافة الصنف");
        return res.json();
      },
      onSuccess: () => queryClient.invalidateQueries({queryKey:["menu_items", categoryId]}),
    });

  // 3️⃣ تعديل صنف
  const useUpdateMenuItem = () =>
    useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
        const res = await fetch(`/api/admin/menu_items/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        if (!res.ok) throw new Error("فشل تعديل الصنف");
        return res.json();
      },
      onSuccess: () => queryClient.invalidateQueries({queryKey:["menu_items", categoryId]}),
    });

  // 4️⃣ حذف صنف (Soft Delete)
  const useDeleteMenuItem = () =>
    useMutation({
      mutationFn: async (id: string) => {
        const res = await fetch(`/api/admin/menu_items/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("فشل حذف الصنف");
        return res.json();
      },
      onSuccess: () => queryClient.invalidateQueries({queryKey:["menu_items", categoryId]}),
    });

  return { useAdminMenuItems, useAddMenuItem, useUpdateMenuItem, useDeleteMenuItem };
};
