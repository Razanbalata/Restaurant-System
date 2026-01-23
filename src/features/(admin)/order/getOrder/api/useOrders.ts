// hooks/useOrders.ts
import { supabase } from "@/shared/api/supabaseRealTime"; 
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {toast} from "sonner"

export const useOrders = (restaurantId?: string) => {
  const queryClient = useQueryClient();

  const useOrdersQuery = useQuery({
    queryKey: ["orders", restaurantId],
    queryFn: async () => {
      const res = await fetch(`/api/admin/orders?restaurantId=${restaurantId}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
  });

  // ✅ 3. PATCH تحديث حالة الطلب
  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "فشل تحديث حالة الطلب");
      }
      return res.json();
    },
    onSuccess: () => {
      if (restaurantId)
        toast.success("تم تعديل الطلب بنجاح!")
        queryClient.invalidateQueries({ queryKey: ["orders", restaurantId] });
    },
    onError: (error) =>{
       toast.error("حدث خطأ أثناء تعديل الطلب",error)
    }
  });

// ======= Real Time Feature 

  useEffect(() => {
    if (!restaurantId) return;

    // الاشتراك في القناة
    const channel = supabase
      .channel(`orders-room-${restaurantId}`)
      .on(
        "postgres_changes",
        {
          event: "*", // استمع للإضافة، التعديل، والحذف
          schema: "public",
          table: "orders",
          filter: `restaurant_id=eq.${restaurantId}`, // راقب مطعمك فقط!
        },
        (payload) => {
          console.log("تغيير جديد في الطلبات:", payload);
          // تحديث البيانات فوراً في المتصفح
          queryClient.invalidateQueries({ queryKey: ["orders", restaurantId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [restaurantId, queryClient]);

  return { useOrdersQuery, updateOrderStatus };
};
