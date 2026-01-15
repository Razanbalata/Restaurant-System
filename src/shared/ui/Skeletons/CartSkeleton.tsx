// shared/ui/Skeletons/CartSkeleton.tsx
import { Box, Skeleton, Stack } from "@mui/material";
import { AppCard } from "@/shared/ui/Card/AppCard";

export const CartSkeleton = () => (
  <Box 
    sx={{ 
      p: { xs: 2, md: 4 }, 
      maxWidth: 1200, 
      mx: "auto",
      width: "100%"
    }}
  >
    {/* عنوان الصفحة السكلتون */}
    <Skeleton 
      variant="text" 
      width={250} 
      height={60} 
      sx={{ mb: 6, mx: 'auto', borderRadius: 2 }} 
    />

    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", md: "row" }, 
        gap: 4, 
        justifyContent: "center",
        alignItems: "flex-start"
      }}
    >
      {/* قائمة المنتجات السكلتون */}
      <Box sx={{ flex: 2, width: "100%" }}>
        <Stack spacing={2}>
          {[1, 2, 3].map((i) => (
            <AppCard key={i}>
              <Stack direction="row" spacing={2} alignItems="center">
                {/* صورة المنتج */}
                <Skeleton 
                  variant="rectangular" 
                  width={80} 
                  height={80} 
                  sx={{ borderRadius: 3 }} 
                />
                
                {/* نصوص المنتج */}
                <Box sx={{ flex: 1 }}>
                  <Skeleton width="50%" height={25} sx={{ mb: 1 }} />
                  <Skeleton width="30%" height={20} />
                </Box>

                {/* أزرار التحكم */}
                <Stack alignItems="flex-end" spacing={1}>
                   <Skeleton variant="rectangular" width={100} height={35} sx={{ borderRadius: 2 }} />
                   <Skeleton variant="circular" width={30} height={30} />
                </Stack>
              </Stack>
            </AppCard>
          ))}
        </Stack>
      </Box>

      {/* ملخص الطلب السكلتون */}
      <Box sx={{ flex: 1, width: "100%" }}>
        <AppCard>
          <Skeleton variant="text" width="60%" height={35} sx={{ mb: 3 }} />
          <Stack spacing={2}>
            <Box display="flex" justifyContent="space-between">
              <Skeleton width="40%" />
              <Skeleton width="20%" />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Skeleton width="40%" />
              <Skeleton width="20%" />
            </Box>
            <Skeleton variant="rectangular" height={1} sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between">
              <Skeleton width="30%" height={30} />
              <Skeleton width="30%" height={30} />
            </Box>
            <Skeleton 
              variant="rectangular" 
              height={50} 
              sx={{ mt: 2, borderRadius: 3 }} 
            />
          </Stack>
        </AppCard>
      </Box>
    </Box>
  </Box>
);