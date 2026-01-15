// "use client";

// import React, { useMemo } from "react";
// import { 
//   Box, Typography, Stack, Divider, 
//   Chip, Container, Card, CardContent, Skeleton 
// } from "@mui/material";
// import { useGetOrders } from "@/features/order/getOrder/api/useGetOrder";

// // --- 1. ثوابت خارج المكون (Static Config) ---
// // نقلها للخارج يمنع إعادة تعريف الكائن في كل Re-render
// const STATUS_CONFIG: Record<string, { label: string; color: "warning" | "info" | "success" | "error" | "default" }> = {
//   pending: { label: "قيد الانتظار", color: "warning" },
//   preparing: { label: "جاري التحضير", color: "info" },
//   delivered: { label: "تم التوصيل", color: "success" },
//   cancelled: { label: "ملغي", color: "error" },
// };

// // --- 2. مكونات صغيرة (Atoms) ---
// const OrderStatusChip = ({ status }: { status: string }) => {
//   // استخدام useMemo هنا لضمان عدم استخراج البيانات إلا لو تغيرت الحالة
//   const config = useMemo(() => 
//     STATUS_CONFIG[status] || { label: "غير معروف", color: "default" }, 
//   [status]);

//   return (
//     <Chip 
//       label={config.label} 
//       color={config.color} 
//       size="small" 
//       sx={{ fontWeight: "bold", borderRadius: "8px" }} 
//     />
//   );
// };

// const PriceText = ({ amount, variant = "body1", color = "primary.main" }: any) => {
//   const formattedPrice = useMemo(() => Number(amount).toFixed(2), [amount]);
//   return (
//     <Typography variant={variant} fontWeight="900" sx={{ color }}>
//       {formattedPrice} ₪
//     </Typography>
//   );
// };

// // --- 3. المكون الرئيسي (The Template) ---
// export default function OrdersList({ userId }: { userId: string }) {
//   // جلب البيانات من الهوك الخاص بكِ
//   const { data: orders = [], isLoading, isError } = useGetOrders();

//   // تحسين: معالجة البيانات قبل العرض (مثلاً ترتيبها) باستخدام useMemo
//   const sortedOrders = useMemo(() => {
//     return [...orders].sort((a, b) => 
//       new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//     );
//   }, [orders]);

//   // حالة التحميل (Skeleton)
//   if (isLoading) {
//     return (
//       <Container maxWidth="sm" sx={{ py: 4 }}>
//         <Typography variant="h5" fontWeight="900" mb={3} textAlign="right">جاري تحميل طلباتك...</Typography>
//         {[1, 2, 3].map((i) => (
//           <Skeleton key={i} variant="rectangular" height={160} sx={{ borderRadius: 4, mb: 3 }} />
//         ))}
//       </Container>
//     );
//   }

//   // حالة الخطأ
//   if (isError) {
//     return (
//       <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
//         <Typography color="error" variant="h6" fontWeight="bold">عذراً، حدث خطأ أثناء جلب البيانات</Typography>
//       </Container>
//     );
//   }

//   // حالة عدم وجود بيانات
//   if (sortedOrders.length === 0) {
//     return (
//       <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
//         <Typography variant="h4" mb={2}>🍕</Typography>
//         <Typography color="textSecondary" variant="h6" fontWeight="bold">لا توجد طلبات سابقة حتى الآن</Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="sm" sx={{ py: 4 }}>
//       <Typography variant="h5" fontWeight="900" gutterBottom mb={4} textAlign="right">
//         📦 طلباتي الأخيرة
//       </Typography>

//       <Stack spacing={3}>
//         {sortedOrders.map((order: any) => (
//           <Card 
//             key={order.id} 
//             elevation={0} 
//             sx={{ 
//               borderRadius: 4, 
//               border: '1px solid #f0f0f0',
//               transition: 'all 0.3s ease',
//               '&:hover': { 
//                 boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
//                 borderColor: 'transparent',
//                 transform: 'translateY(-2px)'
//               } 
//             }}
//           >
//             <CardContent sx={{ p: 3 }}>
//               {/* Header: ID & Status */}
//               <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Box>
//                   <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 0.5 }}>رقم الطلب</Typography>
//                   <Typography fontWeight="800" variant="body2">
//                     #{order.id?.toString().slice(0, 8).toUpperCase()}
//                   </Typography>
//                 </Box>
//                 <OrderStatusChip status={order.status} />
//               </Stack>

//               <Divider sx={{ borderStyle: "dashed", my: 2 }} />

//               {/* Items List */}
//               <Stack spacing={1.5}>
//                 {order.order_items?.map((item: any, idx: number) => (
//                   <Stack key={idx} direction="row" justifyContent="space-between" alignItems="center">
//                     <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Box component="span" sx={{ color: 'orange', fontWeight: 900, mr: 1 }}>
//                         {item.quantity} ×
//                       </Box>
//                       {item.menu_items?.name || "صنف مجهول"}
//                     </Typography>
//                     <Typography variant="body2" fontWeight="600">
//                       {(Number(item.price || 0) * item.quantity).toFixed(2)} ₪
//                     </Typography>
//                   </Stack>
//                 ))}
//               </Stack>

//               <Divider sx={{ my: 2 }} />

//               {/* Footer: Date & Total */}
//               <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
//                 <Box>
//                   <Typography variant="caption" color="textSecondary" sx={{ display: "block" }}>التاريخ</Typography>
//                   <Typography variant="body2" fontWeight="500">
//                     {new Date(order.created_at).toLocaleDateString('ar-EG', { 
//                       day: 'numeric', 
//                       month: 'short',
//                       hour: '2-digit',
//                       minute: '2-digit'
//                     })}
//                   </Typography>
//                 </Box>
//                 <Box textAlign="right">
//                   <Typography variant="caption" color="textSecondary" sx={{ display: "block" }}>المجموع الإجمالي</Typography>
//                   <PriceText amount={order.total_price} variant="h6" />
//                 </Box>
//               </Stack>
//             </CardContent>
//           </Card>
//         ))}
//       </Stack>
//     </Container>
//   );
// }

import OrdersList from '@/widgets/(customer)/order/OrderPage';
import React from 'react';

function page() {
  return (
    <div>
      <OrdersList/>
    </div>
  );
}

export default page;
