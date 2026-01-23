// FoodCard.tsx
import { Box, Typography, IconButton, Paper, Button } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { MenuItemMutationButton } from '@/features/(admin)/menu/ui/MenuItemMutationButton';
import DeleteMenuItem from '@/features/(admin)/menu/ui/DeleteMenuItemBtn';
import AddToCartBtn from '@/features/(customer)/cart/ui/AddToCartBtn';
import { useMe } from '@/features/user/api/use-me';

export default function FoodCard({item }: {item:{}}) {
 const {data:user} = useMe()
 const isAdmin = user?.role === "restaurant_owner"; 

  return (
    <Paper 
      elevation={0}
      sx={{ 
        width:"290px",
        borderRadius: '20px', 
        overflow: 'hidden', 
        transition: 'transform 0.3s, box-shadow 0.3s',
        border: '1px solid #eee',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.08)'
        }
      }}
    >
      {/* Image Container */}
      <Box sx={{ position: 'relative', height: 220 }}>
        <img 
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80" 
          alt="food" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Price Tag Overlay */}
        <Box sx={{ 
          position: 'absolute', top: 15, right: 15, 
          backgroundColor: 'rgba(255,255,255,0.9)', 
          backdropFilter: 'blur(5px)',
          px: 2, py: 0.5, borderRadius: '10px', fontWeight: 'bold' 
        }}>
          {item.price} $
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {item.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#777', mb: 3, lineClamp: 2, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical' }}>
         {item.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isAdmin ? (
            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
              <MenuItemMutationButton mode='edit' restaurantId={item.restaurant_id} item={item}/>
              <DeleteMenuItem r={item}/> 
            </Box>
          ) : (
            <AddToCartBtn item={item} restaurantId={item.restaurant_id}/>
          )}
        </Box>
      </Box>
    </Paper>
  );
}