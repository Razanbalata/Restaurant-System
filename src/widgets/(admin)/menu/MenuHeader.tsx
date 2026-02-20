import { MenuItemMutationButton } from '@/features/(admin)/menu/ui/MenuItemMutationButton';
import { useMe } from '@/features/user/api/use-me';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Plus } from 'lucide-react';

interface MenuHeaderProps {
  restaurantName?: string;
  restaurantId?: string;
  categoryId?: string;
}

export const MenuHeader = ({ restaurantName, restaurantId, categoryId }:MenuHeaderProps) => {
      const {data:user} = useMe();
      const role = user?.role;
      const isOwner = role === "restaurant_owner"; 
      return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={900}>Menu Management</Typography>
          <Typography color="text.secondary">{restaurantName}</Typography>
        </Box>

        {isOwner && <MenuItemMutationButton mode='add' restaurantId={restaurantId}/>}

      </Stack>
      )
};