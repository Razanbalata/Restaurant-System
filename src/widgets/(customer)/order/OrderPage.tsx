"use client";

import React, { useMemo } from "react";
import {
  Box, Typography, Stack, Divider, Container, Card, CardContent, Avatar,
  Button, LinearProgress, Fade, IconButton
} from "@mui/material";
import { 
  LocationOnOutlined, 
  AccessTime, 
  Replay,
  ChevronLeft,
  PhoneEnabledOutlined,
  NotesOutlined,
  ReceiptLongOutlined,
  FastfoodOutlined
} from "@mui/icons-material";
import { useGetOrders } from "@/features/(customer)/order/getOrder/api/useGetOrder";
import OrderSkelton from "@/shared/ui/Skeletons/OrderSkelton";

// --- 1. Configurations ---
const STATUS_CONFIG: Record<string, { label: string; color: string; progress: number; pulse?: boolean }> = {
  pending: { label: "قيد الانتظار", color: "#f39c12", progress: 20, pulse: true },
  preparing: { label: "جاري التحضير", color: "#3498db", progress: 55, pulse: true },
  delivered: { label: "تم التوصيل", color: "#27ae60", progress: 100 },
  cancelled: { label: "ملغي", color: "#e74c3c", progress: 0 },
};

// --- 2. Sub-Components (Internal) ---

const OrderStatusTracker = ({ status }: { status: string }) => {
  const config = STATUS_CONFIG[status] || { label: "غير معروف", color: "#95a5a6", progress: 0 };
  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Stack direction="row" justifyContent="space-between" mb={1}>
        <Typography variant="caption" fontWeight="900" sx={{ color: config.color }}>
           {config.label}
        </Typography>
        <Typography variant="caption" fontWeight="bold" color="text.secondary">{config.progress}%</Typography>
      </Stack>
      <LinearProgress 
        variant="determinate" value={config.progress} 
        sx={{ height: 6, borderRadius: 4, bgcolor: `${config.color}15`, '& .MuiLinearProgress-bar': { bgcolor: config.color } }} 
      />
    </Box>
  );
};

export default function OrdersList() {
  const { data: orders = [], isLoading, isError } = useGetOrders();

  const sortedOrders = useMemo(() => 
    [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  , [orders]);

  if (isLoading) return <OrderSkelton />;

  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="sm">
        <Stack direction="row" spacing={1.5} mb={4} alignItems="center">
           <ReceiptLongOutlined color="primary" />
           <Typography variant="h5" fontWeight="1000">طلباتي الأخيرة</Typography>
        </Stack>

        <Stack spacing={3}>
          {sortedOrders.map((order: any, index: number) => (
            <Fade in timeout={400 + index * 100} key={order.id}>
              <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #EEE", overflow: 'visible' }}>
                <CardContent sx={{ p: 3 }}>
                  
                  {/* الرأس: رقم الطلب والتاريخ */}
                  <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Box>
                      <Typography variant="caption" color="text.disabled" fontWeight="bold">#{order.id}</Typography>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        
                      </Stack>
                    </Box>
                    <Typography variant="h6" fontWeight="1000" color="primary.main">
                      {Number(order.total_price).toFixed(2)} ₪
                    </Typography>
                  </Stack>

                  <OrderStatusTracker status={order.status} />

                  {/* --- قسم محتويات الطلب (مفصل) --- */}
                  <Box sx={{ bgcolor: "#FFF", borderRadius: 2, border: "1px solid #F0F0F0", mb: 2 }}>
                    <Box sx={{ p: 1.5, borderBottom: "1px solid #F5F5F5", display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FastfoodOutlined sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="caption" fontWeight="900" color="text.secondary">محتويات الطلب</Typography>
                    </Box>
                    
                    <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed', mx: 2 }} />}>
                      {order.order_items?.map((item: any) => (
                        <Stack key={item.id} direction="row" spacing={2} alignItems="center" sx={{ p: 2 }}>
                          <Avatar 
                            src={item.menu_item?.image_url} 
                            variant="rounded" 
                            sx={{ width: 50, height: 50, borderRadius: 2 }}
                          />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2" fontWeight="800">{item.menu_item?.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.quantity} × {Number(item.price).toFixed(2)} ₪
                            </Typography>
                          </Box>
                          <Typography variant="body2" fontWeight="900">
                            {(item.quantity * item.price).toFixed(2)} ₪
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>

                  {/* بيانات التوصيل */}
                  <Stack spacing={1} sx={{ px: 1, mb: 3 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LocationOnOutlined sx={{ fontSize: 16, color: "text.disabled" }} />
                      <Typography variant="caption" fontWeight="600">{order.address || "استلام من الفرع"}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PhoneEnabledOutlined sx={{ fontSize: 16, color: "text.disabled" }} />
                      <Typography variant="caption" fontWeight="600">{order.phone}</Typography>
                    </Stack>
                    {order.notes && (
                      <Stack direction="row" spacing={1} alignItems="flex-start">
                        <NotesOutlined sx={{ fontSize: 16, color: "text.disabled", mt: 0.3 }} />
                        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>{order.notes}</Typography>
                      </Stack>
                      
                    )}
                    <Stack direction="row" spacing={1} alignItems="center">
                    <AccessTime sx={{ fontSize: 14, color: "text.secondary" }} />
                        <Typography variant="caption" fontWeight="bold">
                          {new Date(order.created_at).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                        </Stack>
                  </Stack>

                  

                </CardContent>
              </Card>
            </Fade>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}