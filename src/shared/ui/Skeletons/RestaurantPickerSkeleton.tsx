import {
  Box,
  Skeleton,
  Card,
  CardContent,
  Stack,
  useTheme
} from "@mui/material";

export const RestaurantPickerSkeleton = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', py: 4 }}>
      
      {/* Header Skeleton */}
      <Box sx={{ mb: 5, px: 1 }}>
        <Skeleton variant="text" width="280px" height={60} sx={{ borderRadius: 2 }} />
        <Skeleton variant="text" width="40%" height={30} sx={{ opacity: 0.5 }} />
      </Box>

      {/* Dynamic Grid System */}
      <Box
        sx={{
          display: 'grid',
          // 'repeat(auto-fill, minmax(280px, 1fr))' 
          // هاي الجوهرة: بتخلي الكارد أقل عرض لها 280px وأي مساحة زيادة بتتوزع بالتساوي
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 3, // المسافة بين الكروت
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Card 
            key={item}
            sx={{ 
              borderRadius: 1,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: "none",
              overflow: "hidden",
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* الصورة - نسبة أبعاد ثابتة 16/9 لتكون احترافية */}
            <Box sx={{ width: '100%', pt: '56.25%', position: 'relative' }}>
               <Skeleton 
                variant="rectangular" 
                animation="wave"
                sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </Box>
            
            <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton variant="text" width="70%" height={28} />
                  <Skeleton variant="circular" width={20} height={20} />
                </Box>

                <Skeleton variant="text" width="50%" height={20} />

                <Box sx={{ pt: 2, borderTop: `1px solid ${theme.palette.divider}`, mt: 'auto' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Skeleton variant="text" width="40%" height={20} />
                    <Skeleton variant="circular" width={24} height={24} />
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};