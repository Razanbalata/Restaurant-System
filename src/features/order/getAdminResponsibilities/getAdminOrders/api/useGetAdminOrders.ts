import { useQuery } from "@tanstack/react-query";

export const useGetAdminOrders = () => {
  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error("فشل جلب الطلبات");
      return res.json();
    },
  });
};