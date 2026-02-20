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
  alpha,
} from "@mui/material";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

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

        const userRole = res.user?.role || res.role;

        if (userRole === "restaurant_owner") {
          router.push("/shared/dashboard");
        } else if (userRole === "customer") {
          router.push("/customer/cart");
        } else {
          console.warn("User role is missing or unknown:", userRole);
          router.push("/");
        }
      },
      onError: (error) => {
        console.error("Mutation failed:", error);
      }
    });
  };

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
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 1.2-4.53z"
              fill="#EA4335"
            />
          </svg>
        }
        sx={{
          py: 1.6,
          borderRadius: "16px",
          borderColor: "divider",
          color: "text.primary",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "0.95rem",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            borderColor: "primary.main",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            transform: "translateY(-1px)",
          },
        }}
        onClick={() => (window.location.href = "/api/auth/google")}
      >
        Continue with Google
      </Button>
      <Stack 
        direction="row" 
        spacing={0.5} 
        justifyContent="center" 
        alignItems="center" 
        sx={{ mt: 2 }}
      >
        <Typography variant="body2" color="text.secondary">
          Don't have an account?
        </Typography>
        <Typography
          variant="body2"
          sx={{
            cursor: "pointer",
            fontWeight: 700,
            color: "primary.main",
            "&:hover": { 
              textDecoration: "underline",
              color: "primary.dark" 
            },
            transition: "all 0.2s"
          }}
          onClick={() => router.push("/signUp")}
        >
          Create an account
        </Typography>
      </Stack>
    </Stack>
  );
}
