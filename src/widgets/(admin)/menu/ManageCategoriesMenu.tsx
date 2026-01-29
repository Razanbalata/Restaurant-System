"use client";
import { Menu, MenuItem, IconButton, Typography, Stack, Divider, useTheme, alpha } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CategoryMutationButton } from "@/features/(admin)/menu/categories/ui/CategoryMutationBtn"; 
import DeleteCategoryBtn from "@/features/(admin)/menu/categories/ui/DeleteCategoryBtn"; 
import { useState } from "react";

// 1. تعريف شكل القسم (Category)
interface Category {
  id: string;
  name: string;
}

// 2. تعريف واجهة الـ Props لهذا المكون
interface ManageCategoriesMenuProps {
  categories: Category[];
  restaurantId: string;
}

export const ManageCategoriesMenu = ({ categories, restaurantId }: ManageCategoriesMenuProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton 
        onClick={handleClick} 
        size="small" 
        sx={{ 
          bgcolor: theme.palette.action.hover, 
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}` 
        }}
      >
        <SettingsIcon fontSize="small" color="action" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ 
          elevation: 4,
          sx: { 
            width: 280, 
            borderRadius: 4, 
            p: 1, mt: 1.5,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`
          } 
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ borderRadius: 2, mb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1} width="100%">
            <AddCircleOutlineIcon fontSize="small" color="primary" />
            <Typography variant="body2" fontWeight={700} sx={{ flexGrow: 1 }}>
               Add New Category
            </Typography>
            <CategoryMutationButton mode="add" restaurantId={restaurantId} />
          </Stack>
        </MenuItem>

        <Divider />

        <Typography variant="caption" sx={{ px: 2, py: 1.5, display: 'block', color: 'text.secondary', fontWeight: 800 }}>
          Current Categories ({categories?.length || 0})
        </Typography>

        {categories?.map((cat) => (
          <MenuItem key={cat.id} disableRipple sx={{ borderRadius: 2, justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" fontWeight={500}>{cat.name}</Typography>
            <Stack direction="row" spacing={0.5}>
              <CategoryMutationButton mode="edit" category={cat} restaurantId={restaurantId} />
              <DeleteCategoryBtn categoryId={cat.id} restaurantId={restaurantId} />
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};