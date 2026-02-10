"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { useCategories } from "@/features/(admin)/menu/categories/api/useCategories";
import { useMenu } from "@/features/(customer)/menu/get-menu/useMenu";
import FoodCard from "./DishesGrid";
import { MenuHeader } from "./MenuHeader";
import { CategoryTabs, MenuFilters } from "./CategoryTabs";
import { MenuItemMutationButton } from "@/features/(admin)/menu/ui/MenuItemMutationButton";
import { MenuManagementSkeleton } from "@/shared/ui/Skeletons/MenuManagementSkeleton";
import { useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useMenuItems } from "@/features/(admin)/menu/menu_items/api/useMenuItems";
import { DishesList } from "./DishesList";

// export default function MenuManagementPage() {
//   // const { selectedRestaurant, isReady } = useRestaurant();
//   // const [activeTab, setActiveTab] = useState(0);
//   // const theme = useTheme();

//   // // 1. جلب التصنيفات
//   // const { useAdminCategories } = useCategories(selectedRestaurant?.id);
//   // const { data: categories, isLoading: catLoading } = useAdminCategories;

//   // // 2. Fetch "all items" once (to ensure speed and performance)
//   // const { data: allMeals, isLoading: mealsLoading } = useMenu(
//   //   selectedRestaurant?.id,
//   // );

//   // // 3. تحديد الـ ID المختار (لأغراض الهيدر أو الإضافة)
//   // const selectedCategoryId = useMemo(() => {
//   //   if (activeTab === 0 || !categories) return null;
//   //   return categories[activeTab - 1]?.id;
//   // }, [activeTab, categories]);

//   // // 4. منطق الفلترة الذكي:
//   // const displayedMeals = useMemo(() => {
//   //   if (!allMeals) return [];

//   //   // If the tab is "All" (Index 0)
//   //   if (activeTab === 0) return allMeals;

//   //   // فلترة الوجبات بناءً على التصنيف المختار
//   //   return allMeals.filter(
//   //     (meal: any) => meal.category_id === selectedCategoryId,
//   //   );
//   // }, [activeTab, allMeals, selectedCategoryId]);

//   // // حالة التحميل الشاملة
//   // if (!isReady || catLoading || mealsLoading) {
//   //   return <MenuManagementSkeleton />;
//   // }

//   // return (
//   //   <Container maxWidth="lg" sx={{ py: 4 }}>
//   //     <MenuHeader
//   //       restaurantId={selectedRestaurant.id}
//   //       categoryId={selectedCategoryId}
//   //       restaurantName={selectedRestaurant.name}
//   //     />

//   //     {/* Tabs Container - Sticky with blur effect */}
//   //     <Box
//   //       sx={{
//   //         position: "sticky",
//   //         top: 0,
//   //         bgcolor: alpha(theme.palette.background.default, 0.8),
//   //         backdropFilter: "blur(10px)",
//   //         zIndex: 10,
//   //         pt: 2,
//   //         mb: 4,
//   //       }}
//   //     >
//   //       <CategoryTabs
//   //         categories={categories}
//   //         activeTab={activeTab}
//   //         onTabChange={setActiveTab}
//   //         restaurantId={selectedRestaurant.id}
//   //       />
//   //     </Box>

//   //     <Grid container spacing={3}>
//   //       {displayedMeals.length > 0 ? (
//   //         displayedMeals.map((meal: any) => (
//   //           <Grid size={{ xs : 12, sm : 6, md : 4 }} key={meal.id}>
//   //             <FoodCard item={meal} />
//   //           </Grid>
//   //         ))
//   //       ) : (
//   //         <Grid  size={{ xs: 12 }}>
//   //           <Stack alignItems="center" spacing={2} sx={{ py: 10 }}>
//   //             {/* Empty state styling */}
//   //             <Box
//   //               sx={{
//   //                 p: 3,
//   //                 bgcolor: theme.palette.action.hover,
//   //                 borderRadius: "50%",
//   //               }}
//   //             >
//   //               {/* يمكنك إضافة أيقونة هنا */}
//   //             </Box>
//   //             <Typography variant="h6" fontWeight={700} color="text.secondary">
//   //               No dishes in this category yet
//   //             </Typography>
//   //             {activeTab !== 0 && (
//   //               <MenuItemMutationButton
//   //                 mode="add"
//   //                 restaurantId={selectedRestaurant.id}
//   //               />
//   //             )}
//   //           </Stack>
//   //         </Grid>
//   //       )}
//   //     </Grid>
//   //   </Container>
//   // );

// // ... (نفس الـ Imports)
//   const { selectedRestaurant, isReady } = useRestaurant();
//   const [activeTab, setActiveTab] = useState(0);
//   const theme = useTheme();

//   // 1. جلب التصنيفات
//   const { useAdminCategories } = useCategories(selectedRestaurant?.id);
//   const { data: categories, isLoading: catLoading } = useAdminCategories;

//   // 2. تحديد الـ ID المختار
//   const selectedCategoryId = useMemo(() => {
//     if (activeTab === 0 || !categories) return null;
//     return categories[activeTab - 1]?.id;
//   }, [activeTab, categories]);

//   // 3. جلب "الكل" (فقط إذا كان التاب 0)
//   const { data: allMeals, isLoading: allMealsLoading } = useMenu(
//     activeTab === 0 ? selectedRestaurant?.id : ""
//   );

//   // 4. جلب "تصنيف محدد" (فقط إذا كان التاب ليس 0)
//   const { useAdminMenuItems } = useMenuItems(activeTab !== 0 ? (selectedCategoryId || "") : "");
//   const { data: categoryMeals, isLoading: adminMealsLoading } = useAdminMenuItems;

//   // 5. دمج البيانات المعروضة
// const displayedMeals = useMemo(() => {
//     const data = activeTab === 0 ? allMeals : categoryMeals;
//     console.log(`🖥️ Page Render: Tab [${activeTab}], Meals Count: ${data?.length || 0}`);
//     return data || [];
//   }, [activeTab, allMeals, categoryMeals]);

// useEffect(() => {
//     console.log("📡 useMenu Data Changed:", allMeals);
//   }, [allMeals]);

//   useEffect(() => {
//     console.log("🧪 useAdminMenuItems Data Changed:", categoryMeals);
//   }, [categoryMeals]);

//   const isLoading = !isReady || catLoading || (activeTab === 0 ? allMealsLoading : adminMealsLoading);

//   if (isLoading) return <MenuManagementSkeleton />;

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <MenuHeader
//         restaurantId={selectedRestaurant.id}
//         categoryId={selectedCategoryId}
//         restaurantName={selectedRestaurant.name}
//       />

//       <Box sx={{ position: "sticky", top: 0, bgcolor: alpha(theme.palette.background.default, 0.8), backdropFilter: "blur(10px)", zIndex: 10, pt: 2, mb: 4 }}>
//         <CategoryTabs
//           categories={categories}
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//           restaurantId={selectedRestaurant.id}
//         />
//       </Box>

//       <Grid container spacing={3}>
//         {displayedMeals.length > 0 ? (
//           displayedMeals.map((meal: any) => (
//             <Grid size={{ xs : 12, sm : 6, md : 4 }} key={meal.id}>
//               <FoodCard item={meal} />
//             </Grid>
//           ))
//         ) : (
//           <Grid size={{ xs: 12 }}>
//             <Stack alignItems="center" spacing={2} sx={{ py: 10 }}>
//               <Typography variant="h6" fontWeight={700} color="text.secondary">
//                 No dishes in this category yet
//               </Typography>
//               {activeTab !== 0 && (
//                 <MenuItemMutationButton mode="add" restaurantId={selectedRestaurant.id} />
//               )}
//             </Stack>
//           </Grid>
//         )}
//       </Grid>
//     </Container>
//   );
// }

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
