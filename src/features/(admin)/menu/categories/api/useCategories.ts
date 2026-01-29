// features/(admin)/menu/api/useCategories.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useCategories = (restaurantId: string) => {
  const queryClient = useQueryClient();

  // 1️⃣ Fetch all categories with items
  const useAdminCategories = useQuery({
    queryKey: ["categories", restaurantId],
    queryFn: async () => {
      const res = await fetch(
        `/api/admin/menu/categories?restaurantId=${restaurantId}`,
      );
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
    enabled: !!restaurantId,
  });

  // 2️⃣ Add category
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
          throw new Error(err?.error || "Failed to add category");
        }
        return res.json();
      },
      onSuccess: () => {
        toast.success("Category added successfully!");
        queryClient.invalidateQueries({
          queryKey: ["categories", restaurantId],
        });
      },
      onError(error: Error) {
        toast.error("An error occurred while updating the category", {
          description: error.message, // Show details below title
        });
      },
    });

  // 3️⃣ Update category
  const useUpdateCategory = () =>
    useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
        const res = await fetch(`/api/admin/menu/categories/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        if (!res.ok) throw new Error("Failed to update category");
        return res.json();
      },
      onSuccess: () => {
        toast.success("Category added successfully!");
        queryClient.invalidateQueries({
          queryKey: ["categories", restaurantId],
        });
      },
      onError(error: Error) {
        toast.error("An error occurred while updating the category", {
          description: error.message, // Show details below title
        });
      },
    });

  // 4️⃣ Delete category (Soft Delete)
  const useDeleteCategory = () =>
    useMutation({
      mutationFn: async (id: string) => {
        const res = await fetch(`/api/admin/menu/categories/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete category");
        return res.json();
      },
      onSuccess: () => {
        toast.success("Category deleted successfully!");
        queryClient.invalidateQueries({
          queryKey: ["categories", restaurantId],
        });
      },
      onError(error: Error) {
        toast.error("An error occurred while updating the category", {
          description: error.message, // Show details below title
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
