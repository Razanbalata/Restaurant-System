"use client";
import { Box, Typography, Stack, Divider, alpha, useTheme, Avatar } from "@mui/material";

export function CheckoutSummary({ items, totalPrice }: any) {
  const theme = useTheme();

  return (
    <Stack spacing={2.5}>
      <Typography variant="h6" fontWeight="900">Your Order</Typography>
      
      {/* قائمة المنتجات مع اسكرول ناعم */}
      <Box 
        sx={{ 
          maxHeight: '320px', 
          overflowY: 'auto', 
          pr: 1,
          // تخصيص شكل السكرول بار ليكون أنحف واحترافي
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': { 
            bgcolor: alpha(theme.palette.divider, 0.2), 
            borderRadius: '10px' 
          }
        }}
      >
        {items.map((item: any) => (
          <Box 
            key={item.menuItemId} 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              mb: 2.5, 
              alignItems: 'center' 
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 0 }}>
              {/* صورة المنتج - دائرية بحواف ناعمة */}
              <Avatar
                src={item.image || "/placeholder-food.jpg"}
                alt={item.name}
                variant="rounded"
                sx={{ 
                  width: 54, 
                  height: 54, 
                  borderRadius: "12px",
                  boxShadow: `0 4px 10px ${alpha(theme.palette.common.black, 0.05)}`,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                }}
              />
              
              <Box sx={{ minWidth: 0 }}>
                <Typography 
                  fontWeight="800" 
                  variant="body2" 
                  noWrap 
                  sx={{ color: theme.palette.text.primary }}
                >
                  {item.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight="600">
                  Qty: {item.quantity} × {item.price} ₪
                </Typography>
              </Box>
            </Stack>

            <Typography fontWeight="900" sx={{ ml: 2, fontSize: '0.95rem' }}>
              {item.price * item.quantity} ₪
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ borderStyle: 'dashed', opacity: 0.6 }} />

      {/* تفاصيل الحساب */}
      <Stack spacing={1.5}>
        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary" fontWeight="600" variant="body2">Subtotal</Typography>
          <Typography fontWeight="700" variant="body2">{totalPrice} ₪</Typography>
        </Box>
        
        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary" fontWeight="600" variant="body2">Delivery Fee</Typography>
          <Typography fontWeight="800" color="success.main" variant="body2">FREE</Typography>
        </Box>

        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
          sx={{ 
            pt: 1.5, 
            mt: 1, 
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.05)}` 
          }}
        >
          <Typography variant="h6" fontWeight="950">Total</Typography>
          <Typography variant="h5" fontWeight="950" color="primary.main">
            {totalPrice} ₪
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}