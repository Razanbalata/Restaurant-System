import { useQuery } from "@tanstack/react-query";

export const useRestaurantById = (restaurantId: string) => {
  return useQuery({
    queryKey: ["admin-restaurant", restaurantId], // ✅ key صحيح
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

      const data = await res.json(); // ✅ await هنا

      return data; // ✅ ترجع الداتا
    },
    enabled: !!restaurantId, // ✅
  });
};
