// entities/cart/ui/CartItemRow.tsx
"use client";

import { CartItemControls } from "@/features/(customer)/cart/ui/CartItemControls";
import { Box, Typography, Button, Stack } from "@mui/material";

export function CartItemRow({
  item,
}: {
  item: any;
}) {

  console.log("item in row", item);
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          component="img"
          src={item.image}
          alt={item.name}
          sx={{ width: 80, height: 80, borderRadius: 1, objectFit: "cover" }}
        />
        <Box>
          <Typography fontWeight="medium">{item.name}</Typography>
          <Typography fontSize={14} color="text.secondary">
            {item.price} ₪
          </Typography>
        </Box>
      </Box>

      <Stack direction="row" spacing={1} alignItems="center">
        <CartItemControls itemId={item.menuItemId} />
      </Stack>
    </Stack>
  );
}
