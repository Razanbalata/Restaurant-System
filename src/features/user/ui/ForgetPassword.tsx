"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { Mail, Lock } from "@mui/icons-material";
import { toast } from "sonner";

import { forgotPasswordSchema } from "../libs/forget-schema"; 
import { ForgotPasswordValues } from "../model/type"; 
import { useForgotPasswordMutation } from "../api/use-forget";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { mutate, isPending } = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (values: ForgotPasswordValues) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("If the email exists, a reset link was sent.");
      },
      onError: () => toast.error("Something went wrong"),
    });
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" px={2}>
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
                Forgot Password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your email to receive a reset link
              </Typography>
            </Box>
          }
        />

        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail />
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" size="large" disabled={isPending}>
              {isPending ? "Sending..." : "Send Reset Link"}
            </Button>

            <Typography variant="body2" textAlign="center">
              Remembered your password?{" "}
              <Button variant="text" onClick={() => router.push("/login")}>
                Back to Login
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
