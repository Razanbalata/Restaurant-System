import { queryKeys } from "@/shared/keys/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddMenuItem(restaurantId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`/api/restaurants/${restaurantId}/menu`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.restaurants.details(restaurantId) });
    },
  });
}
