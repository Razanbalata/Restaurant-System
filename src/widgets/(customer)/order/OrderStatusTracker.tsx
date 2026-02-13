"use client";
import { alpha, Box, LinearProgress, Stack, Typography, useTheme } from "@mui/material";

const statusMapping = {
  pending: { label: "Waiting for Confirmation", color: "#F59E0B", progress: 20 },
  preparing: { label: "Chef is Cooking", color: "#3B82F6", progress: 55 },
  completed: { label: "Order Delivered", color: "#10B981", progress: 100 },
  cancelled: { label: "Order Cancelled", color: "#EF4444", progress: 0 },
};

export const OrderStatusTracker = ({ status }: { status: string }) => {
  const theme = useTheme();
  const config = statusMapping[status as keyof typeof statusMapping] || { label: "Status Unknown", color: "#6B7280", progress: 0 };

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
        {/* Pulse Dot: ميزة تيلويند للمهام النشطة */}
        {status === "preparing" && (
          <Box sx={{
            width: 8, height: 8, borderRadius: "50%", bgcolor: config.color,
            animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            '@keyframes pulse': { '0%, 100%': { opacity: 1 }, '50%': { opacity: .3 } }
          }} />
        )}
        <Typography variant="caption" sx={{ fontWeight: 800, color: config.color, textTransform: 'uppercase', letterSpacing: 1 }}>
          {config.label}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="caption" sx={{ fontWeight: 900, color: "text.secondary", fontFamily: 'monospace' }}>
          {config.progress}%
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={config.progress}
        sx={{
          height: 6,
          borderRadius: 10,
          bgcolor: alpha(config.color, 0.1),
          "& .MuiLinearProgress-bar": { bgcolor: config.color, borderRadius: 10 },
        }}
      />
    </Box>
  );
};