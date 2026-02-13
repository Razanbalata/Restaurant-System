"use client";
import { Stack, Avatar, Box, Typography, alpha, useTheme } from "@mui/material";

export const OrderItemRow = ({ item }: { item: any }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ 
      p: 2, 
      transition: '0.2s',
      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) }
    }}>
      <Avatar
        src={item.menu_item?.image_url}
        variant="rounded"
        sx={{ 
          width: 52, height: 52, 
          borderRadius: '12px',
          border: `1px solid ${theme.palette.divider}`
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary' }}>
          {item.name}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          <Box component="span" sx={{ color: 'primary.main', mr: 0.5 }}>{item.quantity}x</Box> 
          • {Number(item.price).toFixed(2)} ₪
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 900 }}>
        {(item.quantity * item.price).toFixed(2)} ₪
      </Typography>
    </Stack>
  );
};