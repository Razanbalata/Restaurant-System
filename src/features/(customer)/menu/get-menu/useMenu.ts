import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";

export function useMenu(restaurantId: string) {
  return useQuery({
    queryKey: queryKeys.restaurants.details(restaurantId),
    queryFn: async () => {
      if (!restaurantId) return [];
      const res = await fetch(`/api/customer/menu/categories?restaurantId=${restaurantId}`);
      if (!res.ok) throw new Error("Failed to fetch menu");
      const categories = await res.json();
      return categories.flatMap((category: any) =>
        category.items.map((item: any) => ({
          ...item,
          categoryId: category.id,
          categoryName: category.name,
        }))
      );
    },
    enabled: !!restaurantId,
  });
}
