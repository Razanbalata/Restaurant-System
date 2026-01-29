"use client";
import { Box, Button, Grid, Paper, Typography, useTheme, alpha } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RoleSelectionSection() {
  const router = useRouter();
  const theme = useTheme();

  const handleSelect = (role: "customer" | "restaurant_owner") => {
    localStorage.setItem("user_intent", role);
    router.push("/signUp");
  };

  return (
    <Box sx={{ py: 10, bgcolor: "background.default" }}>
      <Typography variant="h4" fontWeight={800} textAlign="center" mb={6} color="text.primary">
        Choose Your Role
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {[
          { 
            role: "customer", 
            title: "👤 Customer", 
            desc: "Browse restaurants, order easily, and track your orders in real-time", 
            variant: "contained" 
          },
          { 
            role: "restaurant_owner", 
            title: "🧑‍🍳 Restaurant Owner", 
            desc: "Create your restaurant, manage menu, receive orders directly", 
            variant: "outlined" 
          }
        ].map((item) => (
          <Grid size={{xs:12,md:5}} key={item.role}>
            <Paper
              elevation={0}
              sx={{
                p: 5,
                height: "100%",
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: "background.paper",
                transition: theme.transitions.create(['transform', 'box-shadow', 'border-color']),
                "&:hover": {
                  transform: "translateY(-8px)",
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
                },
              }}
            >
              <Typography variant="h5" fontWeight={700} mb={2} color="text.primary">
                {item.title}
              </Typography>
              <Typography color="text.secondary" mb={4} sx={{ minHeight: '3em' }}>
                {item.desc}
              </Typography>
              <Button
                fullWidth
                size="large"
                variant={item.variant as any}
                sx={{ fontWeight: 700, borderRadius: 2 }}
                onClick={() => handleSelect(item.role as any)}
              >
                {item.role === "customer" ? "Continue as Customer" : "Continue as Restaurant Owner"}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}