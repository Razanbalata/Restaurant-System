"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormValues } from "../libs/signup.schema";
import { useSignup } from "../api/use-signup";
import { 
  TextField, 
  Button, 
  Stack, 
  InputAdornment, 
  IconButton, 
  Alert, 
  CircularProgress,
  Typography
} from "@mui/material";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const router = useRouter();
  const signup = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"customer" | "restaurant_owner" | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // قراءة الدور من localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem("user_intent") as "customer" | "restaurant_owner";
    setRole(savedRole);
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormValues) => {
    if (!role) {
      alert("حدث خطأ: لم يتم تحديد المسار");
      return;
    }

    signup.mutate(
      { ...data, role },
      {
        onSuccess: (res) => {
          console.log(res)
          // عرض Alert النجاح
          setSuccessMessage(`تم إنشاء الحساب! دورك: ${res.user.role}`);

          // Redirect بعد ثانيتين
          setTimeout(() => {
            if (res.user.role === "customer") {
              router.push("/restaurants");
            } else {
              router.push("/dashboard");
            }
          }, 2000);
        },
      }
    );
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      backgroundColor: (theme: any) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
      "&:hover": {
        backgroundColor: (theme: any) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
      }
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2.5} sx={{ width: "100%" }}>
      <Typography variant="h5" fontWeight={800} textAlign="center" gutterBottom>
        إنشاء حساب جديد ✨
      </Typography>

      {/* Alert النجاح */}
      {successMessage && (
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>
          {successMessage}
        </Alert>
      )}

      {/* Alert الخطأ */}
      {signup.isError && (
        <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
          {signup.error.message || "فشل إنشاء الحساب، حاول مجدداً"}
        </Alert>
      )}

      <TextField
        fullWidth
        label="الاسم الكامل"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={inputStyles}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <User size={20} color={errors.name ? "#f44336" : "#94a3b8"} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label="البريد الإلكتروني"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={inputStyles}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Mail size={20} color={errors.email ? "#f44336" : "#94a3b8"} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label="كلمة المرور"
        type={showPassword ? "text" : "password"}
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={inputStyles}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock size={20} color={errors.password ? "#f44336" : "#94a3b8"} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={signup.isPending || !role}
        sx={{ py: 1.5, fontSize: "1.1rem", fontWeight: 800, borderRadius: 3, mt: 1, boxShadow: "0 8px 16px rgba(249, 115, 22, 0.25)", textTransform: "none" }}
      >
        {signup.isPending ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <Stack direction="row" spacing={1} alignItems="center">
            <UserPlus size={20} />
            <span>فتح حساب</span>
          </Stack>
        )}
      </Button>
    </Stack>
  );
}
