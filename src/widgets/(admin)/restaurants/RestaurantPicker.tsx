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

export const RestaurantPicker = () => {
  const { setSelectedRestaurant } = useRestaurant();
  const { useAdminRestaurants } = useRestaurants();
  const restaurants = useAdminRestaurants;
  const router = useRouter();
  const theme = useTheme();

  const handleSelect = (res: any) => {
    setSelectedRestaurant(res);
    router.push(`/restaurantDetails/${res.id}`);
  };

  if (restaurants.isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress color="primary" thickness={5} />
      </Box>
    );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header Section */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" fontWeight={800} sx={{ color: "text.primary", mb: 1 }}>
          مرحباً بك مجدداً 👋
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          اختر المطعم الذي ترغب في إدارته وتحديث بياناته اليوم.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {restaurants.data.map((res: any) => (
          <Grid item xs={12} sm={6} md={4} key={res.id}>
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
                  boxShadow: `0 12px 24px ${theme.palette.mode === 'light' ? 'rgba(16,185,129,0.12)' : 'rgba(0,0,0,0.4)'}`,
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
                  sx={{ transition: "transform 0.5s", "&:hover": { transform: "scale(1.1)" } }}
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
                    direction: "ltr"
                  }}
                />
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ color: "text.primary" }}>
                    {res.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", color: "#FFB400" }}>
                    <StarRounded fontSize="small" />
                    <Typography variant="caption" fontWeight={700} sx={{ ml: 0.5, color: "text.primary" }}>
                      4.8
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ color: "text.secondary", mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
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
                    لوحة الإدارة
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