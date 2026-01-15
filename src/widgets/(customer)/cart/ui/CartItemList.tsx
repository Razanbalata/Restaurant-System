// widgets/cart/ui/CartItemsList.tsx
"use client";

import { useCartLogic } from "@/features/cart/model/use-cart-logic";
import { CartItemRow } from "./CartItemRow"; 
import { Paper } from "@mui/material";

export function CartItemsList({ userId }: { userId: string }) {
  const { cart, update, remove } = useCartLogic(userId);

  if (cart.length === 0)
    return (
      <Paper sx={{ p: 4, textAlign: "center" }}>
        Your cart is empty 🛒
      </Paper>
    );

  return (
    <>
      {cart.map((item) => (
        <Paper key={item.id} sx={{ p: 2 }}>
          <CartItemRow
            item={item}
            onIncrease={() =>
              update.mutate({ cartItemId: item.id, newQuantity: item.quantity + 1 })
            }
            onDecrease={() =>
              update.mutate({ cartItemId: item.id, newQuantity: item.quantity - 1 })
            }
            onDelete={() => remove.mutate(item.id)}
          />
        </Paper>
      ))}
    </>
  );
}
