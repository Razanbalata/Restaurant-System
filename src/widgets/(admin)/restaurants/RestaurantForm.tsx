"use client";

import { useRestaurants } from "@/features/(admin)/restaurant/get-restaurants/api/useRestaurants";
import { useMe } from "@/features/user/api/use-me";
import { Box, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function RestaurantForm({ restaurant, onClose }) {
  const { data: owner, isLoading: ownerLoading } = useMe();
  const [formData, setFormData] = useState({
    name: restaurant?.name || "",
    city: restaurant?.city || "",
    country: restaurant?.country || "",
    description: restaurant?.description || "",
  });

  const { useAddRestaurant, useUpdateRestaurant } = useRestaurants(
    owner?.id ?? "",
  );

  const createRestaurant = useAddRestaurant(); // call mutation hook
  const updateRestaurant = useUpdateRestaurant(); // call mutation hook

const onSave = () => {
  if (restaurant) {
    updateRestaurant.mutate({id:restaurant.id,updates:formData}, { 
      onSuccess: () => onClose() // يخبر الأب أن يغلق النافذة بعد النجاح
    });
  } else {
    createRestaurant.mutate(formData, { 
      onSuccess: () => onClose() 
    });
  }
};

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{ bgcolor: "background.paper", p: 3, borderRadius: 2, width: 400 }}
      >
        <Stack spacing={2}>
          <TextField
            label="اسم المطعم"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="المدينة"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            fullWidth
          />
          <TextField
            label="البلد"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="الوصف"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            fullWidth
            multiline
            rows={3}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={onClose}>
              إلغاء
            </Button>
            <Button variant="contained" onClick={() => onSave(formData)}>
              {restaurant ? "تحديث" : "حفظ"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
