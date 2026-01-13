import { useQuery } from "@tanstack/react-query";

// 1. هوك جلب تفاصيل المطعم
export const useRestaurant = (id: string) => {
 return useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const response = await fetch(`/api/restaurants/${id}`,
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

// 2. هوك جلب منيو المطعم
export const useRestaurantMenu = (restaurantId: string) => {
  return useQuery({
    queryKey: ["menu", restaurantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menu_items") // تأكدي من اسم الجدول في الداتابيز
        .select("*")
        .eq("restaurant_id", restaurantId);

      if (error) throw error;
      return data;
    },
    enabled: !!restaurantId,
  });
};