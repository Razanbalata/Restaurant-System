import { queryKeys } from "@/shared/keys/query-keys";
import { useQuery } from "@tanstack/react-query";
import { Restaurant } from "../libs/types";


const fetchRestaurants = async (city: string): Promise<Restaurant[]> => {
  const res = await fetch(`/api/restaurants?city=${city}`);
  if (!res.ok) throw new Error("فشل جلب المطاعم");
  const data = await res.json();
  return  data.restaurants ?? [];
};


export const useRestaurants = (city?: string) => {
  return useQuery({
    queryKey: queryKeys.restaurants.list(city),
    queryFn: () => fetchRestaurants(city!),
    enabled: !!city, // ما يبدأ إلا لو city موجودة
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
};
