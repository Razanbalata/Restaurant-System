import { useQuery } from "@tanstack/react-query";

export const useGetAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("فشل جلب الإحصائيات");
      return res.json();
    },
    refetchInterval: 30000, // تحديث كل 30 ثانية
  });
};