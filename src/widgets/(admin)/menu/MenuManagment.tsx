"use client";
import React, { useState, useMemo, useEffect } from "react";
import {

  Container,
} from "@mui/material";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { useCategories } from "@/features/(admin)/menu/categories/api/useCategories";
import { useMenu } from "@/features/(customer)/menu/get-menu/useMenu";
import { MenuHeader } from "./MenuHeader";
import {  MenuFilters } from "./CategoryTabs";
import { MenuManagementSkeleton } from "@/shared/ui/Skeletons/MenuManagementSkeleton";

import { useMenuItems } from "@/features/(admin)/menu/menu_items/api/useMenuItems";
import { DishesList } from "./DishesList";


export default function MenuManagementPage() {
  const { selectedRestaurant, isReady } = useRestaurant();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

   const { useAdminCategories } = useCategories(selectedRestaurant?.id);
  const { data: categories, isLoading: catLoading } = useAdminCategories;

  const selectedCategoryId = useMemo(() => {
    return activeTab !== 0 && categories ? categories[activeTab - 1]?.id : null;
  }, [activeTab, categories]);

  const { data: allMeals, isLoading: allLoading } = useMenu(
    activeTab === 0 ? selectedRestaurant?.id : "",
  );
  const { useAdminMenuItems } = useMenuItems(
    activeTab !== 0 ? selectedCategoryId || "" : "",
  );
  const { data: categoryMeals, isLoading: catItemsLoading } = useAdminMenuItems;

  const displayedMeals = useMemo(() => {
    const baseMeals = activeTab === 0 ? allMeals : categoryMeals;
    if (!baseMeals) return [];
    return baseMeals.filter((m: any) =>
      m.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [activeTab, allMeals, categoryMeals, searchQuery]);

  if (
    !isReady ||
    catLoading ||
    (activeTab === 0 ? allLoading : catItemsLoading)
  ) {
    return <MenuManagementSkeleton />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* 1. الهيدر */}
      <MenuHeader
        restaurantId={selectedRestaurant?.id}
        restaurantName={selectedRestaurant?.name}
      />

      {/* 2. الفلاتر (البحث والـ Select) */}
      <MenuFilters
        categories={categories || []}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        restaurantId={selectedRestaurant?.id}
      />

      {/* 3. قائمة الوجبات (الكومبوننت الجديد) */}
      <DishesList
        displayedMeals={displayedMeals}
        categories={categories || []}
        activeTab={activeTab}
      />
    </Container>
  );
}
