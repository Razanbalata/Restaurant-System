import { toast } from "sonner";

export const notifyOrderEvent = (payload: any) => {
  const event = payload.eventType;

  if (event === "INSERT") {
    toast.success("🆕 طلب جديد وصل!");
  }

  if (event === "UPDATE") {
    toast.info("✏️ تم تحديث حالة الطلب");
  }

  if (event === "DELETE") {
    toast.warning("🗑️ تم حذف طلب");
  }
};
