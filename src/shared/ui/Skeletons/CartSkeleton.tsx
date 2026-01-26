"use client";

import { 
  Box, 
  Stack, 
  Skeleton, 
  Divider, 
  useTheme, 
  alpha 
} from "@mui/material";
import { AppCard } from "@/shared/ui/Card/AppCard";

export function CartSkeleton() {
  const theme = useTheme();

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      maxWidth: 1200, 
      mx: "auto",
      // إضافة خلفية بسيطة جداً تتبع الثيم لتعزيز تجربة المستخدم أثناء التحميل
      bgcolor: "transparent" 
    }}>
      
      {/* عنوان الصفحة - مركز */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
        <Skeleton 
          variant="text" 
          width="200px" 
          height={60} 
          sx={{ bgcolor: alpha(theme.palette.text.primary, 0.05) }} 
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* الجزء الخاص بالمنتجات - Products List Skeleton */}
        <Box sx={{ flex: 2, width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
          {[1, 2, 3].map((i) => (
            <AppCard 
              key={i} 
              sx={{ 
                width: "100%",
                borderColor: alpha(theme.palette.divider, 0.5), // ربط حدود الكارت بالثيم
                bgcolor: theme.palette.background.paper
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Box display="flex" alignItems="center" gap={2} sx={{ width: '100%' }}>
                  {/* صورة المنتج - استخدام borderRadius من الثيم */}
                  <Skeleton 
                    variant="rectangular" 
                    width={80} 
                    height={80} 
                    sx={{ 
                      borderRadius: theme.shape.borderRadius,
                      bgcolor: alpha(theme.palette.action.hover, 0.1) 
                    }} 
                  />
                  
                  {/* نصوص المنتج */}
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="60%" height={25} />
                    <Skeleton variant="text" width="30%" height={20} />
                  </Box>
                </Box>

                {/* أزرار التحكم - ربط الحواف بالثيم */}
                <Skeleton 
                  variant="rounded" 
                  width={120} 
                  height={40} 
                  sx={{ 
                    borderRadius: `${theme.shape.borderRadius * 2}px`,
                    bgcolor: alpha(theme.palette.primary.main, 0.05) // تلميح خفيف بلون البراند
                  }} 
                />
              </Stack>
            </AppCard>
          ))}
        </Box>

        {/* الجزء الخاص بالملخص - Summary Skeleton */}
        <Box sx={{ flex: 1, width: "100%" }}>
          <AppCard sx={{ bgcolor: theme.palette.background.paper }}>
            <Skeleton variant="text" width="50%" height={30} sx={{ mb: 3 }} />
            
            <Stack spacing={2}>
              <Box display="flex" justifyContent="space-between">
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="20%" />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Skeleton variant="text" width="30%" />
                <Skeleton variant="text" width="20%" />
              </Box>
              
              <Divider sx={{ my: 1, borderColor: alpha(theme.palette.divider, 0.8) }} />
              
              <Box display="flex" justifyContent="space-between">
                <Skeleton variant="text" width="40%" height={40} />
                <Skeleton variant="text" width="30%" height={40} />
              </Box>

              {/* زر تأكيد الطلب - استخدام لون البراند خفيف جداً لإعطاء انطباع بمكان الزر الرئيسي */}
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height={48} 
                sx={{ 
                  borderRadius: theme.shape.borderRadius, 
                  mt: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.1)
                }} 
              />
            </Stack>
          </AppCard>
        </Box>
      </Box>
    </Box>
  );
}