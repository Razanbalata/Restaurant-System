import { Box, Card, Skeleton, Stack, Divider, alpha, useTheme, CardContent } from "@mui/material";

export const OrderCardSkeleton = () => {
  const theme = useTheme();

  return (
    <Stack spacing={4} sx={{ width: '100%' }}>
      
      {/* 1. Header Skeleton (العنوان والوصف) */}
      <Stack spacing={1}>
        <Skeleton variant="text" width={180} height={48} sx={{ borderRadius: 1 }} />
        <Skeleton variant="text" width={300} height={24} sx={{ opacity: 0.6 }} />
      </Stack>

      {/* 2. Stats Cards Skeleton (كروت الإحصائيات العلوية) */}
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} sx={{ borderRadius: 2, border: `1px solid ${theme.palette.divider}`, elevation: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
              {/* الشريط الملون الجانبي */}
              <Skeleton variant="rectangular" width={8} height={48} sx={{ borderRadius: 1 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="30%" height={32} sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width="60%" height={20} />
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      {/* 3. Order List Skeleton (قائمة الطلبات) */}
      <Stack spacing={2}>
        {/* عنوان فرعي صغير لقسم الطلبات */}
        <Skeleton variant="text" width={120} height={25} sx={{ mb: 1 }} />
        
        {[1, 2].map((i) => (
          <Card 
            key={i}
            elevation={0}
            sx={{ 
              borderRadius: 3, 
              border: "1px solid",
              borderColor: theme.palette.divider,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            {/* كرت الطلب - الهيدر */}
            <Box sx={{ p: 2, pb: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}` }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Skeleton variant="text" width={70} height={30} />
                  <Skeleton variant="rounded" width={90} height={24} sx={{ borderRadius: 1.5 }} />
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Skeleton variant="circular" width={14} height={14} />
                  <Skeleton variant="text" width={50} height={20} />
                </Stack>
              </Stack>
            </Box>

            {/* كرت الطلب - المحتوى */}
            <Box sx={{ p: 2.5 }}>
              <Stack spacing={3}>
                {/* معلومات العميل */}
                <Box sx={{ p: 2, bgcolor: alpha(theme.palette.background.default, 0.4), borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box flex={1}>
                      <Skeleton variant="text" width="40%" height={24} />
                      <Skeleton variant="text" width="30%" height={16} />
                    </Box>
                  </Stack>
                </Box>

                {/* تفاصيل الأصناف */}
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
                    <Skeleton variant="circular" width={18} height={18} />
                    <Skeleton variant="text" width={100} height={24} />
                  </Stack>
                  <Stack spacing={1}>
                    {[1, 2].map((item) => (
                      <Stack key={item} direction="row" justifyContent="space-between" sx={{ p: 1.5, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
                        <Box flex={1}>
                          <Skeleton variant="text" width="50%" height={20} />
                          <Skeleton variant="text" width="20%" height={16} />
                        </Box>
                        <Skeleton variant="text" width={50} height={24} />
                      </Stack>
                    ))}
                  </Stack>
                </Box>

                <Divider sx={{ opacity: 0.6 }} />

                {/* أسفل الكرت - السعر والأزرار */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <Box>
                    <Skeleton variant="text" width={100} height={16} />
                    <Skeleton variant="text" width={80} height={40} />
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Skeleton variant="rectangular" width={85} height={40} sx={{ borderRadius: 2 }} />
                    <Skeleton variant="rectangular" width={160} height={42} sx={{ borderRadius: 2 }} />
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};