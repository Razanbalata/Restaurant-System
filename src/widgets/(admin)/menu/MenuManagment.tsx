"use client";
import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Typography,
  Stack,
  Button
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { useCategories } from "@/features/(admin)/menu/categories/api/useCategories";
import { useMenu } from "@/features/(customer)/menu/get-menu/useMenu";
import FoodCard from "./DishesGrid"; 
import { MenuHeader } from "./MenuHeader";
import { CategoryTabs } from "./CategoryTabs";
import { MenuItemMutationButton } from "@/features/(admin)/menu/ui/MenuItemMutationButton";
import { MenuManagementSkeleton } from "@/shared/ui/Skeletons/MenuManagementSkeleton";
import { useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function MenuManagementPage() {
  const { selectedRestaurant, isReady } = useRestaurant();
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  // 1. جلب التصنيفات
  const { useAdminCategories } = useCategories(selectedRestaurant?.id);
  const { data: categories, isLoading: catLoading } = useAdminCategories;

  // 2. جلب "كل الوجبات" مرة واحدة (لضمان السرعة والـ Performance)
  const { data: allMeals, isLoading: mealsLoading } = useMenu(selectedRestaurant?.id);

  // 3. تحديد الـ ID المختار (لأغراض الهيدر أو الإضافة)
  const selectedCategoryId = useMemo(() => {
    if (activeTab === 0 || !categories) return null;
    return categories[activeTab - 1]?.id;
  }, [activeTab, categories]);

  // 4. منطق الفلترة الذكي:
  const displayedMeals = useMemo(() => {
    if (!allMeals) return [];
    
    // إذا كان التاب "الكل" (Index 0)
    if (activeTab === 0) return allMeals;

    // فلترة الوجبات بناءً على التصنيف المختار
    return allMeals.filter(meal => meal.category_id === selectedCategoryId);
  }, [activeTab, allMeals, selectedCategoryId]);

// حالة التحميل الشاملة
  if (!isReady || catLoading || mealsLoading) {
    return <MenuManagementSkeleton />;
  }


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <MenuHeader
        restaurantId={selectedRestaurant.id}
        categoryId={selectedCategoryId}
        restaurantName={selectedRestaurant.name}
      />

      {/* Tabs Container - Sticky with blur effect */}
      <Box sx={{ 
        position: 'sticky', 
        top: 0, 
        bgcolor: alpha(theme.palette.background.default, 0.8), 
        backdropFilter: 'blur(10px)',
        zIndex: 10,
        pt: 2,
        mb: 4 
      }}>
        <CategoryTabs 
          categories={categories} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          restaurantId={selectedRestaurant.id}
        />
      </Box>

      <Grid container spacing={3}>
        {displayedMeals.length > 0 ? (
          displayedMeals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.id}>
              <FoodCard item={meal} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Stack alignItems="center" spacing={2} sx={{ py: 10 }}>
              {/* Empty state styling */}
              <Box sx={{ p: 3, bgcolor: theme.palette.action.hover, borderRadius: '50%' }}>
                 {/* يمكنك إضافة أيقونة هنا */}
              </Box>
              <Typography variant="h6" fontWeight={700} color="text.secondary">
                لا توجد أطباق في هذا القسم بعد
              </Typography>
              {activeTab !== 0 && (
                <MenuItemMutationButton mode='add' restaurantId={selectedRestaurant.id}/>
              )}
            </Stack>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
