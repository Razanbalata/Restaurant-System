"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

// استيراد الـ Schema والـ Hook الخاص بك
import { loginSchema, LoginFormValues } from "../libs/login.schema";
import { useLogin } from "../api/use-login";

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        router.push("/dashboard");
      },
    });
  };
  console.log("Login form errors:", errors);

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
      sx={{ width: "100%" }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, textAlign: "center", mb: 1 }}
      >
        Login to FoodFlow
      </Typography>

      {/* رسالة الخطأ في حال فشل الطلب */}
      {loginMutation.isError && (
        <Alert severity="error" variant="filled" sx={{ borderRadius: "12px" }}>
          {loginMutation.error?.message || "Login failed. Please try again."}
        </Alert>
      )}

      {/* حقل البريد الإلكتروني */}
      <TextField
        label="Email Address"
        fullWidth
        disabled={loginMutation.isPending}
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Mail size={18} />
            </InputAdornment>
          ),
        }}
      />

      {/* حقل كلمة المرور */}
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        disabled={loginMutation.isPending}
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock size={18} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* تذكرني + نسيان كلمة المرور */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <FormControlLabel
          control={<Checkbox size="small" />}
          label={<Typography variant="body2">Remember me</Typography>}
        />
        <Typography
          variant="body2"
          sx={{
            cursor: "pointer",
            fontWeight: 600,
            color: "primary.main",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() => router.push("/forget-password")}
        >
          Forgot password?
        </Typography>
      </Stack>

      {/* زر تسجيل الدخول */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={loginMutation.isPending}
        sx={{
          py: 1.5,
          borderRadius: "12px",
          fontWeight: 700,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {loginMutation.isPending ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <Stack direction="row" spacing={1} alignItems="center">
            <span>Sign In</span>
            <ArrowRight size={20} />
          </Stack>
        )}
      </Button>

      <Divider sx={{ my: 1 }}>
        <Typography variant="caption" color="text.secondary">
          OR
        </Typography>
      </Divider>

      {/* تسجيل الدخول بواسطة Google */}
      <Button
        variant="outlined"
        fullWidth
        size="large"
        startIcon={
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg"
            width="18"
            alt="google"
          />
        }
        sx={{
          py: 1.5,
          borderRadius: "12px",
          borderColor: "divider",
          color: "text.primary",
        }}
        onClick={() => (window.location.href = "/api/auth/google")}
      >
        Continue with Google
      </Button>
    </Stack>
  );
}
