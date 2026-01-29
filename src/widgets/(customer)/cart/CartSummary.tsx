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
  const isPending = false; 

  return (
    <AppCard sx={{ 
      p: 4, 
      borderRadius: '28px', 
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.shadows[4],
      bgcolor: theme.palette.background.default
    }}>
      <Typography variant="h5" fontWeight="900" mb={4} textAlign="center">
        Order Summary
      </Typography>

      <Stack spacing={2.5}>
        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary" fontWeight={600}>Subtotal</Typography>
          <Typography fontWeight="800">{subtotal} ₪</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            {/* <LocalTruckOutlinedIcon fontSize="small" color="success" /> */}
            <Typography color="text.secondary" fontWeight={600}>Delivery Fees</Typography>
          </Stack>
          <Typography fontWeight="800" color="success.main">Free</Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="900">Total</Typography>
          <Typography variant="h4" fontWeight="900" color="primary">
            {total} ₪
          </Typography>
        </Box>

        <Button
          fullWidth
          size="large"
          variant="contained"
          disabled={isEmpty || isPending}
          onClick={() => router.push("/checkout")}
          sx={{ 
            py: 2, 
            borderRadius: "16px", 
            fontWeight: 900, 
            fontSize: "1.1rem",
            boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
            mt: 2
          }}
        >
          {isPending ? "Processing..." : "Complete Purchase ✨"}
        </Button>
        
        <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
          Prices include applicable taxes
        </Typography>
      </Stack>
    </AppCard>
  );
}