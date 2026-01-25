import { 
  Box, 
  Container, 
  Grid, 
  Stack, 
  Skeleton, 
  Paper, 
  Divider 
} from "@mui/material";

export const MenuManagementSkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 1. Header Skeleton */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box sx={{ width: '100%' }}>
          <Skeleton variant="text" width="200px" height={40} sx={{ borderRadius: 1 }} />
          <Skeleton variant="text" width="150px" height={25} sx={{ opacity: 0.6 }} />
        </Box>
        {/* Add Button Skeleton */}
        <Skeleton variant="rounded" width={120} height={40} sx={{ borderRadius: '12px' }} />
      </Stack>

      {/* 2. Tabs Skeleton */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ pb: 1 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} variant="rounded" width={80} height={35} sx={{ borderRadius: '20px' }} />
          ))}
          <Box sx={{ flexGrow: 1 }} />
          {/* Settings Icon Skeleton */}
          <Skeleton variant="circular" width={32} height={32} />
        </Stack>
      </Box>

      {/* 3. Dishes Grid Skeleton */}
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Grid item xs={12} sm={6} md={4} key={i} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Paper 
              elevation={0}
              sx={{ 
                width: "290px", // نفس عرض الكارد الحقيقي
                borderRadius: '20px', 
                overflow: 'hidden',
                border: '1px solid #eee',
              }}
            >
              {/* Image Skeleton */}
              <Skeleton variant="rectangular" height={220} animation="wave" />

              {/* Content Skeleton */}
              <Box sx={{ p: 3 }}>
                <Skeleton variant="text" width="70%" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="85%" height={20} sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                    <Skeleton variant="rounded" width="50%" height={35} sx={{ borderRadius: '10px' }} />
                    <Skeleton variant="rounded" width="50%" height={35} sx={{ borderRadius: '10px' }} />
                  </Stack>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};