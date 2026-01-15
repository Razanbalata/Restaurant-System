import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";

export const useGetOrders = () => {
  return useQuery({
    queryKey: queryKeys.orders.all,
    queryFn: async () => {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("فشل جلب الطلبات");
      return res.json();
    },
  });
};
