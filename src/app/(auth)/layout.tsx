// app/(auth)/layout.tsx
'use client';

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { FloatingFoodIcons } from "@/features/user/ui/FoodBackground";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", bgcolor: "background.default", position: "relative" }}>
      
      {/* 1. الخلفية المتحركة (تغطي نصف الشاشة الأيسر) */}
      <Box sx={{ position: "absolute", inset: 0, width: { xs: "100%", lg: "50%" }, zIndex: 0 }}>
        <FloatingFoodIcons />
      </Box>

      {/* 2. الجهة اليسرى: المكان اللي رح ينزل فيه الـ (Login أو Register) */}
      <Box sx={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center",
        zIndex: 1 // عشان يضل فوق الأيقونات
      }}>
        {children} 
      </Box>

      {/* 3. الجهة اليمنى: الثابتة لكل صفحات الـ Auth */}
      <Box sx={{ 
        flex: 1, 
        display: { xs: "none", lg: "flex" }, 
        position: "relative", 
        bgcolor: "primary.main", 
        alignItems: "center", 
        justifyContent: "center",
        overflow: "hidden"
      }}>
        {/* الصورة الخلفية الثابتة */}
        <Box sx={{ 
          position: "absolute", inset: 0, 
          backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200')",
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          filter: "brightness(0.35)"
        }} />
        
        {/* نص ترحيبي ثابت أو ممكن تمرره كـ Props إذا حبيت */}
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