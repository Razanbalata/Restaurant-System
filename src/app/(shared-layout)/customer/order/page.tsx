// "use client";

// import React, { useMemo } from "react";
// import { 
//   Box, Typography, Stack, Divider, 
//   Chip, Container, Card, CardContent, Skeleton 
// } from "@mui/material";
// import { useGetOrders } from "@/features/order/getOrder/api/useGetOrder";

// // --- 1. Constants outside the component (Static Config) ---
// // Moving them outside prevents object redefinition on each Re-render
// const STATUS_CONFIG: Record<string, { label: string; color: "warning" | "info" | "success" | "error" | "default" }> = {
//   pending: { label: "Pending", color: "warning" },
//   preparing: { label: "Preparing", color: "info" },
//   delivered: { label: "Delivered", color: "success" },
//   cancelled: { label: "Cancelled", color: "error" },
// };

// // --- 2. Small components (Atoms) ---
// const OrderStatusChip = ({ status }: { status: string }) => {
//   // Using useMemo here to ensure data is not extracted unless the status changes
//   const config = useMemo(() => 
//     STATUS_CONFIG[status] || { label: "Unknown", color: "default" }, 
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

// // --- 3. Main Component (The Template) ---
// export default function OrdersList({ userId }: { userId: string }) {
//   // Fetch data from your custom hook
//   const { data: orders = [], isLoading, isError } = useGetOrders();

//   // Optimization: Process data before displaying (e.g., sort it) using useMemo
//   const sortedOrders = useMemo(() => {
//     return [...orders].sort((a, b) => 
//       new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//     );
//   }, [orders]);

//   // Loading state (Skeleton)
//   if (isLoading) {
//     return (
//       <Container maxWidth="sm" sx={{ py: 4 }}>
//         <Typography variant="h5" fontWeight="900" mb={3} textAlign="right">Loading your orders...</Typography>
//         {[1, 2, 3].map((i) => (
//           <Skeleton key={i} variant="rectangular" height={160} sx={{ borderRadius: 4, mb: 3 }} />
//         ))}
//       </Container>
//     );
//   }

//   // Error state
//   if (isError) {
//     return (
//       <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
//         <Typography color="error" variant="h6" fontWeight="bold">Sorry, an error occurred while fetching data</Typography>
//       </Container>
//     );
//   }

//   // No data state
//   if (sortedOrders.length === 0) {
//     return (
//       <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
//         <Typography variant="h4" mb={2}>🍕</Typography>
//         <Typography color="textSecondary" variant="h6" fontWeight="bold">You don't have any previous orders yet</Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="sm" sx={{ py: 4 }}>
//       <Typography variant="h5" fontWeight="900" gutterBottom mb={4} textAlign="right">
//         📦 My Recent Orders
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
//                   <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 0.5 }}>Order Number</Typography>
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
//                       {item.menu_items?.name || "Unknown Item"}
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
//                   <Typography variant="caption" color="textSecondary" sx={{ display: "block" }}>Date</Typography>
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
//                   <Typography variant="caption" color="textSecondary" sx={{ display: "block" }}>Total</Typography>
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
