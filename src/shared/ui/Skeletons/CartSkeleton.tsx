"use client";

import { 
  Box, 
  Stack, 
  Skeleton, 
  Divider, 
  useTheme, 
  alpha, 
  Container 
} from "@mui/material";
import { AppCard } from "@/shared/ui/Card/AppCard";

export function CartSkeleton() {
  const theme = useTheme();

  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default, 
      minHeight: "100vh", 
      py: { xs: 4, md: 8 } 
    }}>
      <Container maxWidth="lg">
        {/* عنوان الصفحة - Skeleton يحاكي النص الضخم */}
        <Stack direction="row" alignItems="center" spacing={2} mb={6} justifyContent={{ xs: 'center', md: 'flex-start' }}>
          <Skeleton variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
          <Skeleton variant="text" width={250} height={60} />
        </Stack>

        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, 
          gap: 4, 
          alignItems: "flex-start" 
        }}>
          
          {/* قائمة المنتجات - Products List */}
          <Stack spacing={2.5} sx={{ flex: 2, width: "100%" }}>
            {[1, 2, 3].map((i) => (
              <AppCard key={i} sx={{ 
                p: 2.5, 
                borderRadius: '24px',
                border: `1px solid ${alpha(theme.palette.divider, 0.05)}`
              }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  {/* محاكاة الصورة الاحترافية */}
                  <Skeleton 
                    variant="rectangular" 
                    sx={{ 
                      width: { xs: 70, sm: 90 }, 
                      height: { xs: 70, sm: 90 }, 
                      borderRadius: "16px",
                      bgcolor: alpha(theme.palette.action.hover, 0.1)
                    }} 
                  />

                  {/* محاكاة النصوص (الاسم والسعر) */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Skeleton variant="text" width="50%" height={30} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="30%" height={25} />
                  </Box>

                  {/* محاكاة كبسولة التحكم بالكمية */}
                  <Skeleton 
                    variant="rounded" 
                    width={100} 
                    height={45} 
                    sx={{ 
                      borderRadius: "12px",
                      bgcolor: alpha(theme.palette.primary.main, 0.03),
                      display: { xs: 'none', sm: 'block' } // إخفاء في الموبايل لتقليل الزحمة
                    }} 
                  />
                </Stack>
              </AppCard>
            ))}
          </Stack>

          {/* ملخص الحساب - Summary Sidebar */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <AppCard sx={{ 
              p: 4, 
              borderRadius: '28px',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}>
              <Skeleton variant="text" width="60%" height={35} sx={{ mb: 4 }} />
              
              <Stack spacing={2.5}>
                <Box display="flex" justifyContent="space-between">
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="20%" />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Skeleton variant="text" width="30%" />
                  <Skeleton variant="text" width="20%" />
                </Box>
                
                <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Skeleton variant="text" width="40%" height={40} />
                  <Skeleton variant="text" width="30%" height={50} />
                </Box>

                {/* زر الشراء الضخم */}
                <Skeleton 
                  variant="rectangular" 
                  width="100%" 
                  height={56} 
                  sx={{ 
                    borderRadius: "16px", 
                    mt: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.08)
                  }} 
                />
              </Stack>
            </AppCard>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}