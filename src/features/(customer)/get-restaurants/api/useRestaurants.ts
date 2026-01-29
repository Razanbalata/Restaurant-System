import { queryKeys } from "@/shared/keys/query-keys";
import { useQuery ,keepPreviousData} from "@tanstack/react-query";
import { Restaurant } from "../libs/types";


const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const res = await fetch(`/api/customer/restaurants`);
  if (!res.ok) throw new Error("Failed to fetch restaurants");
  const data = await res.json();
  return  data ?? [];
};


export const useRestaurantsForCustomer = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchRestaurants(),
    // 2. التعديل هنا: بدلاً من true، نمرر الدالة المستوردة
    placeholderData: keepPreviousData, 
    staleTime: 1000 * 60 * 5,
  });
};
