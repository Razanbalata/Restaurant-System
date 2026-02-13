// 


"use client";

import React, { useMemo } from "react";
import { Box, Stack, Container, Typography, alpha, useTheme } from "@mui/material";
import { ReceiptLongOutlined } from "@mui/icons-material";

// الاستيرادات الخاصة بالبيانات
import { useGetOrders } from "@/features/(customer)/order/getOrder/api/useGetOrder";
import { useCustomerOrdersRealtime } from "@/features/(customer)/order/realTime/useCustomerRealtime";
import { useMe } from "@/features/user/api/use-me";

// المكونات التي بنيناها للتو (تأكد من صحة المسار)
import { OrderCard } from "./OrderCard"; 
import OrderSkelton from "@/shared/ui/Skeletons/OrderSkelton";

export default function OrdersList() {
  const { data: user } = useMe();
  const theme = useTheme();
  const { data: orders = [], isLoading } = useGetOrders(user?.id);

  // تفعيل التحديث اللحظي
  useCustomerOrdersRealtime(user?.id);

  // ترتيب الطلبات من الأحدث للأقدم
  const sortedOrders = useMemo(
    () => [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [orders]
  );

  if (isLoading) return <OrderSkelton />;

  return (
    <Box sx={{ 
      bgcolor: theme.palette.mode === 'light' ? '#F3F4F6' : theme.palette.background.default, 
      minHeight: "100vh", 
      py: 8 
    }}>
      <Container maxWidth="lg">
        {/* Header بتصميم Tailwind */}
        <Stack direction="row" spacing={2} mb={6} alignItems="center">
          <Box sx={{ 
            p: 1.5, 
            borderRadius: '12px', 
            bgcolor: theme.palette.primary.main,
            color: 'white',
            boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.39)}`,
            display: 'flex'
          }}>
            <ReceiptLongOutlined />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: -1 }}>
              My Orders
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              Check the status of your recent orders
            </Typography>
          </Box>
        </Stack>

        {/* قائمة الطلبات */}
        {sortedOrders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
             <Typography color="text.secondary" variant="h6" fontWeight={700}>
                No orders found yet 🍕
             </Typography>
          </Box>
        ) : (
          <Stack spacing={4}>
            {sortedOrders.map((order: any) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}