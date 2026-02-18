"use client";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { useMenu } from "@/features/(customer)/menu/get-menu/useMenu";
import {
  Box,
  Typography,
  Stack,
  Divider,
  alpha,
  useTheme,
  Avatar,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

export function CheckoutSummary({ items, totalPrice }: any) {
  const theme = useTheme();
  const router = useRouter()

  // هل يوجد صنف غير متوفر؟
  const hasUnavailable = items.some((item: any) => item.is_active === false);

  // مجموع فقط الأصناف المتوفرة
  const activeTotal = items
    .filter((item: any) => item.is_active)
    .reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  console.log(items);
  return (
    <Stack spacing={2.5}>
      <Typography variant="h6" fontWeight="900">
        Your Order
      </Typography>

      <Box
        sx={{
          maxHeight: "320px",
          overflowY: "auto",
          pr: 1,
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: alpha(theme.palette.divider, 0.2),
            borderRadius: "10px",
          },
        }}
      >
        {items.map((item: any) => {
          const itemTotal = item.price * item.quantity;

          return (
            <Box
              key={item.menuItemId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2.5,
                alignItems: "center",
                opacity: item.is_active ? 1 : 0.5,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={item.image || "/placeholder-food.jpg"}
                  alt={item.name}
                  variant="rounded"
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: "12px",
                  }}
                />

                <Box>
                  <Typography fontWeight="800" variant="body2" noWrap>
                    {item.name}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Qty: {item.quantity} × {item.price} ₪{" "}
                    {!item.is_active && "(Unavailable)"}
                  </Typography>
                </Box>
              </Stack>

              <Typography fontWeight="900">
                {item.is_active ? itemTotal : "-"} ₪
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Divider sx={{ borderStyle: "dashed", opacity: 0.6 }} />

      <Stack spacing={1.5}>
        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary">Subtotal</Typography>
          <Typography fontWeight="700">{activeTotal} ₪</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary">Delivery Fee</Typography>
          <Typography fontWeight="800" color="success.main">
            FREE
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ pt: 1.5, mt: 1 }}
        >
          <Typography variant="h6" fontWeight="900">
            Total
          </Typography>
          <Typography variant="h5" fontWeight="900" color="primary.main">
            {activeTotal} ₪
          </Typography>
        </Box>
      </Stack>

      {hasUnavailable && (
        <Typography color="error" variant="body2" mt={1}>
         Some items in your cart are no longer available. Please remove them to continue.
             <Button
      variant="outlined"
      color="error"
      fullWidth
      onClick={() => router.push("/customer/cart")}
    >
      Go Back to Cart
    </Button>
        </Typography>
      )}
    </Stack>
  );
}
