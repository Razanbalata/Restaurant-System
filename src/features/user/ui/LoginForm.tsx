"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "../libs/login.schema";
import { useLogin } from "../api/use-login";
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

export function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(
      { ...data, rememberMe },
      {
        onSuccess: (res) => {
          setSuccessMessage(`Login successful! Your role: ${res.user.role}`);

          setTimeout(() => {
            router.push("/dashboard");
          }, 1500);
        },
      }
    );
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
      sx={{ width: "100%" }}
    >
      <Typography variant="h5" fontWeight={800} textAlign="center">
        Login
      </Typography>

      {/* Success */}
      {successMessage && (
        <Alert severity="success" variant="filled">
          {successMessage}
        </Alert>
      )}

      {/* Error */}
      {loginMutation.isError && (
        <Alert severity="error" variant="filled">
          {loginMutation.error?.message || "Login failed"}
        </Alert>
      )}

      {/* Email */}
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

      {/* Password */}
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

      {/* Remember + Forgot */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
          label="Remember me"
        />

        <Typography
          variant="body2"
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
            fontWeight: 500,
          }}
          onClick={() => router.push("/forget-password")}
        >
          Forgot password?
        </Typography>
      </Stack>

      {/* Login Button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <CircularProgress size={26} color="inherit" />
        ) : (
          <Stack direction="row" spacing={1} alignItems="center">
            <span>Login</span>
            <ArrowRight size={20} />
          </Stack>
        )}
      </Button>

      {/* Divider */}
      <Divider>OR</Divider>

      {/* Google Login */}
      <Button
        variant="outlined"
        fullWidth
        size="large"
        onClick={() => (window.location.href = "/api/auth/google")}
      >
        Sign in with Google
      </Button>
    </Stack>
  );
}
