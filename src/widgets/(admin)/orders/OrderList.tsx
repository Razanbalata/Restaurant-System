"use client";

import { Box, Typography, Stack, Paper, useTheme, alpha } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenuRounded";
import { OrderCard } from "./OrderCardd";

interface OrderItemsListProps {
  items: any[];
  hasRestaurant?: boolean; // جديد: لتحديد إذا المطعم موجود
}

export const OrderItemsList = ({ items, hasRestaurant = true }: OrderItemsListProps) => {
  const theme = useTheme();

  if (!hasRestaurant) {
    // حالة عدم وجود مطعم
    return (
      <Paper
        sx={{
          p: 6,
          textAlign: "center",
          borderRadius: "24px",
          border: `2px dashed ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.paper, 0.5),
          mt: 3,
        }}
      >
        <RestaurantMenuIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2, opacity: 0.3 }} />
        <Typography variant="h6" fontWeight={700} gutterBottom>
          No Restaurant Found
        </Typography>
        <Typography color="text.secondary">
          You currently don’t have a restaurant associated with your account.
        </Typography>
      </Paper>
    );
  }

  if (!items || items.length === 0) {
    // حالة عدم وجود طلبات
    return (
      <Paper
        sx={{
          p: 6,
          textAlign: "center",
          borderRadius: "24px",
          border: `2px dashed ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.paper, 0.5),
          mt: 3,
        }}
      >
        <RestaurantMenuIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2, opacity: 0.3 }} />
        <Typography variant="h6" fontWeight={700} gutterBottom>
          No Orders Yet
        </Typography>
        <Typography color="text.secondary">
          Once you add items to your menu, orders will appear here.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: "#374151" }}>
        Order Items
      </Typography>
      <Stack spacing={1.5}>
        {items.map((item) => (
          <OrderCard key={item.id} order={item} />
        ))}
      </Stack>
    </Box>
  );
};
