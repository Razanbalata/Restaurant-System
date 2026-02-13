
"use client";

import { CartItemControls } from "@/features/(customer)/cart/ui/CartItemControls";
import { Box, Typography, Stack, useTheme, alpha, IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CartItem } from "@/features/libs/types";

export function CartItemRow({ item }: { item: CartItem }) {
  const theme = useTheme();

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      sx={{ width: "100%" }}
      bgcolor={theme.palette.background.default}
    >
      <Box display="flex" alignItems="center" gap={3} sx={{ width: "100%" }}>
        {/* Container للصورة مع تأثير ظل ناعم */}
        <Box
          sx={{
            position: 'relative',
            width: 100,
            height: 100,
            flexShrink: 0,
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: "10px",
            }
          }}
        >
          <Box
            component="img"
            src={item.image || "/placeholder-food.jpg"}
            alt={item.name}
            sx={{ 
              width: "100%", 
              height: "100%", 
              borderRadius: "20px", 
              objectFit: "cover",
              filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.1))'
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight="800" sx={{ letterSpacing: '-0.5px', lineHeight: 1.2 }}>
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Extra sauce, no onions {/* مثال لإضافات المنيو لو موجودة */}
          </Typography>
          <Typography variant="h6" fontWeight="900" color="primary.main">
            {item.price} ₪
          </Typography>
        </Box>
      </Box>

      {/* منطقة التحكم بالكمية بتصميم زجاجي */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box sx={{ 
          bgcolor: alpha(theme.palette.primary.main, 0.08), 
          backdropFilter: 'blur(4px)',
          p: 0.5, 
          borderRadius: "14px",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          display: 'flex',
          alignItems: 'center'
        }}>
          <CartItemControls itemId={item.menuItemId} />
        </Box>
      </Stack>
    </Stack>
  );
}