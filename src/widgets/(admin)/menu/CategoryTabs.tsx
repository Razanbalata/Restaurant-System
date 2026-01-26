"use client";
import { Stack, Tab, Tabs, Box, useTheme } from "@mui/material";
import { ManageCategoriesMenu } from "./ManageCategoriesMenu";
import { useMe } from "@/features/user/api/use-me";

export const CategoryTabs = ({ categories, activeTab, onTabChange, restaurantId }) => {
  const { data: user } = useMe();
  const theme = useTheme();
  const isOwner = user?.role === "restaurant_owner";

  return (
    <Stack 
      direction="row" 
      alignItems="center" 
      spacing={1} 
      sx={{ borderBottom: `1px solid ${theme.palette.divider}`, mb: 4 }}
    >
      <Tabs 
        value={activeTab} 
        onChange={(e, v) => onTabChange(v)} 
        variant="scrollable" 
        scrollButtons="auto"
        textColor="primary"
        indicatorColor="primary"
        sx={{ 
          flexGrow: 1,
          '& .MuiTab-root': {
            fontWeight: 700,
            fontSize: '0.95rem',
            transition: '0.3s'
          }
        }}
      >
        <Tab label="الكل" />
        {categories?.map((cat) => (
          <Tab key={cat.id} label={cat.name} />
        ))}
      </Tabs>

      <Box sx={{ px: 1 }}>
        {isOwner && <ManageCategoriesMenu categories={categories} restaurantId={restaurantId} />}
      </Box>
    </Stack>
  );
};