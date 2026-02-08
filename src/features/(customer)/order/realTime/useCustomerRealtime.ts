import { useEffect } from "react";
import { supabase } from "@/shared/api/supabaseRealTime";
import { useQueryClient } from "@tanstack/react-query";
import { notifyOrderEvent } from "@/shared/notifications/orderNotifications";
import { queryKeys } from "@/shared/keys/query-keys";

// 1. تغيير الاسم ليعبر عن الزبون واستقبال userId
export const useCustomerOrdersRealtime = (userId?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // 2. التأكد من وجود معرف الزبون
    if (!userId) return;

    const channel = supabase
      .channel(`customer-room-${userId}`) // قناة فريدة لكل زبون
      .on(
        "postgres_changes",
        {
          event: "UPDATE", // الزبون يهمه غالباً تحديث الحالة (Update) فقط
          schema: "public",
          table: "orders",
          filter: `user_id=eq.${userId}`, // 3. الفلترة بناءً على الـ user_id الخاص بالزبون
        },
        (payload) => {
          // 4. استدعاء الإشعارات مع تحديد النوع "customer"
          notifyOrderEvent(payload, "customer");

          // 5. تحديث كاش طلبات الزبون (تأكدي أن الكي مطابق لما تستخدمينه في الكويري)
          queryClient.invalidateQueries({
            queryKey: queryKeys.customer.orders(userId),
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);
};