"use client";
import { Stack, Tab, Tabs, Box } from "@mui/material";
import { ManageCategoriesMenu } from "./ManageCategoriesMenu";

export const CategoryTabs = ({ categories, activeTab, onTabChange, restaurantId }) => {
  return (
    <Stack 
      direction="row" 
      alignItems="center" 
      spacing={1} 
      sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}
    >
      <Tabs 
        value={activeTab} 
        onChange={(e, v) => onTabChange(v)} 
        variant="scrollable" 
        sx={{ flexGrow: 1 }}
      >
        <Tab label="الكل" />
        {categories?.map((cat) => (
          <Tab key={cat.id} label={cat.name} />
        ))}
      </Tabs>

      <Box sx={{ px: 1 }}>
        {/* المنيو المنسدل الذي يحتوي على كل خيارات الإدارة */}
        <ManageCategoriesMenu categories={categories} restaurantId={restaurantId} />
      </Box>
    </Stack>
  );
};