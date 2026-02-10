import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Payload } from "../../generate-menu/libs/types";
import { queryKeys } from "@/shared/keys/query-keys";

export const useMenuItems = (categoryId: string) => {
  const queryClient = useQueryClient();

  // 1️⃣ Fetch عناصر المنيو لتصنيف محدد
  const useAdminMenuItems = useQuery({
    queryKey: queryKeys.menu.menuItems(String(categoryId)),
    queryFn: async () => {
      const res = await fetch(`/api/admin/menu/menu_items?categoryId=${categoryId}`);
      if (!res.ok) throw new Error("Failed to fetch menu items");
      return res.json();
    },
    enabled: !!categoryId,
  });

  // دالة مساعدة موحدة لتحديث الكاش لأي عملية
  const updateCache = (
    updatedItem: any,
    restaurantId: string,
    action: "add" | "update" | "delete",
    catId?: string
  ) => {
    const keys = [
      queryKeys.customer.menu(restaurantId), // كل العناصر
      queryKeys.menu.menuItems(catId || updatedItem?.category_id || categoryId), // التصنيف
    ];

    keys.forEach((key) => {
      queryClient.setQueryData(key, (oldData: any) => {
        if (!oldData || !Array.isArray(oldData)) {
          if (action === "add") return Array.isArray(updatedItem) ? updatedItem : [updatedItem];
          return [];
        }

        if (action === "update") {
          return oldData.map((item: any) =>
            String(item.id) === String(updatedItem.id) ? { ...item, ...updatedItem } : item
          );
        }

        if (action === "add") {
          const newItems = Array.isArray(updatedItem) ? updatedItem : [updatedItem];
          return [...newItems, ...oldData];
        }

        if (action === "delete") {
          const idToRemove = updatedItem.id || updatedItem;
          return oldData.filter((item: any) => String(item.id) !== String(idToRemove));
        }

        return oldData;
      });

      queryClient.invalidateQueries({ queryKey: key });
    });
  };

  // 2️⃣ Add عنصر
  const useAddMenuItem = () =>
    useMutation({
      mutationFn: async ({ restaurantId, categoryId, meals }: Payload) => {
        const res = await fetch("/api/admin/menu/menu_items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ restaurantId, categoryId, items: Array.isArray(meals) ? meals : [meals] }),
        });
        if (!res.ok) throw new Error("Save failed");
        return res.json();
      },
      onSuccess: (newItems, variables) => {
        updateCache(newItems, variables.restaurantId, "add", variables.categoryId);
        toast.success("✅ Item added successfully!");
      },
    });

  // 3️⃣ Update عنصر
  const useUpdateMenuItem = () =>
    useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
        const res = await fetch(`/api/admin/menu/menu_items/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ updates }),
        });
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      },
      onSuccess: (updatedItem, variables) => {
        updateCache(updatedItem, variables.updates.restaurant_id, "update");
        toast.success("✅ Item updated successfully!");
      },
    });

  // 4️⃣ Delete عنصر
  const useDeleteMenuItem = () =>
    useMutation({
      mutationFn: async ({ id }: { id: string; restaurantId: string; catId: string }) => {
        const res = await fetch(`/api/admin/menu/menu_items/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Delete failed");
        return id;
      },
      onSuccess: (deletedId, variables) => {
        updateCache(variables.id, variables.restaurantId, "delete", variables.catId);
        toast.success("✅ Item deleted successfully!");
      },
    });

  return { useAdminMenuItems, useAddMenuItem, useUpdateMenuItem, useDeleteMenuItem };
};
