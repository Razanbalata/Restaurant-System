
// // shared/notifications/orderNotifications.ts
// import { toast } from "sonner";
// import { OrderStatus ,statusConfig} from "@/features/(admin)/order/constants/order-status"; 

// // أضفنا باراميتر role عشان نعرف مين اللي رح يشوف التوست
// export const notifyOrderEvent = (payload: any, role: 'admin' | 'customer' = 'admin') => {
//   const event = payload.eventType;
//   const newStatus = payload.new?.status;

//   if (role === 'admin') {
//     // إشعارات الأدمن (نفس اللي عندك مع لمسة بسيطة)
//     if (event === "INSERT") toast.success("🆕 New order arrived!");
//     if (event === "UPDATE") toast.info(`✏️ Order updated to: ${newStatus}`);
//     if (event === "DELETE") toast.warning("🗑️ Order deleted");
//   } 
//   else {
//     // إشعارات الزبون (هنا نركز فقط على التحديث)
//     if (event === "UPDATE") {
//       // ترجمة الحالات للزبون لتكون أوضح وأجمل
//       const messages: Record<string, string> = {
//         preparing: "👨‍🍳 Your meal is being prepared!",
//         shipped: "🛵 Your order is on the way!",
//         completed: "✅ Order delivered. Enjoy your meal!",
//       };

//       toast.success(messages[newStatus.toLowerCase()] || "Order status updated!");
//     }
//   }
//   return {
//     id: payload.new?.id || Math.random(),
//     message: role === 'admin' ? "New Order!" : "Status Updated",
//     time: new Date().toLocaleTimeString()
//   };
// };

// shared/notifications/orderNotifications.ts
import { toast } from "sonner";
 import { OrderStatus ,statusConfig} from "@/features/(admin)/order/constants/order-status"; 

type Role = 'admin' | 'customer';

interface Payload {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new?: {
    id?: string;
    status?: OrderStatus;
  };
}

export const notifyOrderEvent = (payload: Payload, role: Role = 'admin') => {
  const event = payload.eventType;
  const newStatus = payload.new?.status;

  if (role === 'admin') {
    // إشعارات الأدمن
    if (event === "INSERT") toast.success("🆕 New order arrived!");
    if (event === "UPDATE" && newStatus) {
      const label = statusConfig[newStatus]?.label || newStatus;
      toast.info(`✏️ Order updated to: ${label}`);
    }
    if (event === "DELETE") toast.warning("🗑️ Order deleted");
  } else {
    // إشعارات الزبون
    if (event === "UPDATE" && newStatus) {
      const customerMessages: Record<OrderStatus, string> = {
        pending: "⌛ Your order is pending confirmation.",
        confirmed: "✅ Your order has been confirmed!",
        preparing: "👨‍🍳 Your meal is being prepared!",
        ready: "📦 Your order is ready for delivery.",
        out_for_delivery: "🛵 Your order is on the way!",
        delivered: "✅ Order delivered. Enjoy your meal!",
        completed: "✅ Order completed!",
        cancelled: "❌ Your order was cancelled.",
      };

      toast.success(customerMessages[newStatus] || "Order status updated!");
    }
  }

  return {
    id: payload.new?.id || Math.random(),
    message: role === 'admin' ? "New Order!" : "Status Updated",
    time: new Date().toLocaleTimeString()
  };
};
