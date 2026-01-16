import { useQuery } from "@tanstack/react-query";

export const useRestaurantById = (restaurantId:string) =>{
  return useQuery ({
    queryKey:["admin-restaurants"],
    queryFn: async () => {
        const res = await fetch(`/api/admin/restaurants/${restaurantId}`,
            {
            method: "GET",
            headers: {
          "Content-Type": "application/json",
        },
        }
        )
        if (!res.ok) {
        throw new Error("Failed to fetch restaurant");
      }
      return res.json();

    },
    enabled: !!restaurantId,
}) 
}

