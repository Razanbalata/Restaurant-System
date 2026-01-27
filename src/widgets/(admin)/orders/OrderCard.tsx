"use client";
import { Card, CardContent, Typography, Button, Stack, Chip, useTheme, alpha, Divider, Box } from "@mui/material";
import { Clock, CheckCircle2, Flame, Truck } from "lucide-react";

export function OrderCard({ order, onStatusChange, accentColor }: any) {
  const theme = useTheme();
  if (!order) return null;

  // توحيد حالة الطلب لتجنب أخطاء المقارنة
  const status = order.status.toLowerCase();

  return (
    <Card sx={{ 
      borderRadius: 2, 
      bgcolor: "background.paper",
      borderLeft: `6px solid ${accentColor}`,
      boxShadow: theme.shadows[2],
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      '&:hover': { 
        transform: 'translateY(-4px)', 
        boxShadow: `0 12px 20px ${alpha(accentColor, 0.15)}` 
      }
    }}>
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="start" mb={2}>
          <Box>
            <Typography variant="subtitle1" fontWeight={900} color="text.primary" sx={{ lineHeight: 1.2 }}>
              طلب #{String(order.id).slice(0, 5).toUpperCase()}
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center" mt={0.5}>
              <Clock size={14} color={theme.palette.text.secondary} />
              <Typography variant="caption" fontWeight={600} color="text.secondary">
                منذ 5 دقائق
              </Typography>
            </Stack>
          </Box>
          <Chip 
            label={status === 'pending' ? 'جديد' : status === 'preparing' ? 'يتم التحضير' : 'منجز'} 
            size="small" 
            sx={{ 
              fontWeight: 800, 
              fontSize: '0.7rem',
              bgcolor: alpha(accentColor, 0.12),
              color: accentColor,
              borderRadius: 1.5,
              border: `1px solid ${alpha(accentColor, 0.3)}`
            }} 
          />
        </Stack>

        <Divider sx={{ mb: 2, borderStyle: 'dashed', borderColor: alpha(theme.palette.divider, 0.8) }} />

        {/* قائمة العناصر - تحسين المظهر البصري */}
        <Box sx={{ mb: 3 }}>
          {(order.items || []).map((item: any, index: number) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
              <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
                <Box component="span" sx={{ color: 'primary.main', mr: 0.5 }}>{item.quantity}x</Box> 
                {item.name}
              </Typography>
            </Box>
          ))}
        </Box>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: -0.5 }}>الإجمالي</Typography>
            <Typography variant="h6" fontWeight={900} color="primary.main">
              {order.total_price}₪
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1}>
            {/* زر التحضير يظهر فقط للطلبات الجديدة */}
            {status === 'pending' && (
              <Button 
                variant="contained" 
                size="medium"
                startIcon={<Flame size={16} />}
                onClick={() => onStatusChange(order.id, 'PREPARING')}
                sx={{ 
                  borderRadius: 2.5, 
                  fontWeight: 800,
                  bgcolor: 'warning.main', 
                  color: 'warning.contrastText',
                  '&:hover': { bgcolor: 'warning.dark' },
                  boxShadow: `0 4px 10px ${alpha(theme.palette.warning.main, 0.3)}`
                }}
              >
                تحضير
              </Button>
            )}

            {/* زر التجهيز يظهر فقط للطلبات قيد التحضير */}
            {status === 'preparing' && (
              <Button 
                variant="contained" 
                size="medium"
                startIcon={<CheckCircle2 size={16} />}
                onClick={() => onStatusChange(order.id, 'COMPLETED')}
                sx={{ 
                  borderRadius: 2.5, 
                  fontWeight: 800,
                  bgcolor: 'success.main',
                  '&:hover': { bgcolor: 'success.dark' },
                  boxShadow: `0 4px 10px ${alpha(theme.palette.success.main, 0.3)}`
                }}
              >
                جاهز
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}