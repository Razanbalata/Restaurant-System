
"use client";
import { Box, Typography, Paper, useTheme, alpha, Stack, Switch, Chip } from '@mui/material';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import { MenuItemMutationButton } from '@/features/(admin)/menu/ui/MenuItemMutationButton';
import DeleteMenuItem from '@/features/(admin)/menu/ui/DeleteMenuItemBtn';
import AddToCartBtn from '@/features/(customer)/cart/ui/AddToCartBtn';
import { useMe } from '@/features/user/api/use-me';
import { useState } from 'react';
import ToggleMenuItem from '@/features/(admin)/menu/ui/ToggleAvailability';
import { getSmartImage } from '@/shared/config/food-images';

export default function FoodCard({ item }: { item: any }) {
  const { data: user } = useMe();
  const [isAvailable,seIisAvailable] = useState(item.is_active)
  const theme = useTheme();
  const isAdmin = user?.role === "restaurant_owner";

  return (
    <Paper 
      elevation={0}
      sx={{ 
        width: "100%", 
        borderRadius: 1, 
        overflow: 'hidden', 
        // استخدام Divider Theme للحواف
        border: `1px solid ${theme.palette.divider}`,
        transition: theme.transitions.create(['border-color', 'box-shadow', 'transform'], {
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': {
          borderColor: theme.palette.primary.main,
          boxShadow: theme.shadows[2], // استخدام نظام الـ Shadows من الثيم
          transform: 'translateY(-2px)'
        },
        // استخدام ألوان الأكشن من الثيم للحالة غير المتوفرة
        bgcolor: isAvailable ? 'background.paper' : alpha(theme.palette.action.disabledBackground, 0.3),
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative', height: 180, overflow: 'hidden', bgcolor: 'action.hover' }}>
        <Image
          src={getSmartImage(item.name)} 
          alt={item.name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            filter: isAvailable ? 'none' : 'grayscale(100%)',
            transition: 'filter 0.3s ease'
          }}
        />
        <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
          <Chip 
            label={`${item.price} $`}
            // جعل الـ Chip يتناسق مع خلفية الورقة والحواف
            sx={{ 
              bgcolor: 'background.paper', 
              color: 'text.primary',
              fontWeight: 800, 
              border: `1px solid ${theme.palette.divider}`, 
              height: 28,
              backdropFilter: 'blur(4px)', // لمسة عصرية
            }} 
          />
        </Box>
      </Box>

      {/* Body Section */}
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {item.name}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: 'text.secondary' }}>
            <Clock size={14} />
            <Typography variant="caption" fontWeight={600}>{item.preparation_time || 15}m</Typography>
          </Stack>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ 
          mb: 2.5, 
          height: 40, 
          display: '-webkit-box', 
          WebkitLineClamp: 2, 
          WebkitBoxOrient: 'vertical', 
          overflow: 'hidden', 
          lineHeight: 1.6
        }}>
          {item.description}
        </Typography>

        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center" 
          sx={{ 
            pt: 2, 
            borderTop: `1px solid ${theme.palette.divider}` 
          }}
        >
          {isAdmin ? (
            <>
              <ToggleMenuItem item={item}/>
              <Stack direction="row" spacing={0.5}>
                <MenuItemMutationButton mode='edit' restaurantId={item.restaurant_id} item={item}/>
                <DeleteMenuItem r={item}/> 
              </Stack>
            </>
          ) : (
            <AddToCartBtn item={item} restaurantId={item.restaurant_id}/>
          )}
        </Stack>
      </Box>
    </Paper>
  );
}