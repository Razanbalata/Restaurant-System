
"use client";
import { Box, Container, Stack, Typography, Button, alpha, useTheme } from "@mui/material";
import { Utensils } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import ToggleTheme from "@/shared/ui/ToggleTheme";
import { useColorMode } from "@/app/providers/ThemeProvider";

export const Navbar = () => {
  const theme = useTheme();
  const {toggleColorMode} = useColorMode()
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: alpha(theme.palette.background.default, 0.8),
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2 }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
            <Box sx={{ bgcolor: "primary.main", p: 1, borderRadius: "12px", display: "flex" }}>
              <Utensils size={20} color={theme.palette.primary.contrastText} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", letterSpacing: "-0.5px" }}>
              FoodFlow
            </Typography>
          </Link>

          <Stack direction="row" spacing={4} sx={{ display: { xs: "none", md: "flex" } }}>
            {["Features", "How it Works", "Pricing"].map((item) => (
              <Typography key={item} component="a" href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                sx={{ fontSize: "0.875rem", color: "text.secondary", textDecoration: "none", fontWeight: 500, "&:hover": { color: "primary.main" } }}>
                {item}
              </Typography>
            ))}
          </Stack>

          <Stack direction="row" spacing={1.5}>
            <ToggleTheme onToggle={toggleColorMode} open={true}/>
            <Button component={Link} href="/login" variant="text" color="inherit" sx={{ fontWeight: 600 }}>Login</Button>
            <Button component={Link} href="/signUp" variant="contained" sx={{ borderRadius: "10px", px: 3 }}>Get Started</Button>
          </Stack>
        </Stack>
      </Container>
    </motion.nav>
  );
};