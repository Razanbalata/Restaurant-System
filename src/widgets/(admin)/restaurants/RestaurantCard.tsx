import {
  Paper,
  Stack,
  Typography,
  Rating,
  Divider,
  Chip,
  Box,
  CardActions,
  Avatar,
  Button,
} from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import MutationButton from "@/features/(admin)/restaurant/mutations-restaurant/ui/MutationButton";
import DeleteRestaurantBtn from "@/features/(admin)/restaurant/delete-restaurant/ui/DeleteRestaurantBtn";

export const RestaurantInfoCard = ({ restaurant }) => {
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      {/* 1. الـ Banner العلوي - يعطي طابع الفخامة */}
      <Box
        sx={{
          height: 220,
          borderRadius: "32px 32px 0 0",
          background: "linear-gradient(45deg, #FF5B22 30%, #FF9130 90%)", // أو صورة المطعم
          position: "relative",
          mb: "-60px", // لسحب الكارد للأعلى
        }}
      />

      {/* 2. كارد المعلومات الأساسي */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          mx: { xs: 2, md: 4 },
          borderRadius: "32px",
          bgcolor: "background.paper",
          boxShadow: "0 25px 50px rgba(0,0,0,0.06)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* أزرار الإدارة في زاوية علوية مستقلة */}
        <Box sx={{ position: "absolute", top: 24, right: 24 }}>
          <CardActions sx={{ gap: 1.5, p: 0 }}>
            <Box sx={{width:"100px"}}><MutationButton mode="edit" restaurant={restaurant} /></Box>
            <DeleteRestaurantBtn r={restaurant} />
          </CardActions>
        </Box>

        <Stack spacing={4}>
          <Box>
            {/* اللوغو أو الحرف الأول من المطعم */}
            <Avatar 
              sx={{ 
                width: 90, height: 90, mt: -10, border: "6px solid white", 
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)", bgcolor: "#1A1C1E",
                fontSize: "2rem", fontWeight: "bold"
              }}
            >
              {restaurant.name?.charAt(0)}
            </Avatar>

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 3 }}>
              <Typography
                variant="h3"
                fontWeight="950"
                sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, letterSpacing: "-1px" }}
              >
                {restaurant.name}
              </Typography>
              <VerifiedRoundedIcon color="primary" sx={{ fontSize: 28 }} />
            </Stack>

            {/* تفاصيل سريعة تحت الاسم مباشرة */}
            <Stack direction="row" spacing={2} sx={{ mt: 1, alignItems: "center" }}>
              <Chip label={restaurant.category} size="small" sx={{ fontWeight: 700, bgcolor: "#f0f0f0" }} />
              <Box display="flex" alignItems="center" gap={0.5}>
                <Rating value={4.8} readOnly size="small" precision={0.5} />
                <Typography variant="body2" fontWeight="800">4.8</Typography>
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* شبكة المعلومات (Info Grid) */}
          <Box 
            display="grid" 
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr 1fr" }} 
            gap={4}
          >
            <Box>
              <Typography color="text.secondary" variant="caption" fontWeight="bold" sx={{ textTransform: "uppercase" }}>
                الموقع الحالي
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <LocationOnRoundedIcon color="primary" />
                <Typography variant="body1" fontWeight="600">{restaurant.city}, {restaurant.country}</Typography>
              </Stack>
            </Box>

            <Box>
              <Typography color="text.secondary" variant="caption" fontWeight="bold" sx={{ textTransform: "uppercase" }}>
                وقت التجهيز المتوقع
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <AccessTimeRoundedIcon color="primary" />
                <Typography variant="body1" fontWeight="600">30-45 دقيقة</Typography>
              </Stack>
            </Box>

            <Box>
              <Typography color="text.secondary" variant="caption" fontWeight="bold" sx={{ textTransform: "uppercase" }}>
                حالة المتجر
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#4CAF50", mt: 0.8 }} />
                <Typography variant="body1" fontWeight="600">نشط الآن</Typography>
              </Stack>
            </Box>
          </Box>

          <Box sx={{ bgcolor: "#F8F9FB", p: 3, borderRadius: "20px" }}>
            <Typography variant="subtitle2" fontWeight="800" gutterBottom>
              وصف المنشأة
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {restaurant.description || "هذا المطعم يقدم أفضل الوجبات السريعة بجودة عالية وأسعار منافسة."}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};