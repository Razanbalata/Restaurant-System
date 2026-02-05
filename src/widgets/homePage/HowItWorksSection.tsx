"use client";
import { Box, Container, Typography, Grid, Stack, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";

export const HowItWorksSection = () => {
  const theme = useTheme();

  const steps = [
    {
      step: "01",
      title: "Create Account",
      description: "Sign up as a customer or restaurant owner in under a minute.",
    },
    {
      step: "02",
      title: "Browse or Setup",
      description: "Customers browse restaurants. Owners set up their menu and profile.",
    },
    {
      step: "03",
      title: "Start Ordering",
      description: "Place orders easily or manage incoming orders from your dashboard.",
    },
  ];

  return (
    <Box id="how-it-works" sx={{ py: 15, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" sx={{ mb: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography color="primary" sx={{ fontWeight: 700, mb: 1, fontSize: "0.875rem", textTransform: "uppercase" }}>
              How It Works
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: "1.875rem", md: "2.5rem" } }}>
              Start in 3 simple steps
            </Typography>
          </motion.div>
        </Box>

        {/* Steps Grid */}
        <Grid container spacing={6}>
          {steps.map((item, index) => (
            <Grid size={{xs:12,md:4}} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                style={{ position: "relative", textAlign: "center" }}
              >
                {/* Number Box */}
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    mx: "auto",
                    mb: 4,
                    boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
                  }}
                >
                  {item.step}
                </Box>

                {/* Connecting Line (Desktop Only) */}
                {index < 2 && (
                  <Box
                    sx={{
                      display: { xs: "none", md: "block" },
                      position: "absolute",
                      top: 32,
                      left: "calc(50% + 40px)",
                      width: "100%",
                      height: "2px",
                      background: `linear-gradient(to right, ${theme.palette.primary.main}, transparent)`,
                      zIndex: 0,
                      opacity: 0.3,
                    }}
                  />
                )}

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", px: { md: 2 } }}>
                  {item.description}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};