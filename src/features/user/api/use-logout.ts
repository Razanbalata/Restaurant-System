import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../shared/keys/query-keys";
import { toast } from "sonner";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", { method: "POST" });

      if (!res.ok) {
        throw new Error("فشل تسجيل الخروج");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.user.me(), null); // إزالة اليوزر من React Query cache
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all }); // إعادة تحميل أي بيانات متعلقة
     toast.success("تم تسجيل الخروج بنجاح!")
    },
    onError:(error)=>{
      toast.error("حدث خطأ أثناء تسجيل الخروج", {
        description: error.message, // عرض التفاصيل تحت العنوان
      }
      )
    }
  });
};
