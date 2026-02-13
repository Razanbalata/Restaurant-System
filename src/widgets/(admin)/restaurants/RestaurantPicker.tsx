"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useTheme,
  Chip,
  Container,
  alpha,
  Stack,
  Divider,
} from "@mui/material";
import { ArrowForwardRounded, StarRounded, LocationOnRounded } from "@mui/icons-material";
import { useMe } from "@/features/user/api/use-me";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { useRouter } from "next/navigation";
import { useRestaurants } from "@/features/(admin)/restaurant/get-restaurants/api/useRestaurants";
import { useRestaurantsForCustomer } from "@/features/(customer)/get-restaurants/api/useRestaurants";
import { RestaurantPickerSkeleton } from "@/shared/ui/Skeletons/RestaurantPickerSkeleton";

const RestaurantCard = ({ res, onSelect, role }: any) => {
  const theme = useTheme();

  return (
    <Card
      onClick={() => onSelect(res)}
      sx={{
        width: "100%", // الكارد يملأ حاوية الفليكس المخصصة له
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: "background.paper",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-8px)",
          borderColor: theme.palette.primary.main,
          boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
          "& .res-media": { transform: "scale(1.08)" },
          "& .res-arrow": { transform: "translateX(-5px)", color: "primary.main" },
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden", pt: "60%" }}>
        <CardMedia
          className="res-media"
          component="img"
          image={`https://picsum.photos/seed/${res.id}/600/400`}
          sx={{
            position: "absolute",
            top: 0,
            transition: "transform 0.5s ease",
            height: "100%",
            width: "100%",
          }}
        />
        <Chip
          label="Active"
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: alpha(theme.palette.background.paper, 0.95),
            fontWeight: 800,
            color: "primary.main",
            fontSize: "0.65rem",
          }}
        />
      </Box>

      <CardContent sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              lineHeight: 1.2,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {res.name}
          </Typography>
          <Stack direction="row" alignItems="center" sx={{ color: theme.palette.warning.main }}>
            <StarRounded sx={{ fontSize: 16 }} />
            <Typography variant="caption" fontWeight={800} sx={{ ml: 0.4, color: "text.primary" }}>
              4.8
            </Typography>
          </Stack>
        </Stack>

        <Typography
          variant="caption"
          sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2, color: "text.secondary" }}
        >
          <LocationOnRounded sx={{ fontSize: 14, color: "primary.light" }} />
          {res.city}, Palestine
        </Typography>

        <Box sx={{ mt: "auto" }}>
          <Divider sx={{ mb: 1.5, opacity: 0.6 }} />
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="button" sx={{ fontSize: "0.7rem", fontWeight: 800, color: "primary.main" }}>
              {role === "restaurant_owner" ? "Manage Shop" : "View Menu"}
            </Typography>
            <ArrowForwardRounded
              className="res-arrow"
              sx={{ transition: "0.3s", color: "primary.light", transform: "scaleX(-1)", fontSize: 18 }}
            />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export const RestaurantPicker = () => {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useMe();
  const { setSelectedRestaurant } = useRestaurant();
  const { useAdminRestaurants } = useRestaurants();
  const customerQuery = useRestaurantsForCustomer();

  const restaurantsQuery = user?.role === "restaurant_owner" ? useAdminRestaurants : customerQuery;
  const isLoading = userLoading || restaurantsQuery.isLoading;

  const handleSelect = (res: any) => {
    setSelectedRestaurant(res);
    router.push(`/shared/restaurantDetails/${res.id}`);
  };

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4,px:0 }}>
        <RestaurantPickerSkeleton />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>

      {/* حاوية الفليكس الأساسية */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // يسمح بنزول الكروت لسطر جديد
          gap: 1, // المسافة بين الكروت
          justifyContent: "flex-start", // محاذاة الكروت لليسار (أو اليمين حسب الـ RTL)
        }}
      >
        {restaurantsQuery.data?.map((res: any) => (
          <Box
            key={res.id}
            sx={{
              // التحكم في العرض بناءً على حجم الشاشة (Responsive Flex Basis)
              flex: {
                xs: "1 1 100%", // سطر كامل في الموبايل
                sm: "1 1 calc(50% - 24px)", // كرتين في التابلت (مع طرح الـ Gap)
                md: "1 1 calc(33.333% - 24px)", // 3 كروت في اللابتوب
                lg: '0 1 calc(26% - 18px)', // 4 كروت في الشاشات الكبيرة
                xl: "0 1 calc(25% - 24px)", // 5 كروت في الشاشات الضخمة
              },
              // تثبيت الحجم الأدنى لضمان عدم صغر الكارت بشكل مشوه
              minWidth: { sm: "268px", xs: "100%" },
              display: "flex",
              justifyContent:"space-between"
            }}
          >
            <RestaurantCard res={res} onSelect={handleSelect} role={user?.role} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};