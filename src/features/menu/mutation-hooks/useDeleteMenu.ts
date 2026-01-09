import { queryKeys } from "@/shared/keys/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteMenuItem(restaurantId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/restaurants/${restaurantId}/menu/${id}`, { method: "DELETE" });
    },
    
    onSuccess: () => {
      console.log("✅ Menu item deleted successfully");
      qc.invalidateQueries({ queryKey: queryKeys.restaurants.details(restaurantId) });
    },
  });
}
