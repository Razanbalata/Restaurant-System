"use client";
import { Box, Stack, TextField, Button, Typography, useTheme, alpha, IconButton } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from "react";
import { useRestaurants } from "@/features/(admin)/restaurant/get-restaurants/api/useRestaurants";
import { useMe } from "@/features/user/api/use-me";
import { Restaurant } from "@/features/(customer)/get-restaurants/libs/types";

interface RestaurantFormProps {
  restaurant?: Restaurant; // علامة الاستفهام تعني أنه اختياري (لحالة الإضافة)
  onClose: () => void;      // دالة لا تعيد شيئاً
}

export default function RestaurantForm({ restaurant, onClose }:RestaurantFormProps) {
  const theme = useTheme();
  const { data: owner } = useMe();
  const [formData, setFormData] = useState({
    name: restaurant?.name || "",
    city: restaurant?.city || "",
    country: restaurant?.country || "",
    description: restaurant?.description || "",
  });

  const { useAddRestaurant, useUpdateRestaurant } = useRestaurants();
  const createMutation = useAddRestaurant();
  const updateMutation = useUpdateRestaurant();

  const handleSave = () => {
    const action = restaurant ? updateMutation : createMutation;
    const payload = restaurant ? { id: restaurant.id, updates: formData } : formData;

    action.mutate(payload as any, { onSuccess: () => onClose() });
  };

  return (
    <Box sx={{
      position: "fixed", inset: 0, zIndex: 1300,
      display: "flex", justifyContent: "center", alignItems: "center",
      bgcolor: alpha(theme.palette.common.black, 0.5),
      backdropFilter: "blur(8px)",
    }}>
      <Box sx={{
        bgcolor: theme.palette.background.paper,
        p: 4, borderRadius: "28px", width: { xs: "90%", sm: 450 },
        boxShadow: theme.shadows[24],
        position: "relative"
      }}>
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 16, right: 16 }}>
          <CloseRoundedIcon />
        </IconButton>

        <Typography variant="h5" fontWeight={900} mb={3} color="primary">
          {restaurant ? "تعديل بيانات المطعم" : "إضافة مطعم جديد"}
        </Typography>

        <Stack spacing={2.5}>
          <TextField 
            fullWidth label="اسم المطعم" 
            variant="filled"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            sx={{ '& .MuiFilledInput-root': { borderRadius: '12px' } }}
          />
          <Stack direction="row" spacing={2}>
             <TextField fullWidth label="المدينة" variant="filled" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} sx={{ '& .MuiFilledInput-root': { borderRadius: '12px' } }} />
             <TextField fullWidth label="البلد" variant="filled" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} sx={{ '& .MuiFilledInput-root': { borderRadius: '12px' } }} />
          </Stack>
          <TextField 
            fullWidth label="الوصف" multiline rows={3} variant="filled"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            sx={{ '& .MuiFilledInput-root': { borderRadius: '12px' } }}
          />

          <Button 
            fullWidth variant="contained" size="large" 
            onClick={handleSave}
            disabled={createMutation.isPending || updateMutation.isPending}
            sx={{ py: 1.8, borderRadius: "14px", fontWeight: 800, fontSize: "1rem" }}
          >
            {restaurant ? "تحديث البيانات" : "إنشاء المطعم الآن"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}