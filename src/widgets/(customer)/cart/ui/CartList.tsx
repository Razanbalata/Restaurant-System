// widgets/cart/ui/CartList.tsx
"use client";

import {
  Box,
  List,
  Paper,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCartLogic } from "@/features/cart/model/use-cart-logic";
import { CartItemRow } from "./CartItemRow"; 
import { PlaceOrderButton } from "@/features/(admin)/order/postOrder/ui/PlaceOrderButton"; 

export function CartList({ userId }: { userId: string }) {
  const router = useRouter();
  const { cart, isLoading, update, remove, total } = useCartLogic(userId);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (cart.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography>السلة فارغة حالياً</Typography>
        <Button sx={{ mt: 2 }} onClick={() => router.push("/")}>
          العودة للقائمة
        </Button>
      </Paper>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <List>
        {cart.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onIncrease={() =>
              update.mutate({
                cartItemId: item.id,
                newQuantity: item.quantity + 1,
              })
            }
            onDecrease={() =>
              update.mutate({
                cartItemId: item.id,
                newQuantity: item.quantity - 1,
              })
            }
            onDelete={() => remove.mutate(item.id)}
            loading={update.isPending || remove.isPending}
          />
        ))}
      </List>

      <Paper sx={{ p: 2, mt: 3 }}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h6">الإجمالي:</Typography>
          <Typography variant="h6" fontWeight="bold">
            {total}₪
          </Typography>
        </Stack>

        <PlaceOrderButton disabled={cart.length === 0} />
      </Paper>
    </Box>
  );
}
