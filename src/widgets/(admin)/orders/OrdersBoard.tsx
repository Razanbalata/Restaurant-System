
"use client";

import { useState, useMemo } from "react";
import {
  Stack,

  Box,

  useTheme,
} from "@mui/material";

import { useOrders } from "@/features/(admin)/order/getOrder/api/useOrders";
import { OrderStatus } from "@/features/(admin)/order/constants/order-status"; 
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
  const { useOrdersQuery , updateOrderStatus } = useOrders(selectedRestaurant?.id || '');
  const { data: orders = [], isLoading } = useOrdersQuery;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const real = useOrdersRealtime(selectedRestaurant?.id || '');


const filteredOrders = useMemo(() => {
  if (!orders) return [];
  return orders.filter((order:any) => {
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
      <Box className="flex items-center justify-center py-5">
        <OrderCardSkeleton />
      </Box>
    );
  }

  const stats = [
    { label: "Pending", color: "orange", count: orders?.filter((o:any) => o.status === "pending").length || 0 },
    { label: "Preparing", color: "purple", count: orders?.filter((o:any) => o.status === "preparing").length || 0 },
    { label: "Ready", color: "green", count: orders?.filter((o:any) => o.status === "ready").length || 0 },
    { label: "On the Way", color: "teal", count: orders?.filter((o:any) => o.status === "out_for_delivery").length || 0 },
  ];

  return (
    <Stack spacing={4}>
      {/* Header */}
     <OrdersHeader/>

      {/* Filters */}
      <OrdersFilters search={searchQuery} status={statusFilter} onSearchChange={setSearchQuery} onStatusChange={(val) => setStatusFilter(val as OrderStatus | "all")}/>

      {/* Stats Cards */}
      <OrdersStats stats={stats}/>

      {/* Orders List */}
      <OrderItemsList items={filteredOrders}/>
    </Stack>
  );
}


