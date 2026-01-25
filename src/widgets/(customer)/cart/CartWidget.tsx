
// widgets/cart/ui/CartWidget.tsx
"use client";

import { Box, Grid, Typography, Stack } from "@mui/material";
import { useMe } from "@/features/user/api/use-me";
import { CartSkeleton } from "@/shared/ui/Skeletons/CartSkeleton";
import { CartItemRow } from "./CartItemRow";
import { CartSummary } from "./CartSummary"; 
import { AppCard } from "@/shared/ui/Card/AppCard";
import { useCart } from "@/features/(customer)/cart/api/useCart";

export function CartWidget() {
  const { data: user, isLoading: userLoading } = useMe();
  const {
    items: cart,
    totalPrice: total,
    updateQty,
    removeItem: remove,
  } = useCart();
  console.log("cart", cart, "total", total);

  if (userLoading || !user) return <CartSkeleton />;
  if (!user)
    return (
      <Typography sx={{ textAlign: "center", mt: 10 }}>
        يرجى تسجيل الدخول
      </Typography>
    );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" mb={6} fontWeight="900" textAlign="center">
        سلة المشتريات 🛒
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // عمودي في الموبايل، أفقي في الشاشة الكبيرة
          gap: 4,
          alignItems: "flex-start", // يمنع تمدد العناصر لآخر الصفحة طولياً
          justifyContent: "center", // يسنتر العناصر في منتصف الصفحة بالعرض
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {/* الجزء الخاص بالمنتجات - Products List */}
        <Box
          sx={{
            flex: 2, // يأخذ مساحة أكبر (ضعف الـ Summary)
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {cart.length === 0 ? (
            <AppCard sx={{ textAlign: "center", py: 8 }}>
              السلة فارغة حالياً
            </AppCard>
          ) : (
            cart.map((item) => (
              <AppCard key={item.menuItemId} sx={{ width: "100%" }}>
                <CartItemRow
                  item={item}
                />
              </AppCard>
            ))
          )}
        </Box>

        {/* الجزء الخاص بالملخص - Summary */}
        <Box
          sx={{
            flex: 1, // يأخذ مساحة أقل
            width: "100%",
            position: { md: "sticky" },
            top: 20,
          }}
        >
          <CartSummary
            total={total}
            subtotal={total}
            isEmpty={cart.length === 0}
          />
        </Box>
      </Box>
    </Box>
  );
}
