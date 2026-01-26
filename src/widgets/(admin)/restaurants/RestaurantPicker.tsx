"use client";
import { Grid, Card, CardMedia, CardContent, Typography, Box, useTheme, Chip, Container, alpha, Stack, Divider, Skeleton } from "@mui/material";
import { ArrowForwardRounded, StarRounded, LocationOnRounded } from "@mui/icons-material";
import { useMe } from "@/features/user/api/use-me";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { useRouter } from "next/navigation";
import { useRestaurants } from "@/features/(admin)/restaurant/get-restaurants/api/useRestaurants";
import { useRestaurantsForCustomer } from "@/features/(customer)/get-restaurants/api/useRestaurants";

export const RestaurantPicker = () => {
  const theme = useTheme();
  const router = useRouter();
  
  // 1. استدعاء كل الـ Hooks في القمة دائماً (ترتيب ثابت)
  const { data: user, isLoading: userLoading } = useMe();
  const { setSelectedRestaurant } = useRestaurant();
  const { useAdminRestaurants } = useRestaurants();
  
  // استدعاء الـ Hooks بشكل صريح لضمان ثبات الترتيب
  const adminQuery = useAdminRestaurants; 
  const customerQuery = useRestaurantsForCustomer();

  // 2. اختيار البيانات بناءً على الدور (منطق وليس Hook)
  const restaurantsQuery = user?.role === "restaurant_owner" ? adminQuery : customerQuery;
  const isLoading = userLoading || restaurantsQuery.isLoading;

  const handleSelect = (res: any) => {
    setSelectedRestaurant(res);
    router.push(`/restaurantDetails/${res.id}`);
  };

  // حالة التحميل (Skeleton) مرتبطة بالثيم
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={300} sx={{ borderRadius: "24px" }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* العناوين */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" fontWeight={900} gutterBottom sx={{ color: 'text.primary' }}>
          مرحباً بك 👋
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {user?.role === "restaurant_owner" ? "إليك قائمة مطاعمك، اختر واحداً لإدارته" : "اكتشف أفضل المطاعم من حولك"}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {restaurantsQuery.data?.map((res: any) => (
          <Grid item xs={12} sm={6} md={4} key={res.id}>
            <Card
              onClick={() => handleSelect(res)}
              sx={{
                borderRadius: "24px",
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: "background.paper",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                position: "relative",
                '&:hover': {
                  transform: "translateY(-12px)",
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                  '& .res-media': { transform: 'scale(1.1)' },
                  '& .res-arrow': { transform: 'translateX(-5px)', color: 'primary.main' } // تعديل للـ RTL
                }
              }}
            >
              {/* صورة المطعم */}
              <Box sx={{ position: "relative", overflow: "hidden", height: 200 }}>
                <CardMedia
                  className="res-media"
                  component="img"
                  height="200"
                  image={`https://picsum.photos/seed/${res.id}/600/400`}
                  sx={{ transition: "transform 0.6s ease" }}
                />
                <Chip 
                  label="نشط" 
                  size="small" 
                  sx={{ 
                    position: "absolute", 
                    top: 15, 
                    right: 15, // تعديل للـ RTL
                    bgcolor: alpha(theme.palette.background.paper, 0.9), 
                    fontWeight: 800, 
                    color: "primary.main", 
                    backdropFilter: "blur(4px)" 
                  }} 
                />
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
                  <Typography variant="h6" fontWeight={800} color="text.primary">
                    {res.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" sx={{ color: theme.palette.warning.main }}>
                    <StarRounded fontSize="small" />
                    <Typography variant="subtitle2" fontWeight={800} sx={{ ml: 0.5, color: "text.primary" }}>
                      4.8
                    </Typography>
                  </Stack>
                </Stack>
                
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, color: 'text.secondary' }}>
                  <LocationOnRounded sx={{ fontSize: 16, color: 'primary.main' }} />
                  {res.city}، فلسطين
                </Typography>

                <Divider sx={{ mb: 2, opacity: 0.5 }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="button" fontWeight={800} color="primary.main">
                    {user?.role === "restaurant_owner" ? "إدارة المطعم" : "عرض المنيو"}
                  </Typography>
                  <ArrowForwardRounded 
                    className="res-arrow" 
                    sx={{ 
                      transition: "0.3s", 
                      color: "text.disabled",
                      transform: 'scaleX(-1)' // لعكس السهم في الاتجاه العربي
                    }} 
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};