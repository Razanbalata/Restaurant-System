import { queryKeys } from "@/shared/keys/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useRestaurant = (id: string) => {
 return useQuery({
    queryKey: queryKeys.customer.restaurant(id),
    queryFn: async () => {
      const response = await fetch(`/api/customer/restaurants/${id}`,
        {
            method: "GET",
            headers: {
          "Content-Type": "application/json",
        },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant");
      }
      return response.json();
    },
    enabled: !!id,
  });
};

