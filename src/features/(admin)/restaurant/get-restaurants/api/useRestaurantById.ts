import { queryKeys } from "@/shared/keys/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useRestaurantById = (restaurantId?: string) => {
  return useQuery({
    queryKey: queryKeys.owner.restaurant(restaurantId), 
    queryFn: async () => {
      const res = await fetch(
        `/api/admin/restaurants/${restaurantId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch restaurant");
      }

      const data = await res.json(); 

      return data; 
    },
    enabled: !!restaurantId, 
  });
};
