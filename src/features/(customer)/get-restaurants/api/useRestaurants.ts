import { queryKeys } from "@/shared/keys/query-keys";
import { useQuery } from "@tanstack/react-query";
import { Restaurant } from "../libs/types";


const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const res = await fetch(`/api/customer/restaurants`);
  if (!res.ok) throw new Error("فشل جلب المطاعم");
  const data = await res.json();
  return  data.restaurants ?? [];
};


export const useRestaurants = (city?: string) => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchRestaurants(),
    enabled: !!city, // ما يبدأ إلا لو city موجودة
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
};
