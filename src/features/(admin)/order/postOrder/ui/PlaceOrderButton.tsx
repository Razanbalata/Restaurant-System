// features/place-order/ui/PlaceOrderButton.tsx
"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { usePlaceOrder } from "@/features/(admin)/order/postOrder/api/usePlaceOrder";

export function PlaceOrderButton({ disabled }: { disabled?: boolean }) {
  const router = useRouter();
  const { mutate, isPending } = usePlaceOrder();

  return (
    <Button
      fullWidth
      size="large"
      variant="contained"
      disabled={disabled || isPending}
      onClick={() =>
        mutate(undefined, {
          onSuccess: () => router.push("/order"),
        })
      }
    >
      {isPending ? "جاري معالجة الطلب..." : "تأكيد الطلب الآن"}
    </Button>
  );
}
