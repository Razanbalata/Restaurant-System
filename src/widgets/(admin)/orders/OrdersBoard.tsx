"use client";
import { Box, Stack, Container, Typography } from "@mui/material";
// نفترض وجود هوك لجلب البيانات من سوبابيز
import { useOrders } from "@/features/(admin)/order/getOrder/api/useOrders";  
import OrderColumn from "./OrderColumn";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { useOrdersRealtime } from "@/features/(admin)/order/realTime/useOrdersRealtime"; 
import { OrdersAdminSkeleton } from "@/shared/ui/Skeletons/OrdersAdminSkeleton";


export default function OrdersAdminPage() {
  const {selectedRestaurant} = useRestaurant();
  const { useOrdersQuery  } = useOrders(selectedRestaurant?.id || '');
  const { data: orders=[] ,isLoading} = useOrdersQuery;
   console.log("Fetched orders:", orders);
  // تفعيل التحديث التلقائي (Real-time)
  // useRealtimeOrders(); 

  useOrdersRealtime(selectedRestaurant?.id || '');
  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    // هنا نستدعي mutation لتحديث الحالة في سوبابيز
    console.log(`تغيير حالة الطلب ${orderId} إلى ${newStatus}`);
  };

if (isLoading) {
    return <OrdersAdminSkeleton />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>إدارة الطلبات الحية</Typography>
      
      <Stack direction="row" spacing={3} alignItems="flex-start">
        <OrderColumn 
          title="طلبات جديدة" 
          orders={orders.filter((o: any) => o.status === 'pending')} 
          onStatusChange={handleStatusUpdate}
        />
        <OrderColumn 
          title="قيد التحضير" 
          orders={orders.filter((o: any) => o.status === 'PREPARING')} 
          onStatusChange={handleStatusUpdate}
        />
        <OrderColumn 
          title="تم الإنجاز" 
          orders={orders.filter((o: any) => o.status === 'COMPLETED')} 
          onStatusChange={handleStatusUpdate}
        />
      </Stack>
    </Container>
  );
}