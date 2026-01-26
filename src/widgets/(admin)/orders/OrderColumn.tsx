"use client";
import { Box, Typography, Stack, useTheme, alpha } from "@mui/material";
import { OrderCard } from "./OrderCard";

export default function OrderColumn({ title, orders, onStatusChange, color }: any) {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      flex: 1, 
      width: "100%",
      bgcolor: theme.palette.mode === 'light' ? '#F4F6F8' : alpha(theme.palette.background.paper, 0.4), 
      p: 2, 
      borderRadius: 4, 
      minHeight: '75vh',
      border: `1px solid ${theme.palette.divider}`
    }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={3} justifyContent="center">
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color }} />
        <Typography variant="h6" fontWeight={800} color="text.primary">
          {title}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            bgcolor: alpha(color, 0.1), 
            color: color, 
            px: 1.5, py: 0.2, 
            borderRadius: 2, 
            fontWeight: 700 
          }}
        >
          {orders.length}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {orders.map((order: any) => (
          <OrderCard key={order.id} order={order} onStatusChange={onStatusChange} accentColor={color} />
        ))}
      </Stack>
    </Box>
  );
}