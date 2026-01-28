import { Box, Container, Grid, Skeleton, Stack } from "@mui/material";

export const LandingPageSkeleton = () => {
  return (
    <Box sx={{ width: "100%" }}>
      {/* 1. Hero Section Skeleton */}
      <Box sx={{ minHeight: "90vh", display: "flex", alignItems: "center", bgcolor: "#f0f0f0" }}>
        <Container maxWidth="md">
          <Skeleton variant="text" width="80%" height={80} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="60%" height={40} sx={{ mb: 4 }} />
          <Skeleton variant="rectangular" width={160} height={50} sx={{ borderRadius: 3 }} />
        </Container>
      </Box>

      {/* 2. How It Works Section Skeleton */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Stack alignItems="center" spacing={2} mb={8}>
          <Skeleton variant="text" width="300px" height={50} />
          <Skeleton variant="text" width="500px" height={30} />
        </Stack>
        
        <Grid container spacing={4}>
          {[1, 2, 3].map((i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Stack alignItems="center" spacing={2}>
                <Skeleton variant="circular" width={80} height={80} />
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="90%" height={60} />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 3. Role Selection Skeleton */}
      <Box sx={{ py: 10, bgcolor: "#fafafa" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <Skeleton variant="text" width="200px" height={50} />
          </Box>
          <Grid container spacing={4}>
            {[1, 2].map((i) => (
              <Grid size={{ xs: 12, md: 6 }} key={i}>
                <Box sx={{ p: 5, border: '1px solid #eee', borderRadius: 4, bgcolor: 'white' }}>
                  <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
                  <Skeleton variant="text" width="90%" height={60} sx={{ mb: 4 }} />
                  <Skeleton variant="rectangular" width="100%" height={45} sx={{ borderRadius: 2 }} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. CTA Section Skeleton */}
      <Box sx={{ py: 10, textAlign: "center", bgcolor: "#eee" }}>
        <Container maxWidth="sm">
          <Stack alignItems="center" spacing={3}>
            <Skeleton variant="text" width="250px" height={50} />
            <Skeleton variant="rectangular" width={180} height={50} sx={{ borderRadius: 2 }} />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};