"use client";

import { Box, Typography, Stack, Container, useTheme, alpha } from "@mui/material";
import { useMe } from "@/features/user/api/use-me";
import { CartSkeleton } from "@/shared/ui/Skeletons/CartSkeleton";
import { CartItemRow } from "./CartItemRow";
import { CartSummary } from "./CartSummary"; 
import { AppCard } from "@/shared/ui/Card/AppCard";
import { useCart } from "@/features/(customer)/cart/api/useCart";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export function CartWidget() {
  const theme = useTheme();
  const { data: user, isLoading: userLoading } = useMe();
  const { items: cart, totalPrice: total } = useCart();

  if (userLoading) return <CartSkeleton />;
  
  if (!user) return (
    <Container sx={{ textAlign: "center", py: 15 }}>
      <Typography variant="h5" fontWeight={700}>Please login to view your cart</Typography>
    </Container>
  );

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" spacing={2} mb={6} justifyContent="center">
          <ShoppingCartOutlinedIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h3" fontWeight="900">Shopping Cart</Typography>
        </Stack>

        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, 
          gap: 4, 
          alignItems: "flex-start" 
        }}>
          {/* قائمة المنتجات */}
          <Stack spacing={2} sx={{ flex: 2, width: "100%" }} >
            {cart.length === 0 ? (
              <AppCard sx={{ textAlign: "center", py: 10, borderRadius: '24px' }}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: 80, opacity: 0.1, mb: 2 }} />
                <Typography variant="h6" color="text.secondary">Your cart is currently empty, start by adding your favorite meals!</Typography>
              </AppCard>
            ) : (
              cart.map((item) => (
                <AppCard key={item.menuItemId} sx={{ 
                  p: 2, 
                  borderRadius: '20px',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.01)' },
                  backgroundColor: theme.palette.background.default
                }}>
                  <CartItemRow item={item} />
                </AppCard>
              ))
            )}
          </Stack>

          {/* ملخص الحساب */}
          <Box sx={{ flex: 1, width: "100%", position: { md: "sticky" }, top: 100 }} >
            <CartSummary 
              total={total} 
              subtotal={total} 
              isEmpty={cart.length === 0} 
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}