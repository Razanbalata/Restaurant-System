// entities/cart/ui/CartItemRow.tsx
"use client";

import { Box, Typography, Button, Stack } from "@mui/material";

export function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onDelete,
}: {
  item: any;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}) {
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
          src={item.menu_items?.image}
          alt={item.menu_items?.name}
          sx={{ width: 80, height: 80, borderRadius: 1, objectFit: "cover" }}
        />
        <Box>
          <Typography fontWeight="medium">{item.menu_items?.name}</Typography>
          <Typography fontSize={14} color="text.secondary">
            {item.price_at_time} ₪
          </Typography>
        </Box>
      </Box>

      <Stack direction="row" spacing={1} alignItems="center">
        <Button variant="outlined" size="small" onClick={onDecrease} disabled={item.quantity <= 1}>
          −
        </Button>
        <Typography>{item.quantity}</Typography>
        <Button variant="outlined" size="small" onClick={onIncrease}>
          +
        </Button>
        <Button color="error" onClick={onDelete}>
          Remove
        </Button>
      </Stack>
    </Stack>
  );
}
