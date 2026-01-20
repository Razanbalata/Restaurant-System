"use client";
import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid,
  CircularProgress,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { useCategories } from "@/features/(admin)/menu/categories/api/useCategories";
import { useMenuItems } from "@/features/(admin)/menu/menu_items/api/useMenuItems";
import FoodCard from "./DishesGrid"; // الكارد الذي يعرض الوجبة
import MealModal from "@/features/(admin)/menu/ui/MenuDrawer"; // فورم الإضافة (سنبنيه في الخطوة 2)
import { MenuItemMutationButton } from "@/features/(admin)/menu/ui/MenuItemMutationButton";
import { MenuHeader } from "./MenuHeader";
import { CategoryTabs, ManageCategoriesMenu } from "./CategoryTabs";
import { useMenu } from "@/features/(customer)/menu/get-menu/useMenu";

export default function MenuManagementPage() {
  const { selectedRestaurant, isReady } = useRestaurant();
  const [activeTab, setActiveTab] = useState(0);

  // جلب التصنيفات
  const { useAdminCategories } = useCategories(selectedRestaurant?.id);
  const { data: categories, isLoading: catLoading } = useAdminCategories;

  // تحديد التصنيف الحالي المختار
  const selectedCategoryId = useMemo(() => {
    if (activeTab === 0 || !categories) return null;
    return categories[activeTab - 1]?.id;
  }, [activeTab, categories]);

  // جلب الوجبات بناءً على التصنيف
  const { useAdminMenuItems } = useMenuItems(selectedCategoryId);
  const { data: meals, isLoading: mealsLoading } = useAdminMenuItems;
  const { data: allMeals } = useMenu(selectedRestaurant?.id);
 console.log("dataall",allMeals,"datai",meals)
const displayedMeals = useMemo(() => {
  if (activeTab === 0) {
    return allMeals ?? [];
  }

  return meals ?? [];
}, [activeTab, allMeals, meals]);



  if (!isReady || catLoading)
    return <CircularProgress sx={{ m: "auto", display: "block", mt: 10 }} />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 1. الهيدر */}
      <MenuHeader
        restaurantId={selectedRestaurant.id}
        categoryId={selectedCategoryId}
        restaurantName={selectedRestaurant.name}
      />

      {/* 2. التبويبات (Categories) */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <CategoryTabs categories={categories} activeTab={activeTab} onTabChange={setActiveTab} restaurantId={selectedRestaurant.id}/>
      </Box>

      {/* 3. شبكة الوجبات */}
      <Grid container spacing={3}>
        {mealsLoading ? (
          <CircularProgress />
        ) : (
          displayedMeals?.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.id}>
              <FoodCard item={meal} isAdmin={true} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
