import { Box, Card, Skeleton, Stack, Divider, alpha, useTheme } from "@mui/material";

export const OrderCardSkeleton = () => {
  const theme = useTheme();

  return (
    <Card 
      elevation={0}
      sx={{ 
        mb: 3, 
        p: 0, // ليتناسب مع CardHeader في الكارت الأصلي
        borderRadius: 3, 
        border: "1px solid",
        borderColor: theme.palette.divider,
      }}
    >
      {/* Header Skeleton */}
      <Box sx={{ p: 2, pb: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}` }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1.5} alignItems="center">
            {/* رقم الطلب */}
            <Skeleton variant="text" width={60} height={32} sx={{ borderRadius: 1 }} />
            {/* حالة الطلب (Chip) */}
            <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 1.5 }} />
          </Stack>
          {/* وقت الطلب */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Skeleton variant="circular" width={14} height={14} />
            <Skeleton variant="text" width={50} height={20} />
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ p: 2.5 }}>
        <Stack spacing={3}>
          
          {/* Customer Info Box Skeleton */}
          <Box 
            sx={{ 
              p: 2, 
              bgcolor: alpha(theme.palette.action.hover, 0.4), 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Skeleton variant="circular" width={40} height={40} />
              <Box flex={1}>
                <Skeleton variant="text" width="40%" height={24} />
                <Stack direction="row" spacing={1}>
                  <Skeleton variant="text" width="30%" height={18} />
                  <Skeleton variant="text" width="30%" height={18} />
                </Stack>
              </Box>
              <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: 1 }} />
            </Stack>
          </Box>

          {/* Items List Skeleton */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <Skeleton variant="circular" width={18} height={18} />
              <Skeleton variant="text" width={100} height={24} />
            </Stack>
            
            <Stack spacing={1}>
              {[1, 2].map((i) => (
                <Stack 
                  key={i} 
                  direction="row" 
                  justifyContent="space-between" 
                  alignItems="center"
                  sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box flex={1}>
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="30%" height={16} />
                  </Box>
                  <Skeleton variant="text" width={40} height={24} />
                </Stack>
              ))}
            </Stack>
          </Box>

          <Divider sx={{ borderStyle: 'dashed', opacity: 0.6 }} />

          {/* Footer Skeleton */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <Box>
              <Skeleton variant="text" width={80} height={16} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width={100} height={40} />
            </Box>
            <Stack direction="row" spacing={1}>
              <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rectangular" width={140} height={40} sx={{ borderRadius: 2 }} />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
};