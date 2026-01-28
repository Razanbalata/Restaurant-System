// features/(admin)/menu/api/useCategories.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useCategories = (restaurantId: string) => {
  const queryClient = useQueryClient();

  // 1️⃣ جلب كل التصنيفات مع الأصناف
  const useAdminCategories = useQuery({
    queryKey: ["categories", restaurantId],
    queryFn: async () => {
      const res = await fetch(
        `/api/admin/menu/categories?restaurantId=${restaurantId}`,
      );
      if (!res.ok) throw new Error("فشل جلب التصنيفات");
      return res.json();
    },
    enabled: !!restaurantId,
  });

  // 2️⃣ إضافة تصنيف
  const useAddCategory = () =>
    useMutation({
      mutationFn: async (newCategory: { name: string }) => {
        const res = await fetch("/api/admin/menu/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newCategory, restaurant_id: restaurantId }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err?.error || "فشل إضافة التصنيف");
        }
        return res.json();
      },
      onSuccess: () => {
        toast.success("تم اضافة التصنيف بنجاح!");
        queryClient.invalidateQueries({
          queryKey: ["categories", restaurantId],
        });
      },
      onError(error: Error) {
        toast.error("حدث خطأ أثناء تعديل التصنيف", {
          description: error.message, // عرض التفاصيل تحت العنوان
        });
      },
    });

  // 3️⃣ تعديل تصنيف
  const useUpdateCategory = () =>
    useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
        const res = await fetch(`/api/admin/menu/categories/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        if (!res.ok) throw new Error("فشل تعديل التصنيف");
        return res.json();
      },
      onSuccess: () => {
        toast.success("تم اضافة التصنيف بنجاح!");
        queryClient.invalidateQueries({
          queryKey: ["categories", restaurantId],
        });
      },
      onError(error: Error) {
        toast.error("حدث خطأ أثناء تعديل التصنيف", {
          description: error.message, // عرض التفاصيل تحت العنوان
        });
      },
    });

  // 4️⃣ حذف تصنيف (Soft Delete)
  const useDeleteCategory = () =>
    useMutation({
      mutationFn: async (id: string) => {
        const res = await fetch(`/api/admin/menu/categories/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("فشل حذف التصنيف");
        return res.json();
      },
      onSuccess: () => {
        toast.success("تم حذف التصنيف بنجاح!");
        queryClient.invalidateQueries({
          queryKey: ["categories", restaurantId],
        });
      },
      onError(error: Error) {
        toast.error("حدث خطأ أثناء تعديل التصنيف", {
          description: error.message, // عرض التفاصيل تحت العنوان
        });
      },
    });

  return {
    useAdminCategories,
    useAddCategory,
    useUpdateCategory,
    useDeleteCategory,
  };
};
