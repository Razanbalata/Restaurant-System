
"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";

// الاستيرادات المحلية للكومبوننتس الجديدة
import { RestaurantInfoCard } from "./RestaurantCard";

// Hooks
import { useRestaurantById } from "@/features/(admin)/restaurant/get-restaurants/api/useRestaurantById";
import { useMenu } from "@/features/(customer)/menu/get-menu/useMenu";
import { useMe } from "@/features/user/api/use-me";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { useParams } from "next/navigation";
import { RestaurantDetailSkeleton } from "@/shared/ui/Skeletons/RestaurantDetailSkeleton";

export default function RestaurantDetailPage() {
  const params = useParams();
  const restaurantId = params.id as string;
 console.log("resid",restaurantId)
  const { data: user } = useMe();

  const { data: restaurant, isLoading: isRestaurantLoading } =
    useRestaurantById(restaurantId);
    console.log("restaurant in RestaurantDetails",restaurant);

  const { data: menuData = [], isLoading: isMenuLoading } =
    useMenu(restaurantId);

  const isOwner =
    user?.role === "restaurant_owner" && restaurant?.owner_id === user.id;
console.log("isOwner in RestaurantDetails",isOwner,user?.role);
  const { selectedRestaurant } = useRestaurant();



// في ملف RestaurantDetailPage.js
if (isRestaurantLoading || isMenuLoading || !restaurant) {
  return <RestaurantDetailSkeleton />;
}

 

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* <RestaurantHeader
        imageUrl={`https://picsum.photos/seed/${selectedRestaurant.id}/800/600`}
        name={restaurant.name}
      /> */}

      <Container maxWidth="lg" sx={{ mt: -8, position: "relative", zIndex: 2 }}>
        <RestaurantInfoCard restaurant={selectedRestaurant} isOwner={isOwner} />

        {/* <Box sx={{ mt: 6, pb: 10 }}>
          <Typography variant="h4" fontWeight="900" mb={4}>
            قائمة الطعام
          </Typography>

          {isGenerating ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <CircularProgress size={60} sx={{ mb: 3 }} />
              <Typography variant="h5" fontWeight="bold" color="primary">
                جاري ابتكار المنيو بواسطة AI... ✨
              </Typography>
            </Box>
          ) : !shouldDisplayMenu ? (
            <Paper
              sx={{
                p: 6,
                textAlign: "center",
                borderRadius: "24px",
                border: "1px dashed #2196f3",
              }}
            >
              <RestaurantMenuIcon
                sx={{ fontSize: 60, color: "#2196f3", mb: 2, opacity: 0.5 }}
              />
              <Typography variant="h6" fontWeight="700">
                قائمة الطعام غير متوفرة بعد
              </Typography>
              <Button
                variant="contained"
                onClick={() =>
                  mutate(
                    { name: restaurant.name, category: restaurant.category },
                    { onSuccess: () => setForceShow(true) },
                  )
                }
                startIcon={<AutoAwesomeMosaicOutlined />}
                sx={{ mt: 3, borderRadius: "12px" }}
              >
                توليد المنيو الآن
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {menuData?.map((item: any, index: number) => (
                <Grid item xs={12} md={6} key={item.id || index}>
                  {/* <MealCard 
                    item={item} 
                    isOwner={isOwner} 
                    isPopular={index < 2} 
                    onAdd={(i: any) => user ? addItem(i, restaurantId) : alert("يرجى تسجيل الدخول")} 
                  /> 
                </Grid>
              ))}
            </Grid>
          )}
        </Box> */}
      </Container>
    </Box>
  );
}
