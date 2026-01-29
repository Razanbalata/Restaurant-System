import { toast } from "sonner";

export const notifyOrderEvent = (payload: any) => {
  const event = payload.eventType;

  if (event === "INSERT") {
    toast.success("🆕 New order arrived!");
  }

  if (event === "UPDATE") {
    toast.info("✏️ Order status updated");
  }

  if (event === "DELETE") {
    toast.warning("🗑️ Order deleted");
  }
};
