import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";

export const useGenerateAndSaveMenu = (restaurantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, category }: { name: string; category?: string }) => {
      // نستخدم الراوت المدمج الجديد الذي يقوم بالتوليد والحفظ معاً
      const res = await fetch(`/api/admin/menu/generate-menu`, {
        method: "POST",
        body: JSON.stringify({ 
          restaurantName: name, 
          category, 
          restaurantId // مهم جداً للحفظ في الداتابيز
        }),
      });

      if (!res.ok) throw new Error("فشل توليد وحفظ المنيو");
      const data = await res.json();
      return data; // البيانات هنا هي الوجبات التي حُفظت فعلياً في Supabase
    },
    onSuccess: (data) => {
      console.log("✅ تم توليد وحفظ المنيو بنجاح",data);
      // تحديث بيانات المطعم أو المنيو في الكاش فوراً
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.restaurants.details(restaurantId) 
      });
    }   
  });
};