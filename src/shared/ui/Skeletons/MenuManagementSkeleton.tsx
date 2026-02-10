"use client";
import { 
  Box, 
  Container, 
  Grid, 
  Stack, 
  Skeleton, 
  Paper, 
  useTheme,
  alpha 
} from "@mui/material";

export const MenuManagementSkeleton = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}> {/* استخدمنا xl ليعطي مساحة للـ 4 كروت */}
      
      {/* 1. Header Skeleton */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'flex-start', sm: 'center' }} 
        spacing={2} 
        mb={6}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton variant="rounded" width={48} height={48} sx={{ borderRadius: 2.5 }} />
          <Box>
            <Skeleton variant="text" width="160px" height={30} sx={{ borderRadius: 1 }} />
            <Skeleton variant="text" width="220px" height={20} sx={{ opacity: 0.5 }} />
          </Box>
        </Stack>
        <Skeleton variant="rounded" width={130} height={42} sx={{ borderRadius: 2 }} />
      </Stack>

      {/* 2. Filters Skeleton (Select + Search) */}
      <Stack direction="row" spacing={2} mb={5} alignItems="center">
        {/* Search Bar Skeleton */}
        <Skeleton variant="rounded" width="100%" height={45} sx={{ borderRadius: 3, maxWidth: 1000 }} />
        
        {/* Select Category Skeleton */}
        <Skeleton variant="rounded" width={180} height={45} sx={{ borderRadius: 3 }} />
        
        <Box sx={{ flexGrow: 1 }} />
        
        {/* Settings Icon Skeleton */}
        <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: 2.5 }} />
      </Stack>

      {/* 3. Dishes Grid Skeleton (4 Columns Layout) */}
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Grid size={{xs:12,sm:6,md:4,lg:3}} key={i}> {/* lg: 3 تعني 4 كروت في الصف */}
            <Paper 
              elevation={0}
              sx={{ 
                width: "100%", 
                borderRadius: 1, 
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              {/* Image Skeleton */}
              <Skeleton 
                variant="rectangular" 
                height={160} // قللنا الارتفاع قليلاً ليتناسب مع 4 كروت
                animation="wave" 
                sx={{ bgcolor: alpha(theme.palette.action.hover, 0.05) }} 
              />

              {/* Content Skeleton */}
              <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" mb={1.5}>
                  <Skeleton variant="text" width="60%" height={22} />
                  <Skeleton variant="text" width="30px" height={20} />
                </Stack>
                
                <Skeleton variant="text" width="90%" height={14} />
                <Skeleton variant="text" width="70%" height={14} sx={{ mb: 2.5 }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Skeleton variant="rounded" width={60} height={20} sx={{ borderRadius: 1 }} />
                  <Stack direction="row" spacing={1}>
                    <Skeleton variant="circular" width={28} height={28} />
                    <Skeleton variant="circular" width={28} height={28} />
                  </Stack>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};