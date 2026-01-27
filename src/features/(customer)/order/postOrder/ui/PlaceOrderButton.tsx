// features/place-order/ui/PlaceOrderButton.tsx
"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { usePlaceOrder } from "../api/usePlaceOrder";
import { useCart } from "@/features/(customer)/cart/api/useCart";

type Props = {
  formData: {
    address: string;
    phone: string;
    notes?: string;
  };
};

export function PlaceOrderButton({ formData }: Props) {
  const { address, phone, notes } = formData;
  const router = useRouter();
  const { items, restaurantId, clearCart } = useCart();
  const { mutate, isPending } = usePlaceOrder();
  const handlePlaceOrder = () => {
  if (!address || !phone) {
    alert("يرجى إدخال العنوان ورقم الهاتف");
    return;
  }

  const payload = {
    restaurantId,
    address,
    phone,
    notes,
    items,
  };


  try {
    mutate(payload, {
      onSuccess: (data) => {
        clearCart();
        router.push("/order"); // هذا يجب أن يعمل إذا وصلت هنا
      },
      onError: (err: any) => {
        console.error("❌ Order failed:", err);
        alert(err.message || "فشل في تقديم الطلب");
      },
    });
  } catch (err) {
    console.error("💥 Unexpected error:", err);
  }
};


  return (
    <Button
      fullWidth
      size="large"
      variant="contained"
      disabled={isPending}
      onClick={handlePlaceOrder}
    >
      {isPending ? "جاري معالجة الطلب..." : "تأكيد الطلب الآن"}
    </Button>
  );
}
