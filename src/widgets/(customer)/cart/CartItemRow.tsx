"use client";

import { CartItemControls } from "@/features/(customer)/cart/ui/CartItemControls";
import { Box, Typography, Stack, useTheme, alpha } from "@mui/material";

export function CartItemRow({ item }: { item: any }) {
  const theme = useTheme();

  return (
    <Stack
    
      direction={{ xs: "column", sm: "row" }}
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      sx={{ width: "100%" }}
    >
      <Box display="flex" alignItems="center" gap={3} sx={{ width: "100%" }}>
        <Box
          component="img"
          src={item.image || "/placeholder-food.jpg"}
          alt={item.name}
          sx={{ 
            width: 90, 
            height: 90, 
            borderRadius: "16px", 
            objectFit: "cover",
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)' 
          }}
        />
        <Box>
          <Typography variant="h6" fontWeight="800" color="text.primary">
            {item.name}
          </Typography>
          <Typography fontWeight="700" color="primary.main" sx={{ mt: 0.5 }}>
            {item.price} ₪
          </Typography>
        </Box>
      </Box>

      <Box sx={{ 
        bgcolor: alpha(theme.palette.primary.main, 0.05), 
        p: 1, 
        borderRadius: "12px",
        minWidth: 120,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <CartItemControls itemId={item.menuItemId} />
      </Box>
    </Stack>
  );
}