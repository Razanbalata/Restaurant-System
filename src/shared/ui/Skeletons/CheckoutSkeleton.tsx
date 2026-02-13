import { Box, Container, Stack, Skeleton, Divider } from "@mui/material";
import { AppCard } from "@/shared/ui/Card/AppCard";

export function CheckoutSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Skeleton variant="text" width={200} height={60} sx={{ mb: 4 }} />
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        <Box sx={{ flex: 1.8, width: "100%" }}>
          <AppCard sx={{ p: 5, borderRadius: '32px' }}>
            <Skeleton variant="text" width="40%" height={40} sx={{ mb: 4 }} />
            <Stack spacing={4}>
              <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: '16px' }} />
              <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: '16px' }} />
              <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: '16px' }} />
            </Stack>
          </AppCard>
        </Box>
        <Box sx={{ flex: 1, width: "100%" }}>
          <AppCard sx={{ p: 4, borderRadius: '32px' }}>
            <Skeleton variant="text" width="60%" height={35} sx={{ mb: 3 }} />
            {[1, 2].map((i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="text" width="20%" />
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: '16px' }} />
          </AppCard>
        </Box>
      </Stack>
    </Container>
  );
}