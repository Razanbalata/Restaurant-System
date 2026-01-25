import { useEffect } from "react";
import { supabase } from "@/shared/api/supabaseRealTime"; 
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";
import { notifyOrderEvent } from "@/shared/notifications/orderNotifications";

export const useOrdersRealtime = (restaurantId?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("🔔 Realtime hook mounted", restaurantId);
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
    console.log("📬 Payload Realtime:", payload);

    // مؤقتاً عطلي أي وظيفة ثانية
    // notifyOrderEvent(payload);
    // queryClient.invalidateQueries({ queryKey: ["orders", restaurantId] });
  }
)

      .subscribe((status, err) => {
  console.log("📡 Realtime status:", status);
  if (err) console.error(err);
});

    return () => {
      supabase.removeChannel(channel);
    };
  }, [restaurantId, queryClient]);
};
