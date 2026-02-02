// features/(admin)/menu/api/useMenuItems.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Payload } from "../../generate-menu/libs/types";


export const useMenuItems = (categoryId: string) => {
  const queryClient = useQueryClient();
  // 1️⃣ Fetch menu items
  const useAdminMenuItems = useQuery({
    queryKey: ["menu_items", categoryId],
    queryFn: async () => {
      const res = await fetch(
        `/api/admin/menu/menu_items?categoryId=${categoryId}`,
      );
      if (!res.ok) throw new Error("Failed to fetch menu items");
      return res.json();
    },
    enabled: !!categoryId,
  });

  // 2️⃣ Add menu item
  const useAddMenuItem = () =>

   useMutation({
    mutationFn: async ({ restaurantId, categoryId, meals }: Payload) => {
      // إذا كان عنصر واحد فقط، حوله لمصفوفة
      const itemsToSave = Array.isArray(meals) ? meals : [meals];

      const res = await fetch("/api/admin/menu/menu_items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurantId, categoryId, items: itemsToSave }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save menu");
      }

      return res.json(); // يرجع البيانات المحفوظة
    },
    onSuccess: (_data, variables) => {
      toast.success("✅ Menu saved successfully!");
      // تحديث الكاش
      queryClient.invalidateQueries({
        queryKey: ["menu_items", categoryId],
      });
    },
    onError: (error: any) => {
      toast.error("❌ Failed to save menu", { description: error.message });
    },
  });

  // 3️⃣ Update menu item
  const useUpdateMenuItem = () =>
    useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
        const res = await fetch(`/api/admin/menu/menu_items/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        if (!res.ok) throw new Error("Failed to update menu item");
        return res.json();
      },
      onSuccess: () => {
        toast.success("Menu item updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["menu_items", categoryId] });
      },
     onError(error: Error) {
  toast.error("Error updating category", {
    description: error.message, // Show details below title
  });
}
    });

  // 4️⃣ Delete menu item (Soft Delete)
  const useDeleteMenuItem = () =>
    useMutation({
      mutationFn: async (id: string) => {
        const res = await fetch(`/api/admin/menu/menu_items/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete item");
        return res.json();
      },
      onSuccess: () => {
        toast.success("Item deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["menu_items", categoryId] });
      },
     onError(error: Error) {
  toast.error("An error occurred while deleting the category", {
    description: error.message, // Show details below title
  });
}
    });

  return {
    useAdminMenuItems,
    useAddMenuItem,
    useUpdateMenuItem,
    useDeleteMenuItem,
  };
};
