import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys"; 

export const useCart = (userId: string) => {
  console.log("userId in useCart:", userId);
  return useQuery({
    queryKey: queryKeys.cart.all,
    queryFn: async () => {
      const res = await fetch(`/api/cart?userId=${userId}`);
      if (!res.ok) throw new Error("فشل جلب السلة");
      return res.json();
    },
    enabled: !!userId,
  });
};
