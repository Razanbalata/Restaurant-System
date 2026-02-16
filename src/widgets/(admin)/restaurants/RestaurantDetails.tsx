"use client";
import React from "react";
import { Box, Container, Typography, Grid, Paper, Button, useTheme, alpha } from "@mui/material";
import { useParams } from "next/navigation";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenuRounded";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// المكونات التي قمنا بتطويرها
import { RestaurantInfoCard } from "./RestaurantCard";
import { RestaurantDetailSkeleton } from "@/shared/ui/Skeletons/RestaurantDetailSkeleton";

// Hooks
import { useRestaurantById } from "@/features/(admin)/restaurant/get-restaurants/api/useRestaurantById";
import { useMenu } from "@/features/(customer)/menu/get-menu/useMenu";
import { useMe } from "@/features/user/api/use-me";

export default function RestaurantDetailPage() {
  const params = useParams();
  const theme = useTheme();
  const restaurantId = params.id as string;

  // 1. جلب بيانات المستخدم الحالي وصلاحياته
  const { data: user } = useMe();

  // 2. جلب بيانات المطعم (Source of Truth)
  const { data: restaurant, isLoading: isRestaurantLoading } = useRestaurantById(restaurantId);

  // 3. جلب المنيو
  const { data: menuData = [], isLoading: isMenuLoading } = useMenu(restaurantId);

  // 4. التحقق من الملكية
  const isOwner = user?.role === "restaurant_owner" && restaurant?.owner_id === user.id;

  if (isRestaurantLoading || isMenuLoading) {
    return <RestaurantDetailSkeleton />;
  }

    // ==== حالة المالك الجديد بدون أي مطاعم ====
if (!restaurant && user?.role === "restaurant_owner") {
  return <NoRestaurantHero userName={user.name} />;
}


  return (
    <Box sx={{ bgcolor:theme.palette.background.default, minHeight: "100vh" }}>
      
      {/* عرض بيانات المطعم الأساسية (الهيدر والبطاقة العائمة) */}
      <RestaurantInfoCard restaurant={restaurant} isOwner={isOwner} />

      <Container maxWidth="lg" sx={{ mt: 6, pb: 10 }}>
        <Stack spacing={4}>
          
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" fontWeight={900} color="text.primary">
              Menu
            </Typography>
            {isOwner && (
              //  <Button 
              //   variant="outlined" 
              //   startIcon={<AutoAwesomeIcon />}
              //   sx={{ borderRadius: '12px', fontWeight: 700 }}
              //  >
              //    تحديث بواسطة AI
              //  </Button>
              <GenerateMenuButton restaurantId={restaurantId}/>
            )}
          </Stack>

          {menuData.length === 0 ? (
            // حالة عدم وجود منيو
            <Paper
              sx={{
                p: 8,
                textAlign: "center",
                borderRadius: "32px",
                border: `2px dashed ${theme.palette.divider}`,
                bgcolor: alpha(theme.palette.background.paper, 0.5),
              }}
            >
              <RestaurantMenuIcon sx={{ fontSize: 80, color: theme.palette.primary.main, mb: 2, opacity: 0.3 }} />
              <Typography variant="h5" fontWeight={800} gutterBottom>
                Menu Under Preparation 👨‍🍳
              </Typography>
              <Typography color="text.secondary" mb={3}>
                The restaurant hasn't added items yet, wait for us soon!
              </Typography>
              {isOwner && (
                // <Button variant="contained" size="large" sx={{ borderRadius: '14px', px: 4 }}>
                //   إضافة أول صنف الآن
                // </Button>
                <MenuItemMutationButton mode="add" restaurantId={restaurantId} />
              )}
            </Paper>
          ) : (
            // عرض المنيو في حال وجود بيانات
            <Grid container spacing={3}>
              {menuData.map((item: any, index: number) => (
                <Grid size={{xs:12,md:6}} key={item.id || index}>
                  {/* هنا يتم استدعاء MealCard الذي قمت بتصميمه مسبقاً */}
                  <Paper sx={{ p: 2, borderRadius: '20px' }}>
                     <Typography fontWeight={700}>{item.name}</Typography>
                     {/* ... باقي تفاصيل الوجبة */}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

// مكون Stack صغير للتنظيم إذا لم يكن مستورداً
import { Stack } from "@mui/material";
import { MenuItemMutationButton } from "@/features/(admin)/menu/ui/MenuItemMutationButton";import GenerateMenuButton from "@/features/(admin)/menu/ui/GenerateMenuButton";
import { NoRestaurantHero } from "./NoRestaurantHero";

