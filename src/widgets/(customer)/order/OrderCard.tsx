import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import React from 'react';

function OrderCard({order}) {
  return (
    <Card 
            key={order.id} 
            elevation={0} 
            sx={{ 
              borderRadius: 4, 
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': { 
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                borderColor: 'transparent',
                transform: 'translateY(-2px)'
              } 
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Header: ID & Status */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 0.5 }}>رقم الطلب</Typography>
                  <Typography fontWeight="800" variant="body2">
                    #{order.id?.toString().slice(0, 8).toUpperCase()}
                  </Typography>
                </Box>
                <OrderStatusChip status={order.status} />
              </Stack>

              <Divider sx={{ borderStyle: "dashed", my: 2 }} />

              {/* Items List */}
              <Stack spacing={1.5}>
                {order.order_items?.map((item: any, idx: number) => (
                  <Stack key={idx} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box component="span" sx={{ color: 'orange', fontWeight: 900, mr: 1 }}>
                        {item.quantity} ×
                      </Box>
                      {item.menu_items?.name || "صنف مجهول"}
                    </Typography>
                    <Typography variant="body2" fontWeight="600">
                      {(Number(item.price || 0) * item.quantity).toFixed(2)} ₪
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Footer: Date & Total */}
              <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ display: "block" }}>التاريخ</Typography>
                  <Typography variant="body2" fontWeight="500">
                    {new Date(order.created_at).toLocaleDateString('ar-EG', { 
                      day: 'numeric', 
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="caption" color="textSecondary" sx={{ display: "block" }}>المجموع الإجمالي</Typography>
                  <PriceText amount={order.total_price} variant="h6" />
                </Box>
              </Stack>
            </CardContent>
          </Card>
  );
}

export default OrderCard;
