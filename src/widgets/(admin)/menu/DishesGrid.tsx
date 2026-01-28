"use client";
import { Box, Typography, Paper, useTheme, alpha, Stack } from '@mui/material';
import { MenuItemMutationButton } from '@/features/(admin)/menu/ui/MenuItemMutationButton';
import DeleteMenuItem from '@/features/(admin)/menu/ui/DeleteMenuItemBtn';
import AddToCartBtn from '@/features/(customer)/cart/ui/AddToCartBtn';
import { useMe } from '@/features/user/api/use-me';

export default function FoodCard({ item }: { item: any }) {
  const { data: user } = useMe();
  const theme = useTheme();
  const isAdmin = user?.role === "restaurant_owner";

  return (
    <Paper 
      elevation={0}
      sx={{ 
        width: "100%", // جعلها مرنة داخل الـ Grid
        borderRadius: 5, 
        overflow: 'hidden', 
        transition: 'all 0.3s ease-in-out',
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.palette.mode === 'light' 
            ? '0 12px 30px rgba(0,0,0,0.06)' 
            : '0 12px 30px rgba(0,0,0,0.3)'
        }
      }}
    >
      {/* Image Container */}
      <Box sx={{ position: 'relative', height: 200 }}>
        <img 
          src={item.image_url || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80"} 
          alt={item.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Price Tag Overlay */}
        <Box sx={{ 
          position: 'absolute', top: 15, right: 15, 
          backgroundColor: alpha(theme.palette.background.paper, 0.9), 
          backdropFilter: 'blur(8px)',
          color: theme.palette.primary.main,
          px: 2, py: 0.5, borderRadius: 2, 
          fontWeight: 800,
          border: `1px solid ${theme.palette.divider}`
        }}>
          {item.price} $
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, color: theme.palette.text.primary }}>
            {item.name}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: theme.palette.text.secondary, 
            mb: 3, 
            minHeight: '40px',
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden' 
          }}
        >
          {item.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isAdmin ? (
            <Stack direction="row" spacing={1} width="100%">
              <MenuItemMutationButton mode='edit' restaurantId={item.restaurant_id} item={item}/>
              <DeleteMenuItem r={item}/> 
            </Stack>
          ) : (
            <AddToCartBtn item={item} restaurantId={item.restaurant_id}/>
          )}
        </Box>
      </Box>
    </Paper>
  );
}