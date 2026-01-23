"use client";
import { Card, CardContent, Typography, Button, Stack, Chip } from "@mui/material";

export function OrderCard({ order, onStatusChange }: any) {
  // تأكد دائماً من أن order موجود لتجنب أخطاء أخرى
  if (!order) return null;
  console.log("Rendering OrderCard for order:", order);

  return (
    <Card sx={{ mb: 2, boxShadow: 2, borderRadius: 2, borderLeft: '5px solid #1a237e' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle2" fontWeight="bold">
            طلب #{order.id ? String(order.id).slice(0, 5) : "---"}
          </Typography>
          <Chip 
             label={order.status || 'معلق'} 
             size="small" 
             color="primary" 
             variant="outlined" 
          />
        </Stack>

        {/* حماية ضد الـ undefined والـ null */}
        {(order.items || []).map((item: any, index: number) => (
          <Typography key={item.menuItemId || index} variant="body2" color="text.secondary">
            • {item.quantity}x {item.name || 'صنف غير معروف'}
          </Typography>
        ))}

        <Typography variant="h6" sx={{ mt: 1, color: '#1a237e' }}>
          {order.total_price || 0}₪
        </Typography>

        <Stack direction="row" spacing={1} mt={2}>
          {(order.status === 'PENDING' || order.status === 'pending') && (
            <Button fullWidth variant="contained" color="warning" onClick={() => onStatusChange(order.id, 'PREPARING')}>
              قبول وبدء التحضير
            </Button>
          )}
          {order.status === 'PREPARING' && (
            <Button fullWidth variant="contained" color="success" onClick={() => onStatusChange(order.id, 'COMPLETED')}>
              تم التوصيل
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}