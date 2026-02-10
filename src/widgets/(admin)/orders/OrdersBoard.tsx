// "use client";
// import { Box, Stack, Container, Typography, useTheme, alpha } from "@mui/material";
// import { useOrders } from "@/features/(admin)/order/getOrder/api/useOrders";  
// import OrderColumn from "./OrderColumn";
// import { useRestaurant } from "@/app/providers/RestaurantContext";
// import { useOrdersRealtime } from "@/features/(admin)/order/realTime/useOrdersRealtime"; 
// import { OrdersAdminSkeleton } from "@/shared/ui/Skeletons/OrdersAdminSkeleton";
// import { supabase } from "@/shared/api/supabaseRealTime";

// export default function OrdersAdminPage() {
//   const theme = useTheme();
//   const { selectedRestaurant } = useRestaurant();
//   console.log("Selected restaurant in OrdersAdminPage:", selectedRestaurant);
//   const { useOrdersQuery , updateOrderStatus } = useOrders(selectedRestaurant?.id || '');
//   const { data: orders = [], isLoading } = useOrdersQuery;
//   const updateStatus = updateOrderStatus;

//   const real = useOrdersRealtime(selectedRestaurant?.id || '');
//   console.log("Real-time hook data:", real);


//   const handleStatusUpdate = (orderId: string, newStatus: string) => {
//     updateStatus.mutate({ id:orderId, status: newStatus });

//   };
//   console.log("Orders data:", orders);

//   if (isLoading) return <OrdersAdminSkeleton />;

//   return (
//     <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh", py: 4 }}>
//       <Container maxWidth="xl">
//         <Typography variant="h4" fontWeight={900} mb={4} color="text.primary">
//           Live Orders Management
//         </Typography>
        
//         <Stack 
//           direction={{ xs: "column", md: "row" }} 
//           spacing={3} 
//           alignItems="flex-start"
//           sx={{ overflowX: "auto", pb: 2 }}
//         >
//           <OrderColumn 
//             title="New Orders" 
//             color={theme.palette.error.main}
//             orders={orders.filter((o: any) => o.status.toLowerCase() === 'pending')} 
//             onStatusChange={handleStatusUpdate}
//           />
//           <OrderColumn 
//             title="In Preparation" 
//             color={theme.palette.warning.main}
//             orders={orders.filter((o: any) => o.status === 'preparing')} 
//             onStatusChange={handleStatusUpdate}
//           />
//           <OrderColumn 
//             title="Completed" 
//             color={theme.palette.success.main}
//             orders={orders.filter((o: any) => o.status === 'completed')} 
//             onStatusChange={handleStatusUpdate}
//           />
//         </Stack>
//       </Container>
//     </Box>
//   );
// }


"use client";

import { useState, useMemo } from "react";
import {
  Stack,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
  CircularProgress,
  Button,
  useTheme,
} from "@mui/material";
import { Input } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { Loader2 } from "lucide-react";
import { OrderCard } from "./OrderCardd";  // الكارد اللي عملناه فوق
import { useOrders } from "@/features/(admin)/order/getOrder/api/useOrders";
import { OrderStatus } from "@/features/(admin)/order/constants/order-status"; 
import { alpha } from "@mui/material";
import { useOrdersRealtime } from "@/features/(admin)/order/realTime/useOrdersRealtime";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { OrderCardSkeleton } from "@/shared/ui/Skeletons/OrdersAdminSkeleton";
import { OrdersHeader } from "./OrdersHeader";
import { OrdersFilters } from "./OrdersFilter";
import { OrdersStats } from "./StatusCard";
import { OrderItemsList } from "./OrderList";

export default function OwnerOrdersPage() {
  const theme = useTheme();
  const { selectedRestaurant } = useRestaurant();
  console.log("Selected restaurant in OrdersAdminPage:", selectedRestaurant);
  const { useOrdersQuery , updateOrderStatus } = useOrders(selectedRestaurant?.id || '');
  const { data: orders = [], isLoading } = useOrdersQuery;
  console.log("orders",orders)
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const real = useOrdersRealtime(selectedRestaurant?.id || '');
  console.log("Real-time hook data:", real);


const filteredOrders = useMemo(() => {
  if (!orders) return [];
  return orders.filter((order) => {
    const search = searchQuery.toLowerCase();
    const matchesSearch =
      String(order.id).includes(search) ||
      (order.phone || "").includes(search) ||
      (order.address || "").toLowerCase().includes(search) ||
      (order.customerName || "").toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
      
    return matchesSearch && matchesStatus;
  });
}, [orders, searchQuery, statusFilter]);



  if (isLoading) {
    return (
      <Box className="flex items-center justify-center py-20">
        <OrderCardSkeleton />
      </Box>
    );
  }

  // حساب الإحصائيات
  const stats = [
    { label: "Pending", color: "orange", count: orders?.filter(o => o.status === "pending").length || 0 },
    { label: "Preparing", color: "purple", count: orders?.filter(o => o.status === "preparing").length || 0 },
    { label: "Ready", color: "green", count: orders?.filter(o => o.status === "ready").length || 0 },
    { label: "On the Way", color: "teal", count: orders?.filter(o => o.status === "out_for_delivery").length || 0 },
  ];

  return (
    <Stack spacing={4}>
      {/* Header */}
     <OrdersHeader/>

      {/* Filters */}
      <OrdersFilters search={searchQuery} status={statusFilter} onSearchChange={setSearchQuery} onStatusChange={setStatusFilter}/>

      {/* Stats Cards */}
      <OrdersStats stats={stats}/>

      {/* Orders List */}
      <OrderItemsList items={filteredOrders}/>
    </Stack>
  );
}


