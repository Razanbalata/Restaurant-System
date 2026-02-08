// "use client";

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signupSchema, SignupFormValues } from "../libs/signup.schema";
// import { useSignup } from "../api/use-signup";
// import {
//   TextField,
//   Button,
//   Stack,
//   InputAdornment,
//   IconButton,
//   Alert,
//   CircularProgress,
//   Typography
// } from "@mui/material";
// import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
// import { useRouter } from "next/navigation";

// export function SignupForm() {
//   const router = useRouter();
//   const signup = useSignup();
//   const [showPassword, setShowPassword] = useState(false);
//   const [role, setRole] = useState<"customer" | "restaurant_owner" | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   // Read role from localStorage
//   useEffect(() => {
//     const savedRole = localStorage.getItem("user_intent") as "customer" | "restaurant_owner";
//     setRole(savedRole);
//   }, []);

//   const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
//     resolver: zodResolver(signupSchema),
//   });

//   const onSubmit = (data: SignupFormValues) => {
//     if (!role) {
//       alert("Error: Path not selected");
//       return;
//     }

//     signup.mutate(
//       { ...data, role },
//       {
//         onSuccess: (res) => {
//           // Show success alert
//           setSuccessMessage(`Account created! Your role: ${res.user.role}`);

//           // Redirect after 2 seconds
//           setTimeout(() => {
//             if (res.user.role === "customer") {
//               router.push("/dashboard");
//             } else {
//               router.push("/dashboard");
//             }
//           }, 2000);
//         },
//       }
//     );
//   };

//   const inputStyles = {
//     "& .MuiOutlinedInput-root": {
//       borderRadius: 3,
//       backgroundColor: (theme: any) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
//       "&:hover": {
//         backgroundColor: (theme: any) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
//       }
//     }
//   };

//   return (
//     <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2.5} sx={{ width: "100%" }}>
//       <Typography variant="h5" fontWeight={800} textAlign="center" gutterBottom>
//         Create New Account ✨
//       </Typography>

//       {/* Success Alert */}
//       {successMessage && (
//         <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>
//           {successMessage}
//         </Alert>
//       )}

//       {/* Error Alert */}
//       {signup.isError && (
//         <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
//           {signup.error.message || "Account creation failed, please try again"}
//         </Alert>
//       )}

//       <TextField
//         fullWidth
//         label="Full Name"
//         {...register("name")}
//         error={!!errors.name}
//         helperText={errors.name?.message}
//         sx={inputStyles}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <User size={20} color={errors.name ? "#f44336" : "#94a3b8"} />
//             </InputAdornment>
//           ),
//         }}
//       />

//       <TextField
//         fullWidth
//         label="Email Address"
//         {...register("email")}
//         error={!!errors.email}
//         helperText={errors.email?.message}
//         sx={inputStyles}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Mail size={20} color={errors.email ? "#f44336" : "#94a3b8"} />
//             </InputAdornment>
//           ),
//         }}
//       />

//       <TextField
//         fullWidth
//         label="Password"
//         type={showPassword ? "text" : "password"}
//         {...register("password")}
//         error={!!errors.password}
//         helperText={errors.password?.message}
//         sx={inputStyles}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Lock size={20} color={errors.password ? "#f44336" : "#94a3b8"} />
//             </InputAdornment>
//           ),
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />

//       <Button
//         type="submit"
//         variant="contained"
//         fullWidth
//         size="large"
//         disabled={signup.isPending || !role}
//         sx={{ py: 1.5, fontSize: "1.1rem", fontWeight: 800, borderRadius: 3, mt: 1, boxShadow: "0 8px 16px rgba(249, 115, 22, 0.25)", textTransform: "none" }}
//       >
//         {signup.isPending ? (
//           <CircularProgress size={24} color="inherit" />
//         ) : (
//           <Stack direction="row" spacing={1} alignItems="center">
//             <UserPlus size={20} />
//             <span>Sign Up</span>
//           </Stack>
//         )}
//       </Button>
//     </Stack>
//   );
// }
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Users, Store, Mail, Lock, User, ArrowRight } from "lucide-react";
import { TextField, Button, InputAdornment, IconButton, Stack, Typography, Box, alpha, useTheme } from "@mui/material";
import { useSignup } from "../api/use-signup";
import { toast } from "sonner";

export default function SignupForm() {
  const theme = useTheme();
  const router = useRouter();
  const signupMutation = useSignup();

  const [showPassword, setShowPassword] = useState(false);

  // المصدر الوحيد للحقيقة (Single Source of Truth)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer" as "customer" | "restaurant_owner",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Account created successfully! ✨");
        router.push("/shared/dashboard");
      },
      onError: (error: any) => {
        toast.error(error.message || "Registration failed");
      },
    });
  };

  // وظيفة موحدة لتحديث أي حقل في الـ Object
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" fontWeight={900} sx={{ 
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, #fb923c)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" 
        }}>
          Create account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Join FoodFlow and start managing your orders
        </Typography>
      </Box>

      {/* Role Selection - الأفضل والأجمل */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { id: "customer", label: "Customer", icon: Users },
          { id: "restaurant_owner", label: "Restaurant Owner", icon: Store },
        ].map((roleOption) => {
          const isSelected = formData.role === roleOption.id;
          return (
            <Box
              key={roleOption.id}
              component="button"
              type="button"
              onClick={() => handleChange("role", roleOption.id)}
              sx={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
                p: 2, borderRadius: 4, border: "2px solid", transition: "0.3s",
                borderColor: isSelected ? "primary.main" : "divider",
                bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.05) : "transparent",
                "&:hover": { borderColor: "primary.main", bgcolor: alpha(theme.palette.primary.main, 0.02) }
              }}
            >
              <roleOption.icon size={24} color={isSelected ? theme.palette.primary.main : theme.palette.text.secondary} />
              <Typography variant="caption" fontWeight={700} color={isSelected ? "primary.main" : "text.secondary"}>
                {roleOption.label}
              </Typography>
            </Box>
          );
        })}
      </div>

      <Stack spacing={2}>
        <TextField
          label="Full Name"
          fullWidth
          required
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><User size={18} className="text-primary" /></InputAdornment> }}
          sx={fieldStyle}
        />

        <TextField
          label="Email Address"
          type="email"
          fullWidth
          required
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><Mail size={18} className="text-primary" /></InputAdornment> }}
          sx={fieldStyle}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          required
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          sx={fieldStyle}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Lock size={18} className="text-primary" /></InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={signupMutation.isPending}
        sx={{ py: 1.8, borderRadius: 4, fontWeight: 800, textTransform: "none", boxShadow: 3 }}
      >
        {signupMutation.isPending ? <Loader2 className="animate-spin" size={24} /> : (
          <Stack direction="row" spacing={1} alignItems="center">
            <span>Create Account</span>
            <ArrowRight size={20} />
          </Stack>
        )}
      </Button>

      <Typography variant="body2" align="center" color="text.secondary">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-primary hover:underline" style={{ textDecoration: "none" }}>
          Sign in
        </Link>
      </Typography>
    </Stack>
  );
}

const fieldStyle = { "& .MuiOutlinedInput-root": { borderRadius: "14px" } };