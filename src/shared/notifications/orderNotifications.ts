// import { toast } from "sonner";

// export const notifyOrderEvent = (payload: any) => {
//   const event = payload.eventType;

//   if (event === "INSERT") {
//     toast.success("🆕 New order arrived!");
//   }

//   if (event === "UPDATE") {
//     toast.info("✏️ Order status updated");
//   }

//   if (event === "DELETE") {
//     toast.warning("🗑️ Order deleted");
//   }
// };

// shared/notifications/orderNotifications.ts
import { toast } from "sonner";

// أضفنا باراميتر role عشان نعرف مين اللي رح يشوف التوست
export const notifyOrderEvent = (payload: any, role: 'admin' | 'customer' = 'admin') => {
  const event = payload.eventType;
  const newStatus = payload.new?.status;

  if (role === 'admin') {
    // إشعارات الأدمن (نفس اللي عندك مع لمسة بسيطة)
    if (event === "INSERT") toast.success("🆕 New order arrived!");
    if (event === "UPDATE") toast.info(`✏️ Order updated to: ${newStatus}`);
    if (event === "DELETE") toast.warning("🗑️ Order deleted");
  } 
  else {
    // إشعارات الزبون (هنا نركز فقط على التحديث)
    if (event === "UPDATE") {
      // ترجمة الحالات للزبون لتكون أوضح وأجمل
      const messages: Record<string, string> = {
        preparing: "👨‍🍳 Your meal is being prepared!",
        shipped: "🛵 Your order is on the way!",
        completed: "✅ Order delivered. Enjoy your meal!",
      };

      toast.success(messages[newStatus.toLowerCase()] || "Order status updated!");
    }
  }
  return {
    id: payload.new?.id || Math.random(),
    message: role === 'admin' ? "New Order!" : "Status Updated",
    time: new Date().toLocaleTimeString()
  };
};