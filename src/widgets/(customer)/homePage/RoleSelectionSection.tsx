"use client";

import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function RoleSelectionSection() {
  const router = useRouter();

  const handleSelect = (role: "customer" | "restaurant_owner") => {
    localStorage.setItem("user_intent", role);
    router.push("/signUp");
  };

  return (
    <Box sx={{ py: 10 }}>
      <Typography
        variant="h4"
        fontWeight={800}
        textAlign="center"
        mb={6}
      >
        اختر دورك
      </Typography>

      <Grid container spacing={4}>
        {/* Customer */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 5,
              height: "100%",
              borderRadius: 4,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: 6,
              },
            }}
          >
            <Typography variant="h5" fontWeight={700} mb={2}>
              👤 زبون
            </Typography>
            <Typography color="text.secondary" mb={4}>
              تصفح المطاعم، اطلب بسهولة، وتابع طلباتك لحظة بلحظة
            </Typography>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleSelect("customer")}
            >
              المتابعة كزبون
            </Button>
          </Paper>
        </Grid>

        {/* Owner */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 5,
              height: "100%",
              borderRadius: 4,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: 6,
              },
            }}
          >
            <Typography variant="h5" fontWeight={700} mb={2}>
              🧑‍🍳 صاحب مطعم
            </Typography>
            <Typography color="text.secondary" mb={4}>
              أنشئ مطعمك، أدر المنيو، واستقبل الطلبات مباشرة
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleSelect("restaurant_owner")}
            >
              المتابعة كصاحب مطعم
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
