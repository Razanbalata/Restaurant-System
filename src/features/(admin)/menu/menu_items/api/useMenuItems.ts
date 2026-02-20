import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Payload } from "../../generate-menu/libs/types";
import { queryKeys } from "@/shared/keys/query-keys";

export const useMenuItems = (categoryId: string) => {
  const queryClient = useQueryClient();

  const useAdminMenuItems = useQuery({
    queryKey: queryKeys.menu.menuItems(String(categoryId)),
    queryFn: async () => {
      const res = await fetch(`/api/admin/menu/menu_items?categoryId=${categoryId}`);
      if (!res.ok) throw new Error("Failed to fetch menu items");
      return res.json();
    },
    enabled: !!categoryId,
  });

const updateCache = (apiResponse: any, restaurantId: string, action: "add" | "update" | "delete", catId?: string) => {
  const rawItems = apiResponse?.added ? apiResponse.added : Array.isArray(apiResponse) ? apiResponse : [apiResponse];
  
  const allTabKey = queryKeys.customer.menu(restaurantId);
  const categoryTabKey = queryKeys.menu.menuItems(String(catId || rawItems[0]?.category_id || categoryId));

  queryClient.setQueryData(categoryTabKey, (old: any) => {
    const current = Array.isArray(old) ? [...old] : [];
    if (action === "add") return [...current, ...rawItems];
    if (action === "update") return current.map(i => String(i.id) === String(rawItems[0].id) ? {...i, ...rawItems[0]} : i);
    if (action === "delete") return current.filter(i => String(i.id) !== String(rawItems[0]?.id || apiResponse));
    return current;
  });

  queryClient.setQueryData(allTabKey, (old: any) => {
    const current = Array.isArray(old) ? [...old] : [];
    
    if (action === "add") {
      const mappedItems = rawItems.map((item:any) => ({
        ...item,
        category_id: item.category_id || catId,
      }));
      return [...current, ...mappedItems];
    }

    if (action === "update") {
      return current.map(i => String(i.id) === String(rawItems[0].id) ? {...i, ...rawItems[0]} : i);
    }

    if (action === "delete") {
      const idToDelete = rawItems[0]?.id || apiResponse; 
      return current.filter(i => String(i.id) !== String(idToDelete));
    }
    
    return current;
  });

  queryClient.invalidateQueries({ queryKey: allTabKey, refetchType: 'none' });
  queryClient.invalidateQueries({ queryKey: categoryTabKey, refetchType: 'none' });
};

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
        console.log("✅ Add Success! Returned from API:", newItems, variables);
        updateCache(newItems, variables.restaurantId, "add", variables.categoryId);
        toast.success("✅ Item added successfully!");
      },
      onError: (error: any) => {
        console.log(error);
        toast.error("❌ Add Failed", {
          description: error.message || "Something went wrong while adding the item.",
        });
      },
    });

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
      onError: (error: any) => {
        toast.error("❌ Update Failed", {
          description: error.message || "Could not save changes to the item.",
        });
      },
    });

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
      onError: (error: any) => {
        toast.error("❌ Delete Failed", {
          description: error.message || "The item could not be removed.",
        });
      },
    });

  return { useAdminMenuItems, useAddMenuItem, useUpdateMenuItem, useDeleteMenuItem };
};
