"use client";

import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Container,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Fade,
  useTheme,
  alpha,
} from "@mui/material";
import {
  LocationOnOutlined,
  AccessTime,
  PhoneEnabledOutlined,
  NotesOutlined,
  ReceiptLongOutlined,
  FastfoodOutlined,
} from "@mui/icons-material";
import { useGetOrders } from "@/features/(customer)/order/getOrder/api/useGetOrder";
import OrderSkelton from "@/shared/ui/Skeletons/OrderSkelton";
import { OrderStatusTracker } from "./OrderStatusTracker";


// --- 2. المكوّن الرئيسي (OrdersList) ---
export default function OrdersList() {
  const theme = useTheme();
  const { data: orders = [], isLoading } = useGetOrders();

  const sortedOrders = useMemo(
    () => [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [orders]
  );

  if (isLoading) return <OrderSkelton />;

  return (
    <Box sx={{ 
      bgcolor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.background.default, 
      minHeight: "100vh", 
      py: 5 
    }}>
      <Container maxWidth="sm">
        {/* الهيدر الرئيسي */}
        <Stack direction="row" spacing={2} mb={4} alignItems="center">
          <Box sx={{ 
            p: 1.2, 
            borderRadius: 2, 
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            display: 'flex'
          }}>
            <ReceiptLongOutlined />
          </Box>
          <Typography variant="h5" fontWeight="1000" color="text.primary">
            طلباتي الأخيرة
          </Typography>
        </Stack>

        {orders.length === 0 && (
          <Typography color="text.secondary" textAlign="center" py={5}>لا يوجد طلبات حالياً!</Typography>
        )}

        <Stack spacing={3}>
          {sortedOrders.map((order: any, index: number) => (
            <Fade in timeout={400 + index * 100} key={order.id}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: `${Number(theme.shape.borderRadius) * 2}px`,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.background.paper,
                  overflow: "visible",
                  transition: "0.3s",
                  "&:hover": {
                    borderColor: theme.palette.primary.light,
                    boxShadow: theme.shadows[2]
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* رقم الطلب والسعر */}
                  <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Box>
                      <Typography variant="caption" color="text.disabled" fontWeight="bold">
                        #{order.id?.toString().slice(0, 8).toUpperCase()}
                      </Typography>
                    </Box>
                    <Typography variant="h6" fontWeight="1000" color="primary.main">
                      {Number(order.total_price).toFixed(2)} ₪
                    </Typography>
                  </Stack>

                  <OrderStatusTracker status={order.status} />

                  {/* تفاصيل المحتويات */}
                  <Box sx={{
                    bgcolor: theme.palette.mode === 'light' ? theme.palette.grey[50] : alpha(theme.palette.common.white, 0.03),
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    mb: 2,
                  }}>
                    <Box sx={{ p: 1.5, borderBottom: `1px solid ${theme.palette.divider}`, display: "flex", alignItems: "center", gap: 1 }}>
                      <FastfoodOutlined sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="caption" fontWeight="900" color="text.secondary">محتويات الطلب</Typography>
                    </Box>

                    <Stack divider={<Divider flexItem sx={{ borderStyle: "dashed", mx: 2 }} />}>
                      {order.order_items?.map((item: any) => (
                        <Stack key={item.id} direction="row" spacing={2} alignItems="center" sx={{ p: 2 }}>
                          <Avatar
                            src={item.menu_item?.image_url}
                            variant="rounded"
                            sx={{ width: 50, height: 50, borderRadius: 2, bgcolor: theme.palette.divider }}
                          />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2" fontWeight="800" color="text.primary">
                              {item.menu_item?.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.quantity} × {Number(item.price).toFixed(2)} ₪
                            </Typography>
                          </Box>
                          <Typography variant="body2" fontWeight="900" color="text.primary">
                            {(item.quantity * item.price).toFixed(2)} ₪
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>

                  {/* بيانات التوصيل والوقت */}
                  <Stack spacing={1} sx={{ px: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LocationOnOutlined sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                      <Typography variant="caption" fontWeight="600" color="text.primary">
                        {order.address || "استلام من الفرع"}
                      </Typography>
                    </Stack>
                    
                    {order.phone && (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <PhoneEnabledOutlined sx={{ fontSize: 16, color: "text.disabled" }} />
                        <Typography variant="caption" fontWeight="600" color="text.secondary">{order.phone}</Typography>
                      </Stack>
                    )}

                    {order.notes && (
                      <Stack direction="row" spacing={1} alignItems="flex-start">
                        <NotesOutlined sx={{ fontSize: 16, color: "text.disabled", mt: 0.3 }} />
                        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic" }}>{order.notes}</Typography>
                      </Stack>
                    )}

                    <Divider sx={{ my: 1, opacity: 0.5 }} />

                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTime sx={{ fontSize: 14, color: "text.disabled" }} />
                      <Typography variant="caption" fontWeight="bold" color="text.disabled">
                        {new Date(order.created_at).toLocaleDateString("ar-EG", {
                          month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                        })}
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