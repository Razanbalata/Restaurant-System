// widgets/cart/ui/CartSummary.tsx
import { Stack, Box, Typography, Button, Divider } from "@mui/material";
import { AppCard } from "@/shared/ui/Card/AppCard";
import { PlaceOrderButton } from "@/features/(customer)/order/postOrder/ui/PlaceOrderButton"; 

export function CartSummary({ total, subtotal, isEmpty }) {
  return (
    <AppCard sx={{ position: 'sticky', top: 20 }}>
      <Typography variant="h6" fontWeight="800" mb={3}>ملخص الحساب</Typography>
      <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary">المجموع الفرعي</Typography>
          <Typography fontWeight="600">{subtotal} ₪</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary">التوصيل</Typography>
          <Typography fontWeight="600" color="success.main">مجاني</Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontWeight="800">الإجمالي</Typography>
          <Typography variant="h6" fontWeight="800" color="primary">{total} ₪</Typography>
        </Box>
        
        {/* استخدمنا المكون الخاص بك مع ستايل الصورة */}
        <PlaceOrderButton 
          disabled={isEmpty}
          sx={{ 
            mt: 2, 
            py: 1.5, 
            bgcolor: '#1a365d', 
            '&:hover': { bgcolor: '#102a44' },
            borderRadius: 3
          }} 
        />
      </Stack>
    </AppCard>
  );
}