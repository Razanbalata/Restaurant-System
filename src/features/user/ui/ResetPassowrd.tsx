"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  IconButton,
  Button,
  InputAdornment,
} from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "sonner";

import { resetPasswordSchema } from "../libs/reset-schema"; 
import { useResetPasswordMutation } from "../api/use-reset"; 
import { zodResolver } from "@hookform/resolvers/zod";

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { mutate, isPending } = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    const t = searchParams.get("token");
    if (!t) {
      toast.error("Reset token missing");
      router.push("/forget-password");
    } else {
      setToken(t);
    }
  }, [searchParams, router]);

  const onSubmit = (values: ResetPasswordForm) => {
    if (!token) return;
 console.log("Submitting reset with token:", token, "and values:", values);
    mutate(
      { token, password: values.password, confirmPassword: values.confirmPassword },
      {
        onSuccess: () => {
          toast.success("Password reset successful!");
          router.push("/login");
        },
        onError: () => toast.error("Something went wrong"),
      }
    );
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <Card sx={{ width: "100%", maxWidth: 420, borderRadius: 4 }}>
        <CardHeader
          title={
            <Box textAlign="center">
              <Box
                mx="auto"
                mb={1}
                width={56}
                height={56}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius={2}
                bgcolor="primary.main"
              >
                <Lock sx={{ color: "white" }} />
              </Box>
              <Typography variant="h5" fontWeight={700}>
                Reset Password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your new password
              </Typography>
            </Box>
          }
        />

        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" gap={2} flexDirection="column">
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              type={showConfirm ? "text" : "password"}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              {...register("confirmPassword")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!token || isPending}
            >
              {isPending ? "Resetting..." : "Reset Password"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
