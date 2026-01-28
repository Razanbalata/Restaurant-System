"use client";
import { Paper, Stack, Typography, Rating, Divider, Chip, Box, CardActions, Avatar, Button, useTheme, alpha } from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import MutationButton from "@/features/(admin)/restaurant/mutations-restaurant/ui/MutationButton";
import DeleteRestaurantBtn from "@/features/(admin)/restaurant/delete-restaurant/ui/DeleteRestaurantBtn";
import { useRouter } from "next/navigation";

// 1. تعريف شكل بيانات المطعم
interface Restaurant {
  id: string;
  name: string;
  category?: string;
  city: string;
  country: string;
  description?: string;
  // أضف أي حقول أخرى تأتي من الـ API وتستخدمها هنا
}

// 2. تعريف واجهة الـ Props للمكون الرئيسي والـ InfoItem
interface RestaurantInfoCardProps {
  restaurant: Restaurant;
  isOwner: boolean;
}

export const RestaurantInfoCard = ({ restaurant, isOwner }: RestaurantInfoCardProps) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      {/* Banner */}
      <Box
        sx={{
          height: 280,
          borderRadius: "0 0 40px 40px",
          background: `linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0.2)}, ${alpha(theme.palette.common.black, 0.8)}), url("/restaurant-cover.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Main Info Card */}
      <Paper
        elevation={0}
        sx={{
          mt: "-100px",
          mx: { xs: 2, md: 4 },
          p: { xs: 3, md: 5 },
          borderRadius: "32px",
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.palette.mode === 'light' ? "0 20px 40px rgba(0,0,0,0.05)" : "0 20px 40px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        {isOwner && (
          <CardActions sx={{ position: "absolute", top: 24, right: 24, gap: 1 }}>
            <MutationButton mode="edit" restaurant={restaurant} />
            <DeleteRestaurantBtn r={restaurant} />
          </CardActions>
        )}

        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "center" }} spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center">
            <Avatar
              sx={{
                width: 110, height: 110,
                fontSize: "2.5rem", fontWeight: 900,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                border: `6px solid ${theme.palette.background.paper}`,
                boxShadow: theme.shadows[3]
              }}
            >
              {restaurant.name?.charAt(0)}
            </Avatar>

            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Stack direction="row" alignItems="center" spacing={1} justifyContent={{ xs: "center", sm: "flex-start" }}>
                <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-1px" }}>
                  {restaurant.name}
                </Typography>
                <VerifiedRoundedIcon sx={{ color: theme.palette.primary.main }} />
              </Stack>
              <Stack direction="row" spacing={2} mt={1} alignItems="center" justifyContent={{ xs: "center", sm: "flex-start" }}>
                <Chip 
                  label={restaurant.category || "عام"} 
                  size="small" 
                  sx={{ fontWeight: 700, bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }} 
                />
                <Rating value={4.8} readOnly size="small" sx={{ color: "#FFB400" }} />
                <Typography fontWeight={700} variant="body2">4.8</Typography>
              </Stack>
            </Box>
          </Stack>

          {!isOwner && (
            <Button
              size="large"
              variant="contained"
              startIcon={<RestaurantMenuRoundedIcon />}
              onClick={() => router.push(`/menu`)}
              sx={{
                px: 5, py: 1.5,
                borderRadius: "16px",
                fontWeight: 800,
                boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
              عرض المنيو
            </Button>
          )}
        </Stack>

        <Divider sx={{ my: 4, opacity: 0.6 }} />

        {/* Info Grid */}
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={4}>
          <InfoItem
            icon={<LocationOnRoundedIcon sx={{ color: theme.palette.primary.main }} />}
            label="الموقع"
            value={`${restaurant.city}, ${restaurant.country}`}
          />
          <InfoItem
            icon={<AccessTimeRoundedIcon sx={{ color: theme.palette.primary.main }} />}
            label="وقت التحضير"
            value="30 – 45 دقيقة"
          />
          <InfoItem
            icon={<Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#4CAF50" }} />}
            label="الحالة"
            value="مفتوح الآن"
          />
        </Box>

        <Box sx={{ mt: 4, bgcolor: theme.palette.mode === 'light' ? "#F8F9FA" : alpha(theme.palette.action.hover, 0.05), p: 3, borderRadius: "24px" }}>
          <Typography fontWeight={800} gutterBottom color="primary">عن المطعم</Typography>
          <Typography color="text.secondary" lineHeight={1.8}>
            {restaurant.description || "يقدم هذا المطعم وجبات عالية الجودة محضرة بمكونات طازجة ومعايير احترافية."}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <Box>
    <Typography variant="caption" color="text.secondary" fontWeight={800} sx={{ textTransform: "uppercase", display: "block", mb: 0.5 }}>
      {label}
    </Typography>
    <Stack direction="row" spacing={1.5} alignItems="center">
      {icon}
      <Typography fontWeight={700} variant="body1">{value}</Typography>
    </Stack>
  </Box>
);