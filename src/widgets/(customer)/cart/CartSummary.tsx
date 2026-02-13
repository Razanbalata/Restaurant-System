"use client";
import { Stack, Box, Typography, Button, Divider, useTheme, alpha } from "@mui/material";
import { AppCard } from "@/shared/ui/Card/AppCard";
import { useRouter } from "next/navigation";

interface CartSummaryProps {
  total: number;
  subtotal: number;
  isEmpty: boolean;
}


export function CartSummary({ total, subtotal, isEmpty }: CartSummaryProps) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <AppCard sx={{ 
      p: 3, 
      borderRadius: '32px', 
      background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      boxShadow: '0 20px 40px -12px rgba(0,0,0,0.05)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* لمسة جمالية خلفية */}
      <Box sx={{
        position: 'absolute', top: -50, right: -50, width: 150, height: 150,
        borderRadius: '50%', background: alpha(theme.palette.primary.main, 0.03)
      }} />

      <Typography variant="h5" fontWeight="900" mb={3} sx={{ letterSpacing: '-1px' }}>
        Order Summary
      </Typography>

      <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary" fontWeight={500}>Subtotal</Typography>
          <Typography fontWeight={700} variant="body1">{subtotal} ₪</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary" fontWeight={500}>Delivery Fee</Typography>
          <Typography fontWeight={700} color="success.main" variant="body1">FREE</Typography>
        </Box>

        <Divider sx={{ my: 1, opacity: 0.6 }} />

        <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={2}>
          <Typography variant="h6" fontWeight="800" fontSize={{sm:"1.1rem",md:"1rem"}}>Total Amount</Typography>
          <Box sx={{ textAlign: 'right' }} display={{sm:"flex"}}>
             <Typography variant="h6" fontWeight="950" color="primary.main" sx={{ lineHeight: 1 }}>
              {total} ₪
            </Typography>
            <Typography variant="caption" color="text.secondary">Incl. VAT</Typography>
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          disabled={isEmpty}
          onClick={() => router.push("/customer/checkout")}
          sx={{ 
            py: 2.5, 
            borderRadius: "18px", 
            fontWeight: 900, 
            fontSize: "1.1rem",
            textTransform: 'none',
            boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 15px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
            }
          }}
        >
          Check Out Now ✨
        </Button>
      </Stack>
    </AppCard>
  );
}