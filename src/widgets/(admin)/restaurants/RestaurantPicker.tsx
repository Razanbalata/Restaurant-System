"use client";

import { useRestaurant } from "@/app/providers/RestaurantContext";
import { useRestaurants } from "@/features/(admin)/restaurant/get-restaurants/api/useRestaurants";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useTheme,
  Chip,
  CircularProgress,
  Container,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ArrowForwardRounded, StarRounded } from "@mui/icons-material";
import { useMe } from "@/features/user/api/use-me";
import { useRestaurantsForCustomer } from "@/features/(customer)/get-restaurants/api/useRestaurants";

export const RestaurantPicker = () => {

const { data: user, isLoading: userLoading } = useMe();
const role = user?.role;

const { setSelectedRestaurant } = useRestaurant();

const { useAdminRestaurants } = useRestaurants();
const ownerQuery = useAdminRestaurants;

const customerQuery = useRestaurantsForCustomer();

const restaurantsQuery =
  role === "restaurant_owner" ? ownerQuery : customerQuery;

  console.log("res",customerQuery)
  const router = useRouter();
  const theme = useTheme();

  const handleSelect = (res: any) => {
    setSelectedRestaurant(res);
    router.push(`/restaurantDetails/${res.id}`);
  };


  if (userLoading) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", minHeight: "80vh" }}>
      <CircularProgress />
    </Box>
  );
}

  if (restaurantsQuery.isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", minHeight: "80vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header Section */}
      <Typography variant="h4" fontWeight={800}>
        مرحباً بك 👋
      </Typography>

      <Typography variant="body1" color="text.secondary">
        {role === "restaurant_owner"
          ? "اختر المطعم الذي ترغب في إدارته وتحديث بياناته."
          : "اختر مطعماً لتصفح القائمة والعناصر المتاحة."}
      </Typography>

      <Grid container spacing={3}>
        {restaurantsQuery .data.map((res: any) => (
          <Grid item xs={12} sm={6} md={4} key={res.id} mt={3}>
            <Card
              onClick={() => handleSelect(res)}
              sx={{
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: "background.paper",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                transition: "all 0.3s ease-in-out",
                cursor: "pointer",
                position: "relative",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 12px 24px ${theme.palette.mode === "light" ? "rgba(16,185,129,0.12)" : "rgba(0,0,0,0.4)"}`,
                  borderColor: "primary.main",
                },
              }}
            >
              {/* Image Section */}
              <Box sx={{ position: "relative", overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://picsum.photos/seed/${res.id}/600/400`}
                  alt={res.name}
                  sx={{
                    transition: "transform 0.5s",
                    "&:hover img": { transform: "scale(1.08)" },
                  }}
                />
                <Chip
                  label="نشط"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    bgcolor: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(4px)",
                    color: "primary.dark",
                    fontWeight: 700,
                    direction: "ltr",
                  }}
                />
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "text.primary" }}
                  >
                    {res.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#FFB400",
                    }}
                  >
                    <StarRounded fontSize="small" />
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      sx={{ ml: 0.5, color: "text.primary" }}
                    >
                      4.8
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  📍 فلسطين، غزة
                </Typography>

                <Box
                  sx={{
                    pt: 2,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "primary.main",
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={700}>
                    {role === "restaurant_owner"
                      ? "إدارة المطعم"
                      : "عرض التفاصيل"}
                  </Typography>

                  <ArrowForwardRounded fontSize="small" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
