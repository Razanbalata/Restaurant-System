import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";

export function useMenu(restaurantId: string) {
  return useQuery({
    queryKey: queryKeys.restaurants.details(restaurantId),
    queryFn: async () => {
      if (!restaurantId) return [];
      const res = await fetch(`/api/customer/menu/categories?${restaurantId}`);
      if (!res.ok) throw new Error("فشل جلب المنيو");
      const json = await res.json();
      console.log("useMenu fetched data:", json.items);
      return json.items ?? []; // لاحظ: "menu" مش "items"
    },
    enabled: !!restaurantId,
  });
}
