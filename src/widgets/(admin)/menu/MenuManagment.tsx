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

export default function MenuManagementPage() {
  const { selectedRestaurant, isReady } = useRestaurant();
  const [activeTab, setActiveTab] = useState(0);

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

  if (!isReady || catLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 1. الهيدر (مع تمرير الـ ID لعمليات الإضافة) */}
      <MenuHeader
        restaurantId={selectedRestaurant.id}
        categoryId={selectedCategoryId}
        restaurantName={selectedRestaurant.name}
      />

      {/* 2. التبويبات (تأكد أن المكون يستخدم scrollable في MUI) */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4, position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 10 }}>
        <CategoryTabs 
          categories={categories} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          restaurantId={selectedRestaurant.id}
        />
      </Box>

      {/* 3. شبكة الوجبات */}
      <Grid container spacing={3}>
        {mealsLoading ? (
          // عرض Skeleton أو Loading أثناء الجلب الأول فقط
          [1, 2, 3, 4, 5, 6].map((i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
               <Box sx={{ height: 200, bgcolor: '#f0f0f0', borderRadius: 2, animate: 'pulse' }} />
            </Grid>
          ))
        ) : displayedMeals.length > 0 ? (
          displayedMeals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.id}>
              <FoodCard item={meal} />
            </Grid>
          ))
        ) : (
          // حالة عدم وجود وجبات (Empty State) - مهمة جداً للأونر
          <Grid item xs={12}>
            <Stack alignItems="center" spacing={2} sx={{ py: 8 }}>
              <Typography variant="h6" color="text.secondary">
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