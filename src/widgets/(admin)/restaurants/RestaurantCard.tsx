"use client";
import React from "react";
import {
  Paper,
  Stack,
  Typography,
  Rating,
  Divider,
  Chip,
  Box,
  Avatar,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { MapPin, Clock, UtensilsCrossed } from "lucide-react";
import MutationButton from "@/features/(admin)/restaurant/mutations-restaurant/ui/MutationButton";
import DeleteRestaurantBtn from "@/features/(admin)/restaurant/delete-restaurant/ui/DeleteRestaurantBtn";
import { useRouter } from "next/navigation";
import { RestaurantStatusBtn } from "@/features/(admin)/restaurant/delete-restaurant/ui/RestaurantStatusBtn";

interface RestaurantInfoCardProps {
  restaurant: any;
  isOwner: boolean;
}

export const RestaurantInfoCard = ({
  restaurant,
  isOwner,
}: RestaurantInfoCardProps) => {
  const theme = useTheme();
  const router = useRouter();
  console.log("res", restaurant);

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      {/* Banner Section */}
      <Box
        sx={{
          height: { xs: 220, md: 380 },
          borderRadius: { xs: "0", md: "0 0 64px 64px" },
          position: "relative",
          overflow: "hidden",
          transition: "all 0.5s ease-in-out",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "60%",
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          },
        }}
      >
        <Box
          component="img"
          src="/restaurant-cover.jpg" 
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Main Glass Card */}
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          mt: { xs: -6, md: -10 },
          mx: { xs: 2, md: 6, lg: 10 },
          p: { xs: 3, md: 6 },
          borderRadius: "48px",
          backdropFilter: "blur(12px)",
          bgcolor: alpha(theme.palette.background.paper, 0.85),
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 20px 60px -12px rgba(0,0,0,0.08)"
              : "0 20px 60px -12px rgba(0,0,0,0.5)",
        }}
      >
        <Stack
          direction={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "center", lg: "flex-start" }}
          spacing={4}
        >
          {/* Left Side: Avatar & Name */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "center", sm: "flex-start" }}
            spacing={4}
            textAlign={{ xs: "center", sm: "left" }}
          >
            <Avatar
              sx={{
                width: { xs: 100, md: 150 },
                height: { xs: 100, md: 150 },
                fontSize: "3.5rem",
                fontWeight: 900,
                bgcolor: "primary.main",
                border: `8px solid ${theme.palette.background.paper}`,
                boxShadow: theme.shadows[10],
              }}
            >
              {restaurant.name?.charAt(0)}
            </Avatar>

            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={{ xs: "center", sm: "flex-start" }}
                spacing={1.5}
                mb={1.5}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "1.8rem", md: "3rem" },
                    letterSpacing: "-0.04em",
                  }}
                >
                  {restaurant.name}
                </Typography>
                <VerifiedRoundedIcon
                  color="primary"
                  sx={{ fontSize: { xs: 24, md: 36 } }}
                />
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                justifyContent={{ xs: "center", sm: "flex-start" }}
                alignItems="center"
              >
                <Chip
                  label={restaurant.category || "General"}
                  sx={{
                    fontWeight: 800,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    borderRadius: "12px",
                  }}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Rating value={4.8} readOnly size="small" />
                  <Typography variant="subtitle2" fontWeight={900}>
                    4.8
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>

          {/* Right Side: Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {isOwner ? (
              <Stack direction="row" spacing={1.5}>
                {/* مكوناتك الخاصة بالأدمن */}
                <MutationButton mode="edit" restaurant={restaurant} />
                <RestaurantStatusBtn r={restaurant} />
              </Stack>
            ) : (
              <Button
                variant="contained"
                size="large"
                startIcon={<UtensilsCrossed size={20} />}
                sx={{
                  borderRadius: "20px",
                  px: 5,
                  py: 2,
                  fontWeight: 900,
                  fontSize: "1rem",
                  boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: theme.shadows[15],
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={() => router.push("/shared/menu")}
              >
                Order Now
              </Button>
            )}
          </Box>
        </Stack>

        <Divider sx={{ my: { xs: 4, md: 6 }, opacity: 0.5 }} />

        {/* Bottom Stats: Info Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
            gap: { xs: 4, md: 2 },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <InfoItem
            icon={<MapPin size={22} color={theme.palette.primary.main} />}
            label="Location"
            value={`${restaurant.city}, ${restaurant.country}`}
          />
          <InfoItem
            icon={<Clock size={22} color={theme.palette.primary.main} />}
            label="Avg. Prep Time"
            value="25 - 35 mins"
          />
          <InfoItem
            icon={
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  bgcolor: restaurant.is_active ? "#4CAF50" : "#757575",
                  borderRadius: "50%",
                  animation: restaurant.is_active
                    ? "pulse 2s infinite"
                    : "none",
                  "@keyframes pulse": {
                    "0%": {
                      transform: "scale(0.95)",
                      boxShadow: "0 0 0 0 rgba(76, 175, 80, 0.7)",
                    },
                    "70%": {
                      transform: "scale(1)",
                      boxShadow: "0 0 0 10px rgba(76, 175, 80, 0)",
                    },
                    "100%": {
                      transform: "scale(0.95)",
                      boxShadow: "0 0 0 0 rgba(76, 175, 80, 0)",
                    },
                  },
                }}
              />
            }
            label="Status"
            value={restaurant.is_active ? "Active" : "Archived"}
          />
        </Box>
      </Paper>
    </Box>
  );
};

// Sub-component for Grid Items
const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <Stack spacing={0.5} alignItems={{ xs: "center", sm: "flex-start" }}>
    <Typography
      variant="caption"
      sx={{
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "text.secondary",
      }}
    >
      {label}
    </Typography>
    <Stack direction="row" spacing={1.5} alignItems="center">
      {icon}
      <Typography variant="body1" fontWeight={700}>
        {value}
      </Typography>
    </Stack>
  </Stack>
);
