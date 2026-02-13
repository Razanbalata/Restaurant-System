'use client';

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { FloatingFoodIcons } from "@/features/user/ui/FoodBackground";
import ToggleTheme from "@/shared/ui/ToggleTheme"; // تأكد من مسار الاستيراد الصحيح
import { useColorMode } from "../providers/ThemeProvider";  // أو أي مكان تدير فيه الحالة

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  // نفترض أن لديك Context يدير التبديل، إذا كان الـ Toggle داخلياً مرر الدالة المطلوبة
   const { toggleColorMode } = useColorMode(); 

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", bgcolor: "background.default", position: "relative" }}>
      
      {/* --- زر تبديل الثيم الطافي --- */}
      <Box sx={{ 
        position: "absolute", 
        top: 20, 
        left: 20, 
        zIndex: 100, // أعلى من كل شيء
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
        borderRadius: '12px',
        backdropFilter: 'blur(8px)',
        border: `1px solid ${theme.palette.divider}`
      }}>
        <ToggleTheme 
            open={true} 
            onToggle={toggleColorMode} 
        />
      </Box>

      {/* 1. الخلفية المتحركة (تغطي نصف الشاشة الأيسر أو كامل الشاشة في الموبايل) */}
      <Box sx={{ position: "absolute", inset: 0, width: { xs: "100%", lg: "50%" }, zIndex: 0 }}>
        <FloatingFoodIcons />
      </Box>

      {/* 2. الجهة اليسرى (Login / Register) */}
      <Box sx={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center",
        zIndex: 1 
      }}>
        {children} 
      </Box>

      {/* 3. الجهة اليمنى: الثابتة */}
      <Box sx={{ 
        flex: 1, 
        display: { xs: "none", lg: "flex" }, 
        position: "relative", 
        bgcolor: "primary.main", 
        alignItems: "center", 
        justifyContent: "center",
        overflow: "hidden"
      }}>
        <Box sx={{ 
          position: "absolute", inset: 0, 
          backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200')",
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          filter: "brightness(0.35)"
        }} />
        
        <Box sx={{ position: "relative", zIndex: 1, textAlign: "center", p: 8, color: "white" }}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, lineHeight: 1.1 }}>
              FoodFlow <br />
              <span style={{ fontSize: '0.6em', opacity: 0.9, fontWeight: 400 }}>
                Your kitchen, managed perfectly.
              </span>
            </Typography>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}