"use client";

import {
  Box,
  Container,
  Typography,
  Stack,
  TextField,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useCart } from "@/features/(customer)/cart/api/useCart";
import { useRouter } from "next/navigation";
import { PlaceOrderButton } from "@/features/(customer)/order/postOrder/ui/PlaceOrderButton";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, restaurantId, clearCart } = useCart();
  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    notes: "",
  });
    const { address, phone, notes } = formData;
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <Typography sx={{ mt: 10, textAlign: "center" }}>
        لا يوجد عناصر في السلة
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="900" mb={4}>
        إتمام الطلب 🧾
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        {/* Left - Form */}
        <Paper sx={{ p: 4, flex: 2, borderRadius: 4 }}>
          <Typography fontWeight="800" mb={2}>
            معلومات التوصيل
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="العنوان"
              value={address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              fullWidth
            />

            <TextField
              label="رقم الهاتف"
              value={phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              fullWidth
            />

            <TextField
              label="ملاحظات (اختياري)"
              value={notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              multiline
              rows={3}
              fullWidth
            />
          </Stack>
        </Paper>

        {/* Right - Summary */}
        <Paper sx={{ p: 4, flex: 1, borderRadius: 4 }}>
          <Typography fontWeight="800" mb={2}>
            ملخص الطلب
          </Typography>

          <Stack spacing={2}>
            {items.map((item) => (
              <Box
                key={item.menuItemId}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>
                 {item.quantity} x {item.name}  
                </Typography>
                <Typography>
                  {item.price * item.quantity} $
                </Typography>
              </Box>
            ))}

            <Divider />

            <Box
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography fontWeight="800">الإجمالي</Typography>
              <Typography fontWeight="800">
                {totalPrice} $
              </Typography>
            </Box>

            <PlaceOrderButton formData={formData} />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
