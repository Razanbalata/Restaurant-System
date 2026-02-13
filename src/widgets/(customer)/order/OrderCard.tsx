"use client";
import { Card, CardContent, Stack, Box, Typography, Divider, alpha, useTheme } from "@mui/material";
import { OrderStatusTracker } from "./OrderStatusTracker";
import { OrderItemRow } from "./OrderItemRow";
import { 
  AccessTime, 
  LocationOnOutlined, 
  PhoneEnabledOutlined, 
  DescriptionOutlined 
} from "@mui/icons-material";

export const OrderCard = ({ order }: { order: any }) => {
  const theme = useTheme();

  return (
    <Card elevation={0} sx={{
      borderRadius: '20px',
      border: `1px solid ${theme.palette.divider}`,
      transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        borderColor: alpha(theme.palette.primary.main, 0.3),
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header: ID & Price */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2.5}>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800, fontFamily: 'monospace' }}>
              ID: #{order.id?.toString().slice(-6).toUpperCase()}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
              <AccessTime sx={{ fontSize: 14, color: 'text.disabled' }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Stack>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 1000, color: 'primary.main' }}>
            {Number(order.totalPrice).toFixed(2)} ₪
          </Typography>
        </Stack>

        <OrderStatusTracker status={order.status} />

        {/* Items Area */}
        <Box sx={{ 
          bgcolor: theme.palette.mode === 'light' ? '#F9FAFB' : alpha(theme.palette.common.white, 0.03),
          borderRadius: '16px',
          overflow: 'hidden',
          border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          mb: 2 // أضفنا margin bottom بسيط عشان نفصل عن النوتس
        }}>
          {order.items?.map((item: any) => (
            <OrderItemRow key={item.id} item={item} />
          ))}
        </Box>

        {/* Information Stack: الجوال، الملاحظات، والعنوان */}
        <Stack spacing={1.5} sx={{ px: 1, mt: 2 }}>
          
          {/* رقم الجوال - يظهر فقط إذا وجد */}
          {order.customerPhone && (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <PhoneEnabledOutlined sx={{ fontSize: 18, color: 'success.main' }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {order.customerPhone}
              </Typography>
            </Stack>
          )}

          {/* الملاحظات - تظهر بتصميم مميز كأنها "Label" */}
          {order.notes && (
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <DescriptionOutlined sx={{ fontSize: 18, color: 'warning.main', mt: 0.2 }} />
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', fontSize: '10px', display: 'block' }}>
                  Order Notes
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', fontStyle: 'italic' }}>
                  `{order.notes}`
                </Typography>
              </Box>
            </Stack>
          )}

          <Divider sx={{ borderStyle: 'dashed', my: 0.5 }} />

          {/* الموقع */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <LocationOnOutlined sx={{ fontSize: 18, color: 'primary.main' }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary'}} noWrap >
              {order.deliveryAddress || "Pick up from restaurant"}
            </Typography>
          </Stack>
        </Stack>

      </CardContent>
    </Card>
  );
};