import { Box, Container, Stack, Skeleton, Paper, Grid } from "@mui/material";

export const OrdersAdminSkeleton = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* عنوان الصفحة */}
      <Skeleton variant="text" width="250px" height={60} sx={{ mb: 4, borderRadius: 2 }} />

      {/* أعمدة الطلبات */}
      <Stack direction="row" spacing={3} alignItems="flex-start" sx={{ overflowX: 'auto', pb: 2 }}>
        {[1, 2, 3].map((column) => (
          <Box 
            key={column} 
            sx={{ 
              flex: 1, 
              minWidth: '300px', 
              bgcolor: '#f5f5f5', 
              p: 2, 
              borderRadius: 2, 
              minHeight: '70vh' 
            }}
          >
            {/* عنوان العمود (جديدة، قيد التحضير، مكتملة) */}
            <Skeleton 
              variant="rectangular" 
              width="60%" 
              height={30} 
              sx={{ mx: 'auto', mb: 3, borderRadius: 1 }} 
            />

            {/* كروت الطلبات داخل العمود */}
            <Stack spacing={2}>
              {[1, 2, 3].map((card) => (
                <Paper key={card} sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                  <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Skeleton variant="text" width="40%" height={20} />
                    <Skeleton variant="rounded" width="20%" height={20} />
                  </Stack>
                  
                  {/* أسطر الوجبات */}
                  <Skeleton variant="text" width="80%" height={15} />
                  <Skeleton variant="text" width="60%" height={15} />

                  {/* السعر */}
                  <Skeleton variant="text" width="30%" height={35} sx={{ mt: 2 }} />

                  {/* الزر السفلي */}
                  <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height={36} 
                    sx={{ mt: 2, borderRadius: 1 }} 
                  />
                </Paper>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};