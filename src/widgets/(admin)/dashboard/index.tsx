"use client";

import React, { useState } from "react";
import { Box, Grid, Button, Typography, Stack, CircularProgress } from "@mui/material";
import RestaurantCard from "./RestaurantCard"; 
import RestaurantForm from "./RestaurantForm";
import { useMe } from "@/features/user/api/use-me";
import { useRestaurants } from "@/features/(admin)/restaurant/get-restaurants/api/useRestaurants";
import OwnerCategories from "../menu/FullMenu";

export default function OwnerDashboard() {
  // 1️⃣ جلب بيانات المالك
  const { data: owner, isLoading: ownerLoading } = useMe();
  console.log("data",owner)
    // 3️⃣ state للتحكم بالـ form
  const [openForm, setOpenForm] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [showCategories,setShowCategories] = useState(false)
const { useAdminRestaurants, useAddRestaurant, useUpdateRestaurant, useDeleteRestaurant } = useRestaurants(owner?.id ?? "");

  const restaurantsQuery = useAdminRestaurants; // هذا already useQuery
  const createRestaurant = useAddRestaurant();  // call mutation hook
  const updateRestaurant = useUpdateRestaurant(); // call mutation hook
  const deleteRestaurant = useDeleteRestaurant(); // call mutation hook

  if (ownerLoading) return <CircularProgress />;
  if (!owner) return <Typography color="error">فشل جلب بيانات المالك</Typography>;


  if (restaurantsQuery.isLoading) return <CircularProgress />;
  if (restaurantsQuery.isError) return <Typography color="error">فشل جلب المطاعم</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      {/* عنوان وقائمة الأزرار */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={700}>قائمة المطاعم</Typography>
        <Button 
          variant="contained" 
          onClick={() => { setEditingRestaurant(null); setOpenForm(true); }}
        >
          إضافة مطعم جديد
        </Button>
      </Stack>

      {/* قائمة المطاعم */}
      <Grid container spacing={3}>
        {restaurantsQuery.data.map((restaurant) => (
          <>
         <Grid item xs={12} sm={6} md={4} key={restaurant.id} >
            <RestaurantCard
              restaurant={restaurant}
              onEdit={() => { setEditingRestaurant(restaurant); setOpenForm(true); }}
              onDelete={() => deleteRestaurant.mutate(restaurant.id)}
              
            />
            <Button onClick={()=>setShowCategories(true)}>show Categories</Button>
            {showCategories && <OwnerCategories restaurantId={restaurant.id} />}
          </Grid>

          </>
        ))}
      </Grid>

      {/* الفورم للإضافة أو التعديل */}
      {openForm && (
        <RestaurantForm
          restaurant={editingRestaurant}
          onClose={() => setOpenForm(false)}
          onSave={(data) => {
            if (editingRestaurant) {
              updateRestaurant.mutate({ id: editingRestaurant.id, updates: data });
            } else {
              console.log("data form",data)
              createRestaurant.mutate(data);
            }
            setOpenForm(false);
          }}
        />
      )}
    </Box>
  );
}
