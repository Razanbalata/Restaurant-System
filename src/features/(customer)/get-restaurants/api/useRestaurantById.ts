import { useQuery } from "@tanstack/react-query";

// 1. هوك جلب تفاصيل المطعم
export const useRestaurant = (id: string) => {
 return useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const response = await fetch(`/api/customer/restaurants/${id}`,
        {
            method: "GET",
            headers: {
          "Content-Type": "application/json",
        },
        }
      ); // ينادي ملف route.ts الذي كتبناه فوق
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant");
      }
      return response.json();
    },
    enabled: !!id,
  });
};

