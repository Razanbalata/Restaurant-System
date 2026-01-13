"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  TextField, 
  Button, 
  Stack, 
  InputAdornment, 
  IconButton, 
  Alert,
  CircularProgress,
  Typography,
  Box
} from "@mui/material";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useLogin } from "../api/use-login"; // تأكدي من مسار الهوك الخاص بكِ
import { loginSchema } from "../libs/login.schema";



type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  // 2. إعداد React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3} sx={{ width: "100%" }}>
      
      {/* تنبيه في حال وجود خطأ من السيرفر (مثلاً الحساب غير موجود) */}
      {loginMutation.isError && (
        <Alert severity="error" variant="filled" sx={{ borderRadius: 2, fontWeight: 600 }}>
          {loginMutation.error.message || "خطأ في البريد أو كلمة المرور"}
        </Alert>
      )}

      {/* حقل البريد الإلكتروني */}
      <TextField
        fullWidth
        label="البريد الإلكتروني"
        autoComplete="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Mail size={18} color={errors.email ? "#ef4444" : "#94a3b8"} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)',
          }
        }}
      />

      {/* حقل كلمة المرور */}
      <Box>
        <TextField
          fullWidth
          label="كلمة المرور"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock size={18} color={errors.password ? "#ef4444" : "#94a3b8"} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)',
            }
          }}
        />
      </Box>

      {/* زر تسجيل الدخول */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={loginMutation.isPending}
        sx={{ 
          py: 1.8, 
          fontSize: "1.1rem", 
          fontWeight: 900,
          borderRadius: 3,
          boxShadow: "0 10px 15px -3px rgba(249, 115, 22, 0.3)",
          transition: "all 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 20px 25px -5px rgba(249, 115, 22, 0.4)",
          }
        }}
      >
        {loginMutation.isPending ? (
          <CircularProgress size={26} color="inherit" />
        ) : (
          <Stack direction="row" alignItems="center" spacing={1}>
            <span>تسجيل الدخول</span>
            <ArrowRight size={20} />
          </Stack>
        )}
      </Button>

    </Stack>
  );
}