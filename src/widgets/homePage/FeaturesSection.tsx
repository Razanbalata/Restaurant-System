"use client";
import { Box, Container, Typography, Grid, Card, alpha, useTheme, Stack } from "@mui/material"; // تأكد من استيراد Stack
import { Users, ShoppingBag, Clock, Star, ChefHat, BarChart3, Utensils, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export const Features = () => {
  const theme = useTheme();
  
  const customerFeatures = [
    { icon: ShoppingBag, title: "Easy Ordering", desc: "Browse menus and checkout in seconds with our intuitive interface." },
    { icon: Clock, title: "Real-time Tracking", desc: "Track your order from kitchen to doorstep with live status updates." },
    { icon: Star, title: "Reviews & Ratings", desc: "Read authentic reviews and share your dining experience." },
  ];

  const ownerFeatures = [
    { icon: BarChart3, title: "Analytics Dashboard", desc: "Get insights into your sales, popular items, and customer behavior with detailed analytics." },
    { icon: Utensils, title: "Menu Management", desc: "Easily add, edit, or remove menu items. Set prices, availability, and categories." },
    { icon: TrendingUp, title: "Order Management", desc: "Manage incoming orders efficiently with status updates and customer notifications." },
  ];

  return (
    <Box id="features" sx={{ py: 15, bgcolor: alpha(theme.palette.secondary.main, 0.3) }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" sx={{ mb: 10 }}>
          <Typography color="primary" sx={{ fontWeight: 700, mb: 1, fontSize: "0.875rem", textTransform: "uppercase" }}>Features</Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: "1.875rem", md: "2.5rem" } }}>Everything you need to succeed</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}>
             Whether you are a hungry customer or a busy restaurant owner, we have got you covered.
          </Typography>
        </Box>

        {/* --- CUSTOMERS SECTION --- */}
        <Stack spacing={2} direction="row" alignItems="center" sx={{ mb: 4 }}>
           <Box sx={{ p: 1, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: "8px", display: "flex" }}>
             <Users size={20} color={theme.palette.primary.main} />
           </Box>
           <Typography variant="h5" sx={{ fontWeight: 700 }}>For Customers</Typography>
        </Stack>

        <Grid container spacing={3} sx={{ mb: 12 }}>
          {customerFeatures.map((f, i) => (
            <Grid size={{xs:12,md:4}} key={i}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card sx={{ p: 4, height: "100%", border: "1px solid", borderColor: "divider", bgcolor: "background.paper", "&:hover": { borderColor: "primary.main", boxShadow: theme.shadows[4] } }}>
                  <Box sx={{ mb: 3, p: 1.5, display: "inline-flex", borderRadius: "12px", bgcolor: alpha(theme.palette.primary.main, 0.1), color: "primary.main", transition: "0.3s" }}>
                    <f.icon size={24} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>{f.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{f.desc}</Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* --- OWNERS SECTION --- */}
        <Stack spacing={2} direction="row" alignItems="center" sx={{ mb: 4 }}>
           {/* هنا استخدمنا الـ secondary أو لون مخصص يميل للبرتقالي كما في Tailwind الأصلي */}
           <Box sx={{ p: 1, bgcolor: alpha(theme.palette.warning.main, 0.1), borderRadius: "8px", display: "flex" }}>
             <ChefHat size={20} color={theme.palette.warning.main} />
           </Box>
           <Typography variant="h5" sx={{ fontWeight: 700 }}>For Restaurant Owners</Typography>
        </Stack>

        <Grid container spacing={3}>
          {ownerFeatures.map((f, i) => (
            <Grid size={{xs:12,md:4}} key={i}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card sx={{ p: 4, height: "100%", border: "1px solid", borderColor: "divider", bgcolor: "background.paper", "&:hover": { borderColor: "warning.main", boxShadow: theme.shadows[4] } }}>
                  {/* أيقونات المالك باللون التحذيري (البرتقالي) لتمييزها */}
                  <Box sx={{ mb: 3, p: 1.5, display: "inline-flex", borderRadius: "12px", bgcolor: alpha(theme.palette.warning.main, 0.1), color: "warning.main" }}>
                    <f.icon size={24} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>{f.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{f.desc}</Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};