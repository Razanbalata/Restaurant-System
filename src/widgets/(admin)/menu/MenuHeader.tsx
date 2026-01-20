import { MenuItemMutationButton } from '@/features/(admin)/menu/ui/MenuItemMutationButton';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Plus } from 'lucide-react';

export const MenuHeader = ({ restaurantName, restaurantId, categoryId }) => (
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={900}>إدارة المنيو</Typography>
          <Typography color="text.secondary">{restaurantName}</Typography>
        </Box>

        <MenuItemMutationButton mode='add' restaurantId={restaurantId}/>

      </Stack>
);