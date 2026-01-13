"use client";

import React from "react";
import { 
  Box, Container, Typography, Grid, Paper, 
  Chip, Button, Stack, Divider, CircularProgress 
} from "@mui/material";
import { Clock, CheckCircle, Truck, Utensils, TrendingUp } from "lucide-react";
import { useGetAdminStats } from "@/features/order/getAdminResponsibilities/getAdminStats/api/useGetAdminStats"; 
import { useGetAdminOrders } from "@/features/order/getAdminResponsibilities/getAdminOrders/api/useGetAdminOrders"; 
import { useUpdateOrderStatus } from "@/features/order/getAdminResponsibilities/updateAdminStats/api/useUpdateOrderStatus"; 

// --- كرت الإحصائيات الصغير ---
const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #eee' }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography variant="body2" color="text.secondary" fontWeight="600">{title}</Typography>
        <Typography variant="h4" fontWeight="800" mt={1}>{value}</Typography>
      </Box>
      <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${color}.50`, color: `${color}.main` }}>
        <Icon size={28} />
      </Box>
    </Stack>
  </Paper>
);

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useGetAdminStats();
  console.log('Admin Stats:', stats);
  const { data: orders, isLoading: ordersLoading } = useGetAdminOrders();
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

  if (statsLoading || ordersLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress sx={{ color: 'orange.500' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="900" mb={4}>لوحة التحكم 📊</Typography>

      {/* 1. شبكة الإحصائيات */}
      <Grid container spacing={3} mb={6}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="المبيعات الإجمالية" value={`₪${stats?.totalSales}`} icon={TrendingUp} color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="طلبات اليوم" value={stats?.todayOrders} icon={Utensils} color="warning" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="طلبات نشطة" value={stats?.activeOrders} icon={Clock} color="info" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="عدد المطاعم" value={stats?.restaurantCount} icon={CheckCircle} color="secondary" />
        </Grid>
      </Grid>

      {/* 2. إدارة الطلبات الحية */}
      <Typography variant="h5" fontWeight="800" mb={3}>الطلبات الأخيرة</Typography>
      <Stack spacing={2}>
        {orders?.length > 0 ? (
          orders.map((order: any) => (
            <Paper key={order.id} sx={{ p: 3, borderRadius: 4, border: '1px solid #eee' }} elevation={0}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography fontWeight="bold">طلب #{order.id.slice(0, 8)}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    من: {order.restaurants?.name} • {new Date(order.created_at).toLocaleTimeString('ar-SA')}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <Typography variant="body2" fontWeight="600">
                    {order.order_items.map((item: any) => `${item.quantity}x ${item.menu_items.name}`).join(', ')}
                  </Typography>
                  <Typography variant="subtitle2" color="primary.main" fontWeight="bold">
                    المجموع: ₪{order.total_price}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={2}>
                   <StatusChip status={order.status} />
                </Grid>

                <Grid item xs={12} md={3} textAlign="left">
                   <AdminActions 
                    currentStatus={order.status} 
                    orderId={order.id} 
                    onUpdate={updateStatus} 
                    disabled={isPending}
                   />
                </Grid>
              </Grid>
            </Paper>
          ))
        ) : (
          <Typography textAlign="center" py={10} color="text.secondary">لا توجد طلبات حالياً</Typography>
        )}
      </Stack>
    </Container>
  );
}

// --- مكونات مساعدة للجمالية والنظام ---

const StatusChip = ({ status }: { status: string }) => {
  const configs: any = {
    pending: { label: "قيد الانتظار", color: "warning" },
    preparing: { label: "يتم التحضير", color: "info" },
    on_the_way: { label: "في الطريق", color: "primary" },
    delivered: { label: "تم التوصيل", color: "success" },
  };
  const config = configs[status] || configs.pending;
  return <Chip label={config.label} color={config.color} size="small" sx={{ fontWeight: 'bold' }} />;
};

const AdminActions = ({ currentStatus, orderId, onUpdate, disabled }: any) => {
  if (currentStatus === 'pending') {
    return <Button variant="contained" color="warning" fullWidth onClick={() => onUpdate({ orderId, newStatus: 'preparing' })} disabled={disabled}>ابدأ التحضير</Button>;
  }
  if (currentStatus === 'preparing') {
    return <Button variant="contained" color="info" fullWidth onClick={() => onUpdate({ orderId, newStatus: 'on_the_way' })} disabled={disabled}>إرسال مع السائق</Button>;
  }
  if (currentStatus === 'on_the_way') {
    return <Button variant="contained" color="success" fullWidth onClick={() => onUpdate({ orderId, newStatus: 'delivered' })} disabled={disabled}>تأكيد الاستلام</Button>;
  }
  return <CheckCircle color="green" />;
};