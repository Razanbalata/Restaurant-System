
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GeneratedMeal } from "../libs/types";
import { toast } from "sonner";
import { queryKeys } from "@/shared/keys/query-keys";

type Payload = {
  restaurantId: string;
  categoryId: string;
  meals: GeneratedMeal[];
};

export const useSaveMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ restaurantId, categoryId, meals }: Payload) => {
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

      return res.json(); 
    },
    onSuccess: (data, variables) => {
      toast.success("✅ Menu saved successfully!");
      queryClient.invalidateQueries({
        queryKey: queryKeys.menu.menuItems(String(data.categoryId)),
      });
    },
    onError: (error: any) => {
      toast.error("❌ Failed to save menu", { description: error.message });
    },
  });

}