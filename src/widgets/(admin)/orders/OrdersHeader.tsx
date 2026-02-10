import { Typography, Stack } from "@mui/material";

export const OrdersHeader = () => (
  <Stack spacing={0.5}>
    <Typography variant="h4" fontWeight={700}>
      Orders
    </Typography>
    <Typography color="text.secondary">
      Manage and track all incoming orders
    </Typography>
  </Stack>
);
