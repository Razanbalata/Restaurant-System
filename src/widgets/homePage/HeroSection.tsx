"use client";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Grid,
  alpha,
  useTheme,
} from "@mui/material";
import { ShoppingBag, Store, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const HeroSection = () => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Box
      sx={{
        pt: { xs: 15, md: 20 },
        pb: { xs: 10, md: 15 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blurs الدوائر الملونة خلف الكلام */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "15%",
          width: "40vw",
          height: "40vw",
          bgcolor: alpha(theme.palette.primary.main, 0.07),
          borderRadius: "50%",
          filter: "blur(100px)",
          zIndex: -1,
        }}
      />

      <Container maxWidth="lg">
        <Box textAlign="center">
          <motion.div {...fadeInUp}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1,
                borderRadius: "100px",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: alpha(theme.palette.secondary.main, 0.4),
                mb: 4,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: "success.main",
                  borderRadius: "50%",
                }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Trusted by 500+ restaurants
              </Typography>
            </Box>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "4.5rem" },
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.1,
              }}
            >
              Manage Your Restaurant{" "}
              <span style={{ color: theme.palette.primary.main }}>Orders</span>{" "}
              Like Never Before
            </Typography>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "1.25rem",
                maxWidth: "700px",
                mx: "auto",
                mb: 5,
              }}
            >
              Streamline your restaurant operations with our powerful order
              management system. Perfect for food lovers and business owners.
            </Typography>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingBag />}
                endIcon={<ArrowRight />}
                sx={{ height: 56, px: 4, fontSize: "1rem" }}
                onClick={()=>router.push("signUp")}
              >
                Order as Customer
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<Store />}
                sx={{
                  height: 56,
                  px: 4,
                  fontSize: "1rem",
                  bgcolor: "transparent",
                }}
                onClick={()=>router.push("signUp")}
              >
                Manage My Restaurant
              </Button>
            </Stack>
          </motion.div>

          <Grid container spacing={4} sx={{ mt: 10 }}>
            {[
              { v: "50K+", l: "Orders Delivered" },
              { v: "500+", l: "Restaurants" },
              { v: "4.9", l: "App Rating" },
              { v: "24/7", l: "Support" },
            ].map((s, i) => (
              /* xs={6} يعني عنصرين بجانب بعض في الموبايل | md={3} يعني 4 عناصر في الديسكتوب */
              <Grid size={{xs:6,md:3}} key={i}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: "text.primary",
                      fontSize: { xs: "1.875rem", md: "2.25rem" }, // تطابق text-3xl و text-4xl في تايلوند
                    }}
                  >
                    {s.v}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: "text.secondary",
                      fontSize: "0.875rem", // تطابق text-sm
                    }}
                  >
                    {s.l}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
