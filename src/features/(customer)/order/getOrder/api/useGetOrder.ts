import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";

export const useGetOrders = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.customer.orders(userId),
    queryFn: async () => {
      const res = await fetch("/api/customer/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
  });
};
