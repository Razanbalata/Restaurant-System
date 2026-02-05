"use client";
import { Box, Container, Typography, Grid, Card, Button, Stack, useTheme, alpha } from "@mui/material";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const Pricing = () => {
  const theme = useTheme();
  const plans = [
    { name: "Customer", price: "Free", period: "forever", desc: "Perfect for food lovers", features: ["Browse all restaurants", "Place unlimited orders", "Real-time tracking", "Save favorites"], cta: "Start Ordering", popular: false },
    { name: "Restaurant Starter", price: "$29", period: "/month", desc: "For small restaurants", features: ["Up to 50 menu items", "Basic analytics", "Order management", "Standard support"], cta: "Start Free Trial", popular: true },
    { name: "Restaurant Pro", price: "$79", period: "/month", desc: "For growing businesses", features: ["Unlimited menu items", "Advanced analytics", "Multi-location support", "Custom branding"], cta: "Contact Sales", popular: false },
  ];

  return (
    <Box id="pricing" sx={{ py: 15 }}>
      <Container maxWidth="lg">
        <Box textAlign="center" sx={{ mb: 10 }}>
          <Typography color="primary" sx={{ fontWeight: 700, mb: 1 }}>Pricing</Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Simple, transparent pricing</Typography>
        </Box>

        <Grid container spacing={4} alignItems="center">
          {plans.map((plan, i) => (
            <Grid size={{xs:12,md:4}} key={i}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card sx={{ 
                  p: 4, borderRadius: "24px", position: "relative",
                  border: plan.popular ? "2px solid" : "1px solid",
                  borderColor: plan.popular ? "primary.main" : "divider",
                  bgcolor: plan.popular ? alpha(theme.palette.primary.main, 0.03) : "background.paper",
                  boxShadow: plan.popular ? theme.shadows[10] : theme.shadows[1]
                }}>
                  {plan.popular && (
                    <Box sx={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", bgcolor: "primary.main", color: "white", px: 2, py: 0.5, borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700 }}>
                      Most Popular
                    </Box>
                  )}
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{plan.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{plan.desc}</Typography>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h3" component="span" sx={{ fontWeight: 800 }}>{plan.price}</Typography>
                    <Typography variant="body1" component="span" color="text.secondary">{plan.period}</Typography>
                  </Box>
                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {plan.features.map(feat => (
                      <Stack key={feat} direction="row" spacing={1.5} alignItems="center">
                        <CheckCircle2 size={18} color={theme.palette.success.main} />
                        <Typography variant="body2">{feat}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button variant={plan.popular ? "contained" : "outlined"} fullWidth size="large" sx={{ py: 1.5, borderRadius: "12px" }}>
                    {plan.cta}
                  </Button>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};