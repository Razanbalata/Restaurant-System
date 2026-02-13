"use client";

import {
  Box,
  Typography,
  Stack,
  Container,
  useTheme,
  alpha,
} from "@mui/material";
import { useMe } from "@/features/user/api/use-me";
import { CartSkeleton } from "@/shared/ui/Skeletons/CartSkeleton";
import { CartItemRow } from "./CartItemRow";
import { CartSummary } from "./CartSummary";
import { AppCard } from "@/shared/ui/Card/AppCard";
import { useCart } from "@/features/(customer)/cart/api/useCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export function CartWidget() {
  const theme = useTheme();
  const { data: user, isLoading: userLoading } = useMe();
  const { items: cart, totalPrice: total } = useCart();

  if (userLoading) return <CartSkeleton />;

  return (
    <Box
      sx={{
        background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${theme.palette.background.default} 100%)`,
        minHeight: "100vh",
        py: { xs: 4, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight="950"
          mb={6}
          sx={{ letterSpacing: "-2px" }}
        >
          My <span style={{ color: theme.palette.primary.main }}>Cart.</span>
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 5,
            alignItems: "flex-start",
          }}
        >
          {/* List Section */}
          <Stack
            spacing={2.5}
            sx={{
              flex: 1.8,
              width: "100%",
              backgroundColor: theme.palette.background.default,
            }}
          >
            {cart.length === 0 ? (
              <AppCard
                sx={{
                  textAlign: "center",
                  py: 12,
                  borderRadius: "10px",
                  border: `2px dashed ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.default,
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"flex-start"
                }}
              >
                <Box
                  sx={{
                    bgcolor: alpha(theme.palette.background.default, 0.05),
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto mb 24px",
                  }}
                >
                  <ShoppingCartOutlinedIcon
                    sx={{ fontSize: 70, color: "primary.main", opacity: 0.4 }}
                  />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight="800" gutterBottom>
                    Your cart is empty
                  </Typography>
                  <Typography color="text.secondary">
                    Looks like you haven't added any items yet.
                  </Typography>
                </Box>
              </AppCard>
            ) : (
              cart.map((item) => (
                <AppCard
                  key={item.menuItemId}
                  sx={{
                    p: 2.5,
                    borderRadius: "24px",
                    border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateX(8px)",
                      borderColor: theme.palette.background.default,
                    },
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <CartItemRow item={item} />
                </AppCard>
              ))
            )}
          </Stack>

          {/* Sidebar Section */}
          <Box
            sx={{ flex: 1, width: "100%", position: { md: "sticky" }, top: 40 }}
          >
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
