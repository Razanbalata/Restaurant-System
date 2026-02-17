"use client";
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  useTheme,
  alpha,
  CardContent,
  CardMedia,
  Card,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenuRounded";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// المكونات التي قمنا بتطويرها
import { RestaurantInfoCard } from "./RestaurantCard";
import { RestaurantDetailSkeleton } from "@/shared/ui/Skeletons/RestaurantDetailSkeleton";

// Hooks
import { useRestaurantById } from "@/features/(admin)/restaurant/get-restaurants/api/useRestaurantById";
import { useMenu } from "@/features/(customer)/menu/get-menu/useMenu";
import { useMe } from "@/features/user/api/use-me";

export default function RestaurantDetailPage() {
  const params = useParams();
  const theme = useTheme();
  const router = useRouter();
  const restaurantId = params.id as string;

  // 1. جلب بيانات المستخدم الحالي وصلاحياته
  const { data: user } = useMe();

  // 2. جلب بيانات المطعم (Source of Truth)
  const { data: restaurant, isLoading: isRestaurantLoading } =
    useRestaurantById(restaurantId);

  // 3. جلب المنيو
  const { data: menuData = [], isLoading: isMenuLoading } =
    useMenu(restaurantId);

  const previewItems = menuData.slice(0, 4);
  console.log(previewItems)

  // 4. التحقق من الملكية
  const isOwner =
    user?.role === "restaurant_owner" && restaurant?.owner_id === user.id;

  if (isRestaurantLoading || isMenuLoading) {
    return <RestaurantDetailSkeleton />;
  }

  // ==== حالة المالك الجديد بدون أي مطاعم ====
  if (!restaurant && user?.role === "restaurant_owner") {
    return <NoRestaurantHero userName={user.name} />;
  }

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      {/* عرض بيانات المطعم الأساسية (الهيدر والبطاقة العائمة) */}
      <RestaurantInfoCard restaurant={restaurant} isOwner={isOwner} />

      <Container maxWidth="lg" sx={{ mt: 6, pb: 10 }}>
        <Stack spacing={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" fontWeight={900} color="text.primary">
              Menu
            </Typography>
            {isOwner && (
              //  <Button
              //   variant="outlined"
              //   startIcon={<AutoAwesomeIcon />}
              //   sx={{ borderRadius: '12px', fontWeight: 700 }}
              //  >
              //    تحديث بواسطة AI
              //  </Button>
              <GenerateMenuButton restaurantId={restaurantId} />
            )}
          </Stack>

          {menuData.length === 0 ? (
            // حالة عدم وجود منيو
            <Paper
              sx={{
                p: 8,
                textAlign: "center",
                borderRadius: "32px",
                border: `2px dashed ${theme.palette.divider}`,
                bgcolor: alpha(theme.palette.background.paper, 0.5),
              }}
            >
              <RestaurantMenuIcon
                sx={{
                  fontSize: 80,
                  color: theme.palette.primary.main,
                  mb: 2,
                  opacity: 0.3,
                }}
              />
              <Typography variant="h5" fontWeight={800} gutterBottom>
                Menu Under Preparation 👨‍🍳
              </Typography>
              <Typography color="text.secondary" mb={3}>
                The restaurant hasn't added items yet, wait for us soon!
              </Typography>
              {isOwner && (
                // <Button variant="contained" size="large" sx={{ borderRadius: '14px', px: 4 }}>
                //   إضافة أول صنف الآن
                // </Button>
                <MenuItemMutationButton
                  mode="add"
                  restaurantId={restaurantId}
                />
              )}
            </Paper>
          ) : (
            // عرض المنيو في حال وجود بيانات
            <Grid container spacing={3}>
  {previewItems.map((item: any, index: number) => {
    // تحديد الصورة: إذا كان هناك رابط صورة صالح نستخدمه، وإلا نستخدم getSmartImage
    const displayImage = (item.image_url || item.image) 
      ? getSmartImage(item.name, item.image_url || item.image) 
      : getSmartImage(item.name);

    return (
      <Grid size={{xs:12,md:6}} key={item.id || index}>
        <Card
          elevation={0}
          onClick={() => router.push(`/shared/menu`)}
          sx={{
            display: "flex",
            height: 110, // ارتفاع ثابت لتوحيد شكل الكروت
            borderRadius: "20px",
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            transition: "all 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.05)}`,
              borderColor: theme.palette.primary.main,
            },
          }}
        >
          {/* عرض الصورة باستخدام MUI CardMedia بشرط وجود مصدر */}
          <CardMedia
            component="img"
            sx={{
              width: 110,
              height: "100%",
              objectFit: "cover",
            }}
            // التوجيه الشرطي للمصدر
            image={displayImage}
            alt={item.name}
          />

          <Box sx={{ display: "flex", flexDirection: "column", flex: 1, overflow: 'hidden' }}>
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography 
                  variant="subtitle1" 
                  fontWeight={800} 
                  noWrap 
                  sx={{ flex: 1 }}
                >
                  {item.name}
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  fontWeight={900} 
                  color="primary.main"
                  sx={{ ml: 1, whiteSpace: 'nowrap' }}
                >
                  ${item.price}
                </Typography>
              </Stack>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1, // سطر واحد في المعاينة ليبقى الشكل نظيفاً
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  mt: 0.5,
                }}
              >
                {item.description || "Fresh and delicious, prepared daily."}
              </Typography>
              
              {/* وسم التصنيف كـ Conditional Rendering إضافي */}
              {item.category && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    mt: 1, 
                    display: 'block',
                    color: 'primary.main',
                    fontWeight: 600,
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                    letterSpacing: 1
                  }}
                >
                  {item.category}
                </Typography>
              )}
            </CardContent>
          </Box>
        </Card>
      </Grid>
    );
  })}
</Grid>
          )}
          {menuData.length > 4 && (
  <Box textAlign="center" mt={4}>
    <Button
      variant="contained"
      size="large"
      onClick={() => router.push(`/shared/menu`)}
      sx={{
        borderRadius: "14px",
        px: 5,
        fontWeight: 700,
      }}
    >
      View Full Menu →
    </Button>
  </Box>
)}

        </Stack>
      </Container>
    </Box>
  );
}

// مكون Stack صغير للتنظيم إذا لم يكن مستورداً
import { Stack } from "@mui/material";
import { MenuItemMutationButton } from "@/features/(admin)/menu/ui/MenuItemMutationButton";
import GenerateMenuButton from "@/features/(admin)/menu/ui/GenerateMenuButton";
import { NoRestaurantHero } from "./NoRestaurantHero";import { getSmartImage } from "@/shared/config/food-images";

