"use client";

import {
  List, ListItem, ListItemText, Stack,
  Button, IconButton, Divider, Typography, Box, CircularProgress, Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart/api/useCart";
import { useUpdateCart } from "@/features/cart/api/useUpdateCart";
import { useDeleteCartItem } from "@/features/cart/api/useDeleteCartItem";
import { usePlaceOrder } from "@/features/(admin)/order/postOrder/api/usePlaceOrder"; 

export function CartItems({ userId }: { userId: string }) {
  const router = useRouter();
  
  // 1. جلب بيانات السلة
  const { data: cart = [], isLoading: isCartLoading } = useCart(userId.toString());
  
  // 2. هوكس العمليات (تحديث، حذف، إنشاء طلب)
  const updateCart = useUpdateCart();
  const deleteItem = useDeleteCartItem();
  const { mutate: placeOrder, isPending: isPlacingOrder } = usePlaceOrder();

  // حساب الإجمالي
  const totalPrice = cart.reduce((s, i) => s + Number(i.quantity) * Number(i.price_at_time), 0);

  // دالة معالجة إتمام الطلب
  const handleCheckout = () => {
    placeOrder(undefined, {
      onSuccess: () => {
        // التوجه لصفحة الطلبات بعد النجاح
        router.push("/order");
      },
      onError: (err) => {
        alert("حدث خطأ أثناء تنفيذ الطلب، يرجى المحاولة لاحقاً");
      }
    });
  };

  if (isCartLoading) {
    return (
      <Box display="flex" justifyContent="center" p={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        سلة المشتريات
      </Typography>

      {cart.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#f9f9f9" }}>
          <Typography color="textSecondary">السلة فارغة حالياً</Typography>
          <Button onClick={() => router.push("/")} sx={{ mt: 2 }}>
            العودة للقائمة
          </Button>
        </Paper>
      ) : (
        <>
          <List sx={{ bgcolor: "background.paper", borderRadius: 2 }}>
            {cart.map((item) => (
              <Box key={item.id}>
                <ListItem
                  secondaryAction={
                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* زر تقليل الكمية */}
                      <Button 
                        size="small"
                        variant="outlined"
                        onClick={() => updateCart.mutate({ cartItemId: item.id, newQuantity: item.quantity - 1 })} 
                        disabled={item.quantity <= 1 || updateCart.isPending}
                      >
                        −
                      </Button>

                      <Typography sx={{ minWidth: 20, textAlign: "center" }}>
                        {updateCart.isPending && updateCart.variables?.cartItemId === item.id 
                          ? "..." 
                          : item.quantity}
                      </Typography>

                      {/* زر زيادة الكمية */}
                      <Button 
                        size="small"
                        variant="outlined"
                        onClick={() => updateCart.mutate({ cartItemId: item.id, newQuantity: item.quantity + 1 })}
                        disabled={updateCart.isPending}
                      >
                        +
                      </Button>

                      {/* زر الحذف */}
                      <IconButton 
                        color="error" 
                        onClick={() => {
                          if(confirm("هل تريد حذف هذا الصنف؟")) deleteItem.mutate(item.id)
                        }}
                        disabled={deleteItem.isPending}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={item.menu_items?.name}
                    secondary={`${item.price_at_time}₪ للقطعة`}
                    primaryTypographyProps={{ fontWeight: "medium" }}
                  />
                </ListItem>
                <Divider component="li" />
              </Box>
            ))}
          </List>

          {/* ملخص السلة وزر التأكيد */}
          <Paper elevation={0} sx={{ p: 2, mt: 3, bgcolor: "#f0f7ff", borderRadius: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">الإجمالي:</Typography>
              <Typography variant="h6" color="primary" fontWeight="bold">
                {totalPrice}₪
              </Typography>
            </Stack>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
              disabled={isPlacingOrder || cart.length === 0}
              sx={{ py: 1.5, fontSize: "1.1rem", fontWeight: "bold" }}
            >
              {isPlacingOrder ? "جاري معالجة الطلب..." : "تأكيد الطلب الآن"}
            </Button>
          </Paper>
        </>
      )}
    </Box>
  );
}