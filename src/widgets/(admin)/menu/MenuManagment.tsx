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

const { data: allMeals, isLoading: allLoading } = useMenu(selectedRestaurant?.id);

  // ✅ ثبت الـ hook لتكون مستقرة
  const menuItemsHook = useMenuItems(selectedCategoryId || "");
  const { data: categoryMeals, isLoading: catItemsLoading } = menuItemsHook.useAdminMenuItems;

const displayedMeals = useMemo(() => {
    const baseMeals = activeTab === 0 ? allMeals : categoryMeals;
    if (!Array.isArray(baseMeals)) return [];
    
    return baseMeals.filter((m: any) =>
      m.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, allMeals, categoryMeals, searchQuery]);
  console.log("📊 ActiveTab:", activeTab);
console.log("📊 allMeals (ALL tab):", allMeals);
console.log("📊 categoryMeals (CATEGORY tab):", categoryMeals);
console.log("📊 displayedMeals:", displayedMeals);



  if (!isReady || catLoading || (activeTab === 0 ? allLoading : catItemsLoading)) {
    return <MenuManagementSkeleton />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <MenuHeader
        restaurantId={selectedRestaurant?.id}
        restaurantName={selectedRestaurant?.name}
      />

      <MenuFilters
        categories={categories || []}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        restaurantId={selectedRestaurant?.id}
      />

      <DishesList
        displayedMeals={displayedMeals}
        categories={categories || []}
        activeTab={activeTab}
      />
    </Container>
  );
}

