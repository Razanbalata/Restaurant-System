import { useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";
import { Restaurant } from "../../get-restaurants/libs/types";

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Restaurant,
    Error,
    { id: string; updates: Partial<Restaurant> }
  >({
    mutationFn: async ({ id, updates }) => {
      const res = await fetch(`/api/restaurants/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
        throw new Error("فشل تحديث المطعم");
      }
      const data = await res.json();
      return data.restaurant;
    },
    onSuccess: (restaurant, { updates }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurants.list(updates.city || restaurant.city),
      });
    },
  });
};
