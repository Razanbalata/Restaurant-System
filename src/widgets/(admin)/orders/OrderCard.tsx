"use client";
import { Card, CardContent, Typography, Button, Stack, Chip, useTheme, alpha, Divider, Box } from "@mui/material";
import { Clock } from "lucide-react";

export function OrderCard({ order, onStatusChange, accentColor }: any) {
  const theme = useTheme();
  if (!order) return null;

  return (
    <Card sx={{ 
      borderRadius: 3, 
      bgcolor: theme.palette.background.paper,
      borderLeft: `6px solid ${accentColor}`,
      boxShadow: theme.shadows[1],
      transition: 'transform 0.2s',
      '&:hover': { transform: 'scale(1.02)', boxShadow: theme.shadows[4] }
    }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="start" mb={2}>
          <Box>
            <Typography variant="subtitle2" fontWeight={800} color="text.primary">
              طلب #{String(order.id).slice(0, 5).toUpperCase()}
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center" mt={0.5}>
              <Clock size={12} color={theme.palette.text.secondary} />
              <Typography variant="caption" color="text.secondary">
                منذ 5 دقائق
              </Typography>
            </Stack>
          </Box>
          <Chip 
            label={order.status} 
            size="small" 
            sx={{ 
              fontWeight: 700, 
              fontSize: '0.65rem',
              bgcolor: alpha(accentColor, 0.1),
              color: accentColor,
              border: `1px solid ${alpha(accentColor, 0.2)}`
            }} 
          />
        </Stack>

        <Divider sx={{ mb: 1.5, borderStyle: 'dashed' }} />

        <Box sx={{ mb: 2 }}>
          {(order.items || []).map((item: any, index: number) => (
            <Typography key={index} variant="body2" sx={{ color: theme.palette.text.primary, mb: 0.5, fontWeight: 500 }}>
              <Box component="span" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>{item.quantity}x</Box> {item.name}
            </Typography>
          ))}
        </Box>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="h6" fontWeight={800} color="primary.main">
            {order.total_price}₪
          </Typography>
          
          <Stack direction="row" spacing={1}>
            {(order.status.toLowerCase() === 'pending') && (
              <Button 
                variant="contained" 
                size="small"
                onClick={() => onStatusChange(order.id, 'PREPARING')}
                sx={{ borderRadius: 2, bgcolor: theme.palette.warning.main, '&:hover': { bgcolor: theme.palette.warning.dark } }}
              >
                تحضير
              </Button>
            )}
            {order.status === 'PREPARING' && (
              <Button 
                variant="contained" 
                size="small"
                color="success"
                onClick={() => onStatusChange(order.id, 'COMPLETED')}
                sx={{ borderRadius: 2 }}
              >
                توصيل
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}