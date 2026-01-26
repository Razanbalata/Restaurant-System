"use client";
import React from "react";
import { Box, CssBaseline, Typography, Container, useTheme } from "@mui/material";
import { RestaurantPicker } from "../restaurants/RestaurantPicker";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import MutationButton from "@/features/(admin)/restaurant/mutations-restaurant/ui/MutationButton";
import { useMe } from "@/features/user/api/use-me";

export default function AdminDashboard() {
  const { data: user } = useMe();
  const theme = useTheme();
  const { selectedRestaurant } = useRestaurant();

  return (
    <Box sx={{ display: "flex", bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        
        {/* Banner Section */}
        <Box
          sx={{
            mb: 4, p: 4,
            borderRadius: 5,
            // تدرج لوني فخم يعتمد على ألوان الثيم الأساسية
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: theme.palette.primary.contrastText,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: `0 10px 30px ${theme.palette.primary.main}44`,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={800} gutterBottom>
              {!selectedRestaurant ? "أهلاً بك 👋" : selectedRestaurant.name}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              {user?.role === "restaurant_owner"
                ? "إليك آخر إحصائيات مطعمك اليوم"
                : "تصفح القائمة واختر وجبتك المفضلة"}
            </Typography>
          </Box>

          {user?.role === "restaurant_owner" && (
            <MutationButton mode="add" restaurant="" />
          )}
        </Box>

        <Container maxWidth="xl" sx={{ px: 0 }}>
          <RestaurantPicker />
        </Container>
      </Box>
    </Box>
  );
}