import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  Box,
  Divider,
  Avatar,
  Tooltip,
  IconButton,
  CircularProgress,
  alpha,
  useTheme
} from "@mui/material";
import { MapPin, Phone, Clock, ClipboardList, ChevronRight, MessageSquare } from "lucide-react";
import { statusConfig, nextStatus, OrderStatus } from "@/features/(admin)/order/constants/order-status";
import { useOrders } from "@/features/(admin)/order/getOrder/api/useOrders";
import { useRestaurant } from "@/app/providers/RestaurantContext";

type Props = {
  order: any;
};

export const OrderCard = ({ order }: Props) => {
  const theme = useTheme();
  
  const currentStatus = (order.status || "pending") as OrderStatus;
  const status = statusConfig[currentStatus] || statusConfig["pending"];
  const StatusIcon = status.icon;

  const { selectedRestaurant } = useRestaurant();
  const { updateOrderStatus } = useOrders(selectedRestaurant?.id || '');
  
  const isUpdating = updateOrderStatus.isPending;

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus.mutate({ id: orderId, status: newStatus });
  };

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      updateOrderStatus.mutate({ id: orderId, status: "cancelled" });
    }
  };

  return (
    <Card 
      elevation={0}
      sx={{ 
        borderRadius: 3, 
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        border: "1px solid",
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
          boxShadow: `0 12px 24px ${alpha(theme.palette.common.black, 0.08)}`,
          transform: "translateY(-4px)",
          borderColor: status.color,
        }
      }}
    >
      <CardHeader
        sx={{ 
            pb: 1.5,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`
        }}
        title={
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography variant="h6" fontWeight={800} color="text.primary" sx={{ letterSpacing: -0.5 }}>
                #{order.id}
              </Typography>
              <Chip
                icon={<StatusIcon size={14} color={status.color} />}
                label={status.label}
                size="small"
                sx={{ 
                  bgcolor: alpha(status.color, 0.1), 
                  color: status.color, 
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  borderRadius: 1.5,
                  border: `1px solid ${alpha(status.color, 0.2)}`,
                  textTransform: "uppercase"
                }}
              />
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: theme.palette.text.secondary }}>
              <Clock size={14} />
              <Typography variant="caption" fontWeight={600}>
                {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Stack>
          </Stack>
        }
      />

      <CardContent sx={{ pt: 2.5 }}>
        <Stack spacing={3}>
          
          {/* Customer & Info Section */}
          <Box 
            sx={{ 
              p: 2, 
              bgcolor: alpha(theme.palette.background.default, 0.4), 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar 
                sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  color: theme.palette.primary.contrastText,
                  width: 40,
                  height: 40,
                  fontSize: '1rem',
                  fontWeight: 700
                }}
              >
                {(order.customerName || "U")[0]}
              </Avatar>
              <Box flex={1} minWidth={0}>
                <Typography variant="subtitle2" fontWeight={700} noWrap>
                    {order.customerName || "Guest Customer"}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Phone size={12} /> {order.customer_phone}
                    </Typography>
                    <Typography variant="caption" color="text.divider">|</Typography>
                    <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <MapPin size={12} /> {order.delivery_address}
                    </Typography>
                </Stack>
              </Box>
      
            </Stack>
          </Box>

          {/* Items Summary */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <Box sx={{ color: theme.palette.primary.main, display: 'flex' }}>
                <ClipboardList size={18} />
              </Box>
              <Typography variant="subtitle2" fontWeight={800} sx={{ color: theme.palette.text.primary }}>
                Order Items
              </Typography>
              <Chip 
                label={`${order.order_items?.length || 0} Items`}
                size="small"
                sx={{ ml: 'auto', height: 20, fontSize: '0.65rem', fontWeight: 700 }}
              />
            </Stack>
            
            <Stack spacing={1}>
              {(order.order_items || []).map((item: any) => (
                <Stack 
                  key={item.id} 
                  direction="row" 
                  justifyContent="space-between" 
                  alignItems="center"
                  sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    bgcolor: alpha(theme.palette.background.default, 0.5),
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box>
                    <Typography variant="body2" fontWeight={700} color="text.primary">
                        {item.menu_item?.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Qty: {item.quantity} × ${item.price}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight={800} color="primary.main">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* Special Instructions / Notes */}
          {order.notes && (
            <Stack 
                direction="row" 
                spacing={1.5} 
                sx={{ 
                    p: 1.5, 
                    bgcolor: alpha(theme.palette.warning.main, 0.05), 
                    borderRadius: 2, 
                    border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}` 
                }}
            >
              <MessageSquare size={16} color={theme.palette.warning.main} />
              <Box>
                <Typography variant="caption" fontWeight={800} color="warning.main" sx={{ display: 'block', textTransform: 'uppercase', mb: 0.5 }}>
                    Note from customer:
                </Typography>
                <Typography variant="body2" color="text.primary" fontWeight={500}>
                    {order.notes}
                </Typography>
              </Box>
            </Stack>
          )}

          <Divider sx={{ opacity: 0.6 }} />

          {/* Footer: Price & Actions */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', mb: 0.5, display: 'block' }}>
                Amount to Collect
              </Typography>
              <Typography variant="h5" fontWeight={900} color="text.primary">
                ${Number(order.total_price).toFixed(2)}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              {currentStatus !== "completed" && currentStatus !== "cancelled" && (
                <Button 
                  variant="outlined" 
                  color="error" 
                  size="medium"
                  onClick={() => handleCancelOrder(order.id)}
                  disabled={isUpdating}
                  sx={{ 
                    borderRadius: 2, 
                    fontWeight: 700,
                    borderColor: alpha(theme.palette.error.main, 0.3)
                  }}
                >
                  Cancel
                </Button>
              )}
              
              {nextStatus[currentStatus] && (
                <Button 
                  variant="contained" 
                  disableElevation
                  onClick={() => handleStatusUpdate(order.id, nextStatus[currentStatus]!)}
                  disabled={isUpdating}
                  endIcon={isUpdating ? <CircularProgress size={16} color="inherit" /> : <ChevronRight size={18} />}
                  sx={{ 
                    borderRadius: 2, 
                    px: 3,
                    fontWeight: 800,
                    textTransform: 'none',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                    "&:hover": {
                        boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                    }
                  }}
                >
                  {isUpdating ? "Processing..." : `Next: ${statusConfig[nextStatus[currentStatus]!].label}`}
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};