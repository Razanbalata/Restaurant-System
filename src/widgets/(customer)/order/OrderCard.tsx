"use client";
import React from 'react';
import { Box, Card, CardContent, Divider, Stack, Typography, useTheme, alpha } from '@mui/material';
import { OrderStatusTracker } from './OrderStatusTracker';

export function OrderCard({ order }: { order: any }) {
  const theme = useTheme();

  return (
    <Card 
      elevation={0} 
      sx={{ 
        borderRadius: `${Number(theme.shape.borderRadius) * 3}px`, // استخدام قيم الثيم للحواف
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        transition: theme.transitions.create(['all'], { duration: 300 }),
        '&:hover': { 
          boxShadow: `0 12px 30px ${alpha(theme.palette.common.black, 0.08)}`,
          borderColor: theme.palette.primary.light,
          transform: 'translateY(-4px)'
        } 
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header: ID & Status */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5, fontWeight: 700 }}>
              Order Number
            </Typography>
            <Typography fontWeight="900" variant="body2" color="text.primary">
              #{order.id?.toString().slice(0, 8).toUpperCase()}
            </Typography>
          </Box>
          {/* هنا نمرر الـ Status لمكون مخصص يستخدم ألوان الثيم */}
          <OrderStatusTracker status={order.status} />
        </Stack>

        <Divider sx={{ borderStyle: "dashed", my: 2, opacity: 0.6 }} />

        {/* Items List */}
        <Stack spacing={1.5}>
          {order.order_items?.map((item: any, idx: number) => (
            <Stack key={idx} direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                <Box component="span" sx={{ color: theme.palette.warning.main, fontWeight: 900, mr: 1 }}>
                  {item.quantity} ×
                </Box>
                {item.menu_items?.name || "Unknown Item"}
              </Typography>
              <Typography variant="body2" fontWeight="800" color="text.primary">
                {(Number(item.price || 0) * item.quantity).toFixed(2)} ₪
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Footer: Date & Total */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontWeight: 600 }}>Date</Typography>
            <Typography variant="body2" fontWeight="700">
              {new Date(order.created_at).toLocaleDateString('ar-EG', { 
                day: 'numeric', 
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontWeight: 600 }}>Total</Typography>
            <Typography variant="h6" fontWeight="900" color="primary.main">
              {Number(order.total_price).toFixed(2)} ₪
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}