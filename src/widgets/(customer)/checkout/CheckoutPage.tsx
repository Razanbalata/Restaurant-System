"use client";
import { Box, Container, Typography, Stack, useTheme, alpha } from "@mui/material";
import { useState } from "react";
import { useCart } from "@/features/(customer)/cart/api/useCart";
import { AppCard } from "@/shared/ui/Card/AppCard";
import { DeliveryForm } from "./DeliveryForm";
import { CheckoutSummary } from "./CheckoutSummary"; 
import { PlaceOrderButton } from "@/features/(customer)/order/postOrder/ui/PlaceOrderButton";
import { CheckoutSkeleton } from "@/shared/ui/Skeletons/CheckoutSkeleton"; 
import { useMe } from "@/features/user/api/use-me";

export default function CheckoutComponent() {
  const theme = useTheme();
  const {data:user} = useMe()
  const { items, totalPrice } = useCart();
  const [formData, setFormData] = useState({ address: "", phone: user?.phone, notes: "" });

  // محاكاة حالة التحميل لو أردت (أو استخدم isLoading من السيرفر)
  const isLoading = false; 

  if (isLoading) return <CheckoutSkeleton />;

  if (items.length === 0) {
    return (
      <Container sx={{ py: 20, textAlign: 'center',backgroundColor:theme.palette.background.default }}>
        <Typography variant="h4" fontWeight="900">Your cart is empty 🛒</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight="950" mb={5} sx={{ letterSpacing: '-1.5px' }}>
          Checkout
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="flex-start">
          {/* اليمين: حقول البيانات */}
          <Box sx={{ flex: 1.8, width: "100%" }}>
            <AppCard sx={{ p: { xs: 3, md: 5 }, borderRadius: 'px',backgroundColor:theme.palette.background.default }}>
              <DeliveryForm formData={formData} setFormData={setFormData} />
            </AppCard>
          </Box>

          {/* اليسار: الملخص */}
          <Box sx={{ flex: 1, width: "100%", position: { md: "sticky" }, top: 40 }}>
            <AppCard sx={{ 
              p: 4, 
              borderRadius: 'px',
              bgcolor: alpha(theme.palette.primary.main, 0.02),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}>
              <CheckoutSummary items={items} totalPrice={totalPrice} />
              <Box sx={{ mt: 4 }}>
                <PlaceOrderButton formData={formData} />
              </Box>
            </AppCard>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}