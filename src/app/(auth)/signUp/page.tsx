import { FloatingFoodIcons } from '@/features/user/ui/FoodBackground';
import { SignupForm } from '@/features/user/ui/SignupForm';
import { Box, Paper } from '@mui/material';
import React from 'react';

function page() {
  return (
    <Box className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      {/* الخلفية */}
      <FloatingFoodIcons />

      {/* فورم إنشاء الحساب */}
      <Paper 
        elevation={0}
        className="z-10 w-full max-w-md p-8 rounded-3xl border border-white/20 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70"
      >
      <SignupForm />
    </Paper>
    </Box>
  );
}

export default page;
