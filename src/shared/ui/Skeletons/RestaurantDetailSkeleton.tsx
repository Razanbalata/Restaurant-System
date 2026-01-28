import {
  Box,
  Container,
  Paper,
  Stack,
  Skeleton,
  Divider,
  Grid
} from "@mui/material";

export const RestaurantDetailSkeleton = () => {
  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* 1. Banner Skeleton */}
      <Skeleton 
        variant="rectangular" 
        animation="wave"
        sx={{ 
          height: 260, 
          borderRadius: "0 0 32px 32px" 
        }} 
      />

      {/* 2. Floating Info Card Skeleton */}
      <Container maxWidth="lg" sx={{ mt: "-120px", position: "relative", zIndex: 2 }}>
        <Paper
          elevation={0}
          sx={{
            mx: { xs: 2, md: 4 },
            p: { xs: 3, md: 5 },
            borderRadius: "32px",
            boxShadow: "0 30px 60px rgba(0,0,0,0.05)",
          }}
        >
          <Stack spacing={4}>
            {/* Header Section: Avatar + Name + Rating */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center">
              {/* Avatar Skeleton */}
              <Skeleton 
                variant="circular" 
                width={96} 
                height={96} 
                sx={{ border: "6px solid white" }} 
              />
              
              <Box sx={{ flex: 1, width: '100%' }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Skeleton variant="text" width="40%" height={50} />
                  <Skeleton variant="circular" width={24} height={24} />
                </Stack>
                <Stack direction="row" spacing={2} mt={1}>
                  <Skeleton variant="rounded" width={80} height={24} />
                  <Skeleton variant="rounded" width={100} height={24} />
                </Stack>
              </Box>

              {/* View Menu Button Skeleton (For Customer) */}
              <Skeleton variant="rounded" width={140} height={45} sx={{ borderRadius: "14px" }} />
            </Stack>

            <Divider />

            {/* Info Grid (Location, Time, Status) */}
            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
              gap={3}
            >
              {[1, 2, 3].map((i) => (
                <Box key={i}>
                  <Skeleton variant="text" width="40%" height={20} />
                  <Stack direction="row" spacing={1} mt={1} alignItems="center">
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton variant="text" width="70%" height={25} />
                  </Stack>
                </Box>
              ))}
            </Box>

            {/* About Section Skeleton */}
            <Box sx={{ bgcolor: "#F7F8FA", p: 3, borderRadius: "20px" }}>
              <Skeleton variant="text" width="150px" height={30} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="70%" />
            </Box>
          </Stack>
        </Paper>

        {/* 3. Menu Section Header Skeleton */}
        <Box sx={{ mt: 6, pb: 10, px: { xs: 2, md: 4 } }}>
           <Skeleton variant="text" width="200px" height={50} sx={{ mb: 4 }} />
           
           <Grid container spacing={3}>
              {[1, 2, 3, 4].map((item) => (
                <Grid size={{ xs: 12, md: 6 }} key={item}>
                   <Skeleton 
                    variant="rectangular" 
                    height={140} 
                    sx={{ borderRadius: "24px" }} 
                   />
                </Grid>
              ))}
           </Grid>
        </Box>
      </Container>
    </Box>
  );
};