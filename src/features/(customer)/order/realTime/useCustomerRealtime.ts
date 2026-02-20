import { useEffect } from "react";
import { supabase } from "@/shared/api/supabaseRealTime";
import { useQueryClient } from "@tanstack/react-query";
import { notifyOrderEvent } from "@/shared/notifications/orderNotifications";
import { queryKeys } from "@/shared/keys/query-keys";

export const useCustomerOrdersRealtime = (userId?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`customer-room-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE", 
          schema: "public",
          table: "orders",
          filter: `user_id=eq.${userId}`, 
        },
        (payload) => {
          notifyOrderEvent(payload, "customer");

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