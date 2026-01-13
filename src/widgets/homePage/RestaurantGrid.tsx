"use client";
import React from "react";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  Skeleton,
  Box,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import { Star, AccessTime, LocationOn } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const RestaurantList = ({ restaurants, isLoading }: any) => {
  const router = useRouter();

  // 1️⃣ تصميم الـ Skeleton ليطابق الكرت الحقيقي تماماً
  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Box sx={{ borderRadius: "24px", overflow: "hidden" }}>
                <Skeleton variant="rectangular" height={220} sx={{ borderRadius: "24px" }} />
                <Box sx={{ p: 2, mt: -3, mx: 1, bgcolor: "white", borderRadius: "20px" }}>
                  <Skeleton variant="text" width="60%" height={30} />
                  <Skeleton variant="text" width="40%" height={20} />
                  <Divider sx={{ my: 1 }} />
                  <Stack direction="row" justifyContent="space-between">
                    <Skeleton variant="text" width="30%" />
                    <Skeleton variant="rounded" width={60} height={20} />
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  // 2️⃣ حالة عدم وجود مطاعم
  if (!restaurants || restaurants.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h5" fontWeight="bold" color="textSecondary">
          لم نجد مطاعم في هذه المدينة حالياً 😕
        </Typography>
        <Typography color="textSecondary">جرب البحث عن مدينة أخرى</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mb: 8 }}>
      <Grid container spacing={4}>
        {restaurants.map((res: any) => (
          <Grid 
            item xs={12} sm={6} md={4} 
            key={res.id} 
            onClick={() => router.push(`/restaurant/${res.id}`)}
          >
            <Card
              elevation={0}
              sx={{
                borderRadius: "24px",
                bgcolor: "transparent",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                "&:hover": {
                  "& .restaurant-image": { transform: "scale(1.1)" },
                  "& .card-content": {
                    transform: "translateY(-12px)",
                    boxShadow: "0 22px 45px rgba(0,0,0,0.08)",
                  }
                },
              }}
            >
              {/* حاوية الصورة المتميزة */}
              <Box sx={{ position: "relative", height: 220, overflow: "hidden", borderRadius: "24px", zIndex: 1 }}>
                <Box
                  className="restaurant-image"
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transition: "transform 0.6s ease",
                  }}
                >
                  <Image
                    src={res.image_url}
                    alt={res.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </Box>
                
                {/* Badge التوصيل المجاني */}
                <Chip
                  label="توصيل مجاني"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16, // لليسار في حال كان التطبيق يدعم العربي
                    bgcolor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(4px)",
                    fontWeight: "900",
                    color: "#1b5e20",
                    fontSize: "0.7rem"
                  }}
                />
              </Box>

              {/* محتوى الكرت العصري */}
              <CardContent 
                className="card-content"
                sx={{ 
                  p: 2.5, 
                  mt: -4, 
                  mx: 1.5,
                  position: "relative", 
                  zIndex: 2,
                  bgcolor: "white",
                  borderRadius: "22px",
                  transition: "all 0.4s ease",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.04)"
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1.05rem", lineHeight: 1.2 }}>
                    {res.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#FFF9E1", px: 0.8, py: 0.2, borderRadius: "6px" }}>
                    <Star sx={{ color: "#FFB400", fontSize: "14px", mr: 0.3 }} />
                    <Typography variant="caption" sx={{ fontWeight: "800", color: "#7A5C00" }}>4.8</Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: "#666", mb: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    {res.category || "مطعم"}
                  </Typography>
                  <Typography variant="caption">•</Typography>
                  <LocationOn sx={{ fontSize: 12 }} />
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    {res.city}
                  </Typography>
                </Stack>

                <Divider sx={{ mb: 2, borderStyle: "dashed" }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box sx={{ display: "flex", alignItems: "center", color: "#444" }}>
                    <AccessTime sx={{ fontSize: "16px", mr: 0.5, color: "#1976d2" }} />
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      30-45 دقيقة
                    </Typography>
                  </Box>
                  
                  <Box
                    sx={{ 
                      bgcolor: "#E8F5E9", 
                      color: "#2E7D32", 
                      px: 1.5, 
                      py: 0.4, 
                      borderRadius: "8px",
                      fontSize: "0.7rem",
                      fontWeight: 800
                    }}
                  >
                    مفتوح
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};