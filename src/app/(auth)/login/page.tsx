// app/(auth)/login/page.tsx
import { FloatingFoodIcons } from "@/features/user/ui/FoodBackground"; 
import { LoginForm } from "@/features/user/ui/LoginForm";
import { Box, Paper } from "@mui/material";

export default function LoginPage() {
  return (
    <Box className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      {/* Background */}
      <FloatingFoodIcons />

      {/* Login Form */}
      <Paper 
        elevation={0}
        className="z-10 w-full max-w-md p-8 rounded-3xl border border-white/20 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70"
      >
        <LoginForm />
      </Paper>
    </Box>
  );
}