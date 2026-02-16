"use client";
import { Box, Typography, Paper, useTheme, alpha, Stack, Chip } from '@mui/material';
import { Clock } from 'lucide-react';
import { MenuItemMutationButton } from '@/features/(admin)/menu/ui/MenuItemMutationButton';
import DeleteMenuItem from '@/features/(admin)/menu/ui/DeleteMenuItemBtn';
import AddToCartBtn from '@/features/(customer)/cart/ui/AddToCartBtn';
import { useMe } from '@/features/user/api/use-me';
import { useState, useEffect } from 'react';
import ToggleMenuItem from '@/features/(admin)/menu/ui/ToggleAvailability';
import { getSmartImage } from '@/shared/config/food-images';

export default function FoodCard({ item }: { item: any }) {
  const { data: user } = useMe();
  const [isAvailable] = useState(item.is_active);
  const theme = useTheme();
  const isAdmin = user?.role === "restaurant_owner";

  // حالة الرابط: نبدأ بالرابط الموجود، وإذا فشل نستخدم getSmartImage
  const [imgSrc, setImgSrc] = useState(item.image_url || getSmartImage(item.name));

  // تحديث الصورة إذا تغير الـ item (مثلاً عند تعديل البيانات)
  useEffect(() => {
    if (item.image_url) {
      setImgSrc(item.image_url);
    }
  }, [item.image_url]);

  const handleImageError = () => {
    // إذا فشل تحميل الصورة (سواء blob أو رابط مكسور)، نضع الصورة الذكية البديلة
    const fallback = getSmartImage(item.name);
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        width: "100%", 
        borderRadius: 1, 
        overflow: 'hidden', 
        border: `1px solid ${theme.palette.divider}`,
        transition: theme.transitions.create(['border-color', 'box-shadow', 'transform']),
        '&:hover': {
          borderColor: theme.palette.primary.main,
          boxShadow: theme.shadows[2],
          transform: 'translateY(-2px)'
        },
        bgcolor: isAvailable ? 'background.paper' : alpha(theme.palette.action.disabledBackground, 0.3),
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative', height: 180, overflow: 'hidden', bgcolor: 'action.hover' }}>
        {/* استخدمنا <img> العادية هنا لأنها تدعم onError بشكل أفضل مع روابط الـ blob */}
        <Box
          component="img"
          src={imgSrc}
          alt={item.name}
          onError={handleImageError}
          sx={{ 
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
            sx={{ 
              bgcolor: 'background.paper', 
              color: 'text.primary',
              fontWeight: 800, 
              border: `1px solid ${theme.palette.divider}`, 
              height: 28,
              backdropFilter: 'blur(4px)',
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