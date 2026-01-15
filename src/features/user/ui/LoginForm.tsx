"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "../libs/login.schema";
import { useLogin } from "../api/use-login";
import { TextField, Button, Stack, InputAdornment, IconButton, Alert, CircularProgress, Typography } from "@mui/material";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        setSuccessMessage(`تم تسجيل الدخول! دورك: ${res.user.role}`);
        setTimeout(() => {
          if (res.user.role === "customer") router.push("/restaurants");
          else router.push("/dashboard");
        }, 2000);
      },
    });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3} sx={{ width: "100%" }}>
      <Typography variant="h5" fontWeight={800} textAlign="center">تسجيل الدخول</Typography>

      {/* Alert النجاح */}
      {successMessage && <Alert severity="success" variant="filled">{successMessage}</Alert>}

      {/* Alert الخطأ */}
      {loginMutation.isError && <Alert severity="error" variant="filled">{loginMutation.error.message || "فشل تسجيل الدخول"}</Alert>}

      {/* البريد */}
      <TextField
        label="البريد الإلكتروني"
        fullWidth
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        InputProps={{
          startAdornment: <InputAdornment position="start"><Mail size={18} /></InputAdornment>
        }}
      />

      {/* كلمة المرور */}
      <TextField
        label="كلمة المرور"
        type={showPassword ? "text" : "password"}
        fullWidth
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          startAdornment: <InputAdornment position="start"><Lock size={18} /></InputAdornment>,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      {/* زر الدخول */}
      <Button type="submit" variant="contained" fullWidth size="large" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? <CircularProgress size={26} color="inherit" /> :
          <Stack direction="row" spacing={1} alignItems="center">
            <span>تسجيل الدخول</span>
            <ArrowRight size={20} />
          </Stack>
        }
      </Button>
    </Stack>
  );
}
