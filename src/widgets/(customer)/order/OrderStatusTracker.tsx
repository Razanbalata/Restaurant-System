import { alpha, Box, LinearProgress, Stack, Typography, useTheme } from "@mui/material";

export const OrderStatusTracker = ({ status }: { status: string }) => {
  const theme = useTheme();
  
  const configs: Record<string, { label: string; color: string; progress: number }> = {
    pending: { label: "Pending", color: theme.palette.warning.main, progress: 20 },
    preparing: { label: "Preparing", color: theme.palette.info.main, progress: 55 },
    delivered: { label: "Delivered", color: theme.palette.success.main, progress: 100 },
    cancelled: { label: "Cancelled", color: theme.palette.error.main, progress: 0 },
  };

  const config = configs[status] || { label: "Unknown", color: theme.palette.grey[500], progress: 0 };

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Stack direction="row" justifyContent="space-between" mb={1}>
        <Typography variant="caption" fontWeight="900" sx={{ color: config.color }}>
          {config.label}
        </Typography>
        <Typography variant="caption" fontWeight="bold" color="text.secondary">
          {config.progress}%
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={config.progress}
        sx={{
          height: 6,
          borderRadius: 4,
          bgcolor: alpha(config.color, 0.1),
          "& .MuiLinearProgress-bar": { 
             bgcolor: config.color,
             borderRadius: 4
          },
        }}
      />
    </Box>
  );
};