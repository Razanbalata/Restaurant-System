"use client";

import React from "react";
import {
  Box,
  CssBaseline,
  Typography,
  Container,
  useTheme,
  alpha,
  Stack,
  Button,
} from "@mui/material";
import { RestaurantPicker } from "../restaurants/RestaurantPicker";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import MutationButton from "@/features/(admin)/restaurant/mutations-restaurant/ui/MutationButton";
import { useMe } from "@/features/user/api/use-me";
import { AddRounded, DashboardRounded } from "@mui/icons-material";

export default function AdminDashboard() {
  const { data: user } = useMe();
  const theme = useTheme();
  const { selectedRestaurant } = useRestaurant();

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: theme.palette.background.default, 
        minHeight: "100vh",
      }}
    >
      <CssBaseline />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4, lg: 6 },
          width: "100%",
        }}
      >
        {/* 🚀 Premium Header Section */}
        <Box
          sx={{
            mb: 6,
            borderRadius: "32px",
            position: "relative",
            overflow: "hidden",
            minHeight: "260px",
            display: "flex",
            alignItems: "center",
            boxShadow: `0 20px 50px ${alpha(theme.palette.primary.main, 0.15)}`,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.95)} 0%, ${alpha(theme.palette.primary.dark, 0.9)} 100%), 
                         url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* طبقة زخرفية (Glass Circle) */}
          <Box
            sx={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              pointerEvents: "none",
            }}
          />

          <Container maxWidth="xl">
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
              spacing={3}
            >
              <Box sx={{ color: "white", zIndex: 1 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 1, opacity: 0.8 }}
                >
                  <DashboardRounded sx={{ fontSize: 20 }} />
                  <Typography
                    variant="overline"
                    sx={{ fontWeight: 700, letterSpacing: 2 }}
                  >
                    System Dashboard
                  </Typography>
                </Stack>

                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2rem", md: "3.5rem" },
                    mb: 1,
                    textShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  {!selectedRestaurant
                    ? `Hello, ${user?.name || "User"}`
                    : selectedRestaurant.name}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    fontWeight: 400,
                    maxWidth: "500px",
                    lineHeight: 1.5,
                  }}
                >
                  {user?.role === "restaurant_owner"
                    ? "Monitor your restaurant's growth and manage orders with ease."
                    : "Discover the most delicious meals from top-rated restaurants."}
                </Typography>
              </Box>

              {user?.role === "restaurant_owner" && (
                <Box sx={{ zIndex: 1 }}>
                  <Box
                    sx={{
                      "& > button": {
                        bgcolor: "white !important",
                        color: "primary.main !important",
                        px: 4,
                        py: 1.5,
                        borderRadius: "14px",
                        fontWeight: 800,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                        transition: "0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          bgcolor: alpha(theme.palette.common.white, 0.9),
                        },
                      },
                    }}
                  >
                    <MutationButton mode="add" restaurant="" />
                  </Box>
                </Box>
              )}
            </Stack>
          </Container>
        </Box>

        {/* 🍱 Content Section */}
        <Box
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
            <Box
              sx={{
                width: 2,
                height: 24,
                bgcolor: "primary.main",
                borderRadius: 1,
              }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, color: "text.primary" }}
            >
              {user?.role === "restaurant_owner"
                ? "Your Properties"
                : "Nearby Restaurants"}
            </Typography>
          </Stack>

          {/* استدعاء الـ RestaurantPicker اللي عملناه بالفليكس */}
          <Box sx={{
            flexBasis: {
              xs: "100%",
              sm: "calc(50% - 12px)",
              md: "calc(33.333% - 16px)",
              lg: "calc(30% - 18px)",
            },
            flexGrow: 0,
            flexShrink: 0,
            minWidth: 0,
          }}>
            <RestaurantPicker />
            </Box>
        </Box>
      </Box>
    </Box>
  );
}
