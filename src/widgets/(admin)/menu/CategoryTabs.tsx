
"use client";
import { Stack, TextField, MenuItem, Select, InputAdornment, Box, useTheme, alpha } from "@mui/material";
import { Search, Filter } from "lucide-react";
import { ManageCategoriesMenu } from "./ManageCategoriesMenu";

interface MenuFiltersProps {
  categories: any[];
  activeTab: number;
  onTabChange: (value: number) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  restaurantId?: string;
}

export const MenuFilters = ({ categories, activeTab, onTabChange, searchQuery, onSearchChange, restaurantId }: MenuFiltersProps) => {
  const theme = useTheme();

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
      <TextField
        placeholder="Search for a dish..."
        fullWidth
        size="small"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={18} color={theme.palette.text.secondary} />
            </InputAdornment>
          ),
        }}
        sx={{ 
          '& .MuiOutlinedInput-root': { 
            borderRadius: 2.5, 
            bgcolor: 'background.paper',
            '& fieldset': { borderColor: theme.palette.divider }
          } 
        }}
      />
      
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Select
          value={activeTab}
          onChange={(e) => onTabChange(Number(e.target.value))}
          size="small"
          sx={{ 
            minWidth: 200, 
            borderRadius: 2.5, 
            bgcolor: 'background.paper',
            '& .MuiSelect-select': { display: 'flex', alignItems: 'center' }
          }}
          startAdornment={<Filter size={16} style={{ marginRight: 10, opacity: 0.5 }} />}
        >
          <MenuItem value={0} sx={{ fontWeight: 600 }}>All Dishes</MenuItem>
          {categories?.map((cat, index) => (
            <MenuItem key={cat.id} value={index + 1}>{cat.name}</MenuItem>
          ))}
        </Select>
        
        <Box sx={{ borderLeft: `1px solid ${theme.palette.divider}`, pl: 1.5 }}>
          <ManageCategoriesMenu categories={categories} restaurantId={restaurantId} />
        </Box>
      </Stack>
    </Stack>
  );
};