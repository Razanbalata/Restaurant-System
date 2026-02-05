// app/(auth)/login/page.tsx
'use client';

import LoginForm from "@/features/user/ui/LoginForm";
import { Box, alpha, useTheme } from "@mui/material";
import { motion } from "framer-motion";

export default function LoginPage() {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ width: "100%", maxWidth: "440px", padding: '0 20px' }}
    >
      <Box sx={{ 
        p: { xs: 3, md: 5 }, 
        borderRadius: "32px", 
        backdropFilter: "blur(16px)",
        bgcolor: alpha(theme.palette.background.paper, 0.7),
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: "0 20px 40px rgba(0,0,0,0.05)"
      }}>
        <LoginForm />
      </Box>
    </motion.div>
  );
}