import { useEffect } from "react";
import { supabase } from "@/shared/api/supabaseRealTime";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";
import { notifyOrderEvent } from "@/shared/notifications/orderNotifications";

export const useOrdersRealtime = (restaurantId?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!restaurantId) return;

    const channel = supabase
      .channel(`orders-room-${restaurantId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
          filter: `restaurant_id=eq.${restaurantId}`,
        },
        (payload) => {
          notifyOrderEvent(payload);

          queryClient.invalidateQueries({
            queryKey:["orders", restaurantId],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [restaurantId, queryClient]);
};
