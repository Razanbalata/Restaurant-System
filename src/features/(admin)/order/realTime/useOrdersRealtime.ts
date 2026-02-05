import { useEffect } from "react";
import { supabase } from "@/shared/api/supabaseRealTime";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";
import { notifyOrderEvent } from "@/shared/notifications/orderNotifications";
import { useNotificationStore } from "@/shared/notifications/useNotificationStore";

export const useOrdersRealtime = (restaurantId?: string) => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

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
          notifyOrderEvent(payload, "admin");

          addNotification({
            id: Date.now(),
            type: payload.eventType,
            status: payload.new?.status,
            time: new Date().toLocaleTimeString(),
          });
          queryClient.invalidateQueries({
            queryKey: ["orders", restaurantId],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [restaurantId, queryClient]);
};
