"use client";

import { Box, Typography } from "@mui/material";
import { useMe } from "@/features/user/api/use-me";
import { CartItems } from "@/features/cart/ui/CartDrawer"; 

export default function CartPage() {
  const { data: user, isLoading } = useMe();

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        🛒 Cart
      </Typography>

      <CartItems userId={user.id} />
    </Box>
  );
}
