"use client";
import { Box, Stack, Container, Typography, useTheme, alpha } from "@mui/material";
import { useOrders } from "@/features/(admin)/order/getOrder/api/useOrders";  
import OrderColumn from "./OrderColumn";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { useOrdersRealtime } from "@/features/(admin)/order/realTime/useOrdersRealtime"; 
import { OrdersAdminSkeleton } from "@/shared/ui/Skeletons/OrdersAdminSkeleton";

export default function OrdersAdminPage() {
  const theme = useTheme();
  const { selectedRestaurant } = useRestaurant();
  const { useOrdersQuery } = useOrders(selectedRestaurant?.id || '');
  const { data: orders = [], isLoading } = useOrdersQuery;

  useOrdersRealtime(selectedRestaurant?.id || '');

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    console.log(`تغيير حالة الطلب ${orderId} إلى ${newStatus}`);
  };

  if (isLoading) return <OrdersAdminSkeleton />;

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight={900} mb={4} color="text.primary">
          إدارة الطلبات الحية
        </Typography>
        
        <Stack 
          direction={{ xs: "column", md: "row" }} 
          spacing={3} 
          alignItems="flex-start"
          sx={{ overflowX: "auto", pb: 2 }}
        >
          <OrderColumn 
            title="طلبات جديدة" 
            color={theme.palette.error.main}
            orders={orders.filter((o: any) => o.status.toLowerCase() === 'pending')} 
            onStatusChange={handleStatusUpdate}
          />
          <OrderColumn 
            title="قيد التحضير" 
            color={theme.palette.warning.main}
            orders={orders.filter((o: any) => o.status === 'PREPARING')} 
            onStatusChange={handleStatusUpdate}
          />
          <OrderColumn 
            title="تم الإنجاز" 
            color={theme.palette.success.main}
            orders={orders.filter((o: any) => o.status === 'COMPLETED')} 
            onStatusChange={handleStatusUpdate}
          />
        </Stack>
      </Container>
    </Box>
  );
}