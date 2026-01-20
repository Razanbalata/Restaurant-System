// import { Paper, TextField, InputAdornment, Button } from '@mui/material';
// import { Search, Filter } from 'lucide-react';

// export const MenuSearch = ({ onSearch }) => (
//   <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: '16px', border: '1px solid #f0f0f0', display: 'flex', gap: 2 }}>
//     <TextField 
//       fullWidth 
//       variant="outlined" 
//       placeholder="ابحث عن اسم الوجبة أو السعر..."
//       size="small"
//       onChange={(e) => onSearch(e.target.value)}
//       InputProps={{
//         startAdornment: (<InputAdornment position="start"><Search size={18} color="#9e9e9e" /></InputAdornment>),
//         sx: { borderRadius: '10px' }
//       }}
//     />
//     <Button variant="outlined" startIcon={<Filter size={18} />} sx={{ borderRadius: '10px', color: '#637381', borderColor: '#e0e0e0', minWidth: '100px' }}>
//       فلترة
//     </Button>
//   </Paper>
// );


"use client";
import { useState } from "react";
import { Menu, MenuItem, IconButton, Typography, Stack, Divider } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CategoryMutationButton } from "@/features/(admin)/menu/categories/ui/CategoryMutationBtn"; 
import DeleteCategoryBtn from "@/features/(admin)/menu/categories/ui/DeleteCategoryBtn"; 

export const ManageCategoriesMenu = ({ categories, restaurantId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton 
        onClick={handleClick} 
        size="small" 
        sx={{ bgcolor: "#f5f5f5", "&:hover": { bgcolor: "#eee" } }}
      >
        <SettingsIcon fontSize="small" color="action" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ 
          sx: { width: 280, borderRadius: "16px", p: 1, mt: 1.5 } 
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ py: 1.5 }}>
          <Stack direction="row" alignItems="center" spacing={1} width="100%">
            <AddCircleOutlineIcon fontSize="small" color="primary" />
            <Typography variant="body2" fontWeight={700} sx={{ flexGrow: 1 }}>
               إضافة قسم جديد
            </Typography>
            <CategoryMutationButton mode="add" restaurantId={restaurantId} />
          </Stack>
        </MenuItem>

        <Divider />

        <Typography variant="caption" sx={{ px: 2, py: 1.5, display: 'block', color: 'text.secondary', fontWeight: 700 }}>
          الأقسام الحالية ({categories?.length || 0})
        </Typography>

        {categories?.map((cat) => (
          <MenuItem key={cat.id} disableRipple sx={{ cursor: 'default', justifyContent: 'space-between' }}>
            <Typography variant="body2">{cat.name}</Typography>
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