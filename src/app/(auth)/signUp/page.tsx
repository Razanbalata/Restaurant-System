"use client";

import SignupForm from "@/features/user/ui/SignupForm";
import { Box, alpha, useTheme } from "@mui/material";
import { motion } from "framer-motion";

export default function SignUpPage() {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ width: "100%", maxWidth: "450px" }}
    >
      <Box sx={{ 
        p: { xs: 3, md: 5 }, 
        borderRadius: "32px", 
        backdropFilter: "blur(16px)",
        bgcolor: alpha(theme.palette.background.paper, 0.75),
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: "0 20px 40px rgba(0,0,0,0.05)"
      }}>
        <SignupForm />
      </Box>
    </motion.div>
  );
}