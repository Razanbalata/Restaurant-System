import { Box, Typography, Stack } from "@mui/material";
import { OrderCard } from "./OrderCard";

export default function OrderColumn({ title, orders, onStatusChange }: any) {
  return (
    <Box sx={{ flex: 1, bgcolor: '#f5f5f5', p: 2, borderRadius: 2, minHeight: '70vh' }}>
      <Typography variant="h6" fontWeight="bold" mb={2} textAlign="center">
        {title} ({orders.length})
      </Typography>
      <Stack spacing={1}>
        {orders.map((order: any) => (
          <OrderCard key={order.id} order={order} onStatusChange={onStatusChange} />
        ))}
      </Stack>
    </Box>
  );
}