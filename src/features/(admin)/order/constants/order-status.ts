import { Clock, CheckCircle2, ChefHat, Package, Truck, XCircle } from "lucide-react";
import type { FC } from "react";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "completed"
  | "cancelled";

export const statusConfig: Record<
  OrderStatus,
  { label: string; icon: FC<any>; color: string; bgColor: string }
> = {
  pending: { label: "Pending", icon: Clock, color: "#B45309", bgColor: "#FEF3C7" },
  confirmed: { label: "Confirmed", icon: CheckCircle2, color: "#2563EB", bgColor: "#DBEAFE" },
  preparing: { label: "Preparing", icon: ChefHat, color: "#7C3AED", bgColor: "#EDE9FE" },
  ready: { label: "Ready", icon: Package, color: "#15803D", bgColor: "#D1FAE5" },
  out_for_delivery: { label: "On the Way", icon: Truck, color: "#0EA5E9", bgColor: "#E0F2FE" },
  delivered: { label: "Delivered", icon: CheckCircle2, color: "#15803D", bgColor: "#D1FAE5" },
  completed: { label: "Completed", icon: CheckCircle2, color: "#15803D", bgColor: "#D1FAE5" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "#DC2626", bgColor: "#FEE2E2" },
};

export const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: "confirmed",
  confirmed: "preparing",
  preparing: "ready",
  ready: "out_for_delivery",
  out_for_delivery: "delivered",
  delivered: "completed",
};