// // widgets/cart/ui/CartPageLayout.tsx
// "use client";

// import { Box, Grid, Typography, Paper, Stack } from "@mui/material";
// import { useMe } from "@/features/user/api/use-me";
// import { CartItemsList } from "./CartItemList"; 
// import { CartSummary } from "./CartSummary"; 

// export function CartWidget() {
//   const { data: user, isLoading } = useMe();

//   if (isLoading) return <Typography>Loading...</Typography>;
//   if (!user) return <Typography>Please login</Typography>;

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
//       <Typography variant="h4" mb={4} fontWeight="bold">
//         🛒 Your Cart
//       </Typography>

//       <Grid container spacing={4}>
//         {/* Products List */}
//         <Grid item xs={12} md={8}>
//           <Stack spacing={2}>
//             <CartItemsList userId={user.id} />
//           </Stack>
//         </Grid>

//         {/* Summary */}
//         <Grid item xs={12} md={4}>
//           <CartSummary userId={user.id} />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }



// widgets/cart/ui/CartWidget.tsx
"use client";

import { Box, Grid, Typography, Stack } from "@mui/material";
import { useMe } from "@/features/user/api/use-me";
import { useCartLogic } from "@/features/cart/model/use-cart-logic";
import { CartSkeleton } from "@/shared/ui/Skeletons/CartSkeleton";
import { CartItemRow } from "./CartItemRow"; 
import { CartSummary } from "./CartSummary";
import { AppCard } from "@/shared/ui/Card/AppCard"; 

export function CartWidget() {
  const { data: user, isLoading: userLoading } = useMe();
  const { cart, total, update, remove, isLoading: cartLoading } = useCartLogic(user?.id);

  if (userLoading || cartLoading) return <CartSkeleton />;
  if (!user) return <Typography sx={{ textAlign: 'center', mt: 10 }}>يرجى تسجيل الدخول</Typography>;

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
    mx: "auto"
  }}
>
  {/* الجزء الخاص بالمنتجات - Products List */}
  <Box 
    sx={{ 
      flex: 2, // يأخذ مساحة أكبر (ضعف الـ Summary)
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 2 
    }}
  >
    {cart.length === 0 ? (
      <AppCard sx={{ textAlign: 'center', py: 8 }}>السلة فارغة حالياً</AppCard>
    ) : (
      cart.map((item) => (
        <AppCard key={item.id} sx={{ width: "100%" }}>
          <CartItemRow
            item={{
              name: item.menu_items?.name,
              image: item.menu_items?.image,
              price: item.price_at_time,
              quantity: item.quantity
            }}
            onIncrease={() => update.mutate({ cartItemId: item.id, newQuantity: item.quantity + 1 })}
            onDecrease={() => update.mutate({ cartItemId: item.id, newQuantity: item.quantity - 1 })}
            onDelete={() => remove.mutate(item.id)}
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
      top: 20 
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