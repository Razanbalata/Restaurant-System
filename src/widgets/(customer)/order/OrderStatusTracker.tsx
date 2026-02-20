"use client";

import { Box, LinearProgress, Stack, Typography, useTheme, alpha } from "@mui/material";
import type { FC } from "react";
import { statusConfig, OrderStatus } from "@/features/(admin)/order/constants/order-status";

interface OrderStatusTrackerProps {
  status: OrderStatus;
}

export const OrderStatusTracker: FC<OrderStatusTrackerProps> = ({ status }) => {
  const theme = useTheme();

  const statusFlow: OrderStatus[] = [
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "out_for_delivery",
    "delivered",
    "completed",
  ];

  const currentIndex = statusFlow.indexOf(status);
  const progress =
    status === "cancelled"
      ? 0
      : currentIndex >= 0
      ? ((currentIndex + 1) / statusFlow.length) * 100
      : 0;

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      {/* Header: Icon + Label + % */}
      <Stack direction="row" alignItems="center" spacing={1.5} mb={1.5}>
        <Box
          sx={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            bgcolor: config.bgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Icon && <Icon size={14} color={config.color} />}
        </Box>

        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            color: config.color,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {config.label}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Typography
          variant="caption"
          sx={{
            fontWeight: 900,
            color: "text.secondary",
            fontFamily: "monospace",
          }}
        >
          {Math.round(progress)}%
        </Typography>
      </Stack>

      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 7,
          borderRadius: 10,
          bgcolor: alpha(config.color, 0.1),
          "& .MuiLinearProgress-bar": {
            bgcolor: config.color,
            borderRadius: 10,
          },
        }}
      />
    </Box>
  );
};
