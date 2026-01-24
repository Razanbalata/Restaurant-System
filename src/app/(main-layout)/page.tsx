// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button, Stack, Typography, Container, Box } from "@mui/material";
// import { useMe } from "@/features/user/api/use-me"; 

// export default function LandingPage() {
//   const router = useRouter();
//   const { data: user } = useMe();

//   // 1️⃣ حماية الصفحة: لو المستخدم مسجل دخول بالفعل
//   useEffect(() => {
//     if (user) {
//       if (user.role === "customer") router.replace("/dashboard");
//       else if (user.role === "restaurant_owner") router.replace("/dashboard");
//     }
//   }, [user, router]);

//   // 2️⃣ اختيار الدور
//   const handleRoleSelect = (role: "customer" | "restaurant_owner") => {
//     localStorage.setItem("user_intent", role);
//     router.push("/signUp"); // أو "/login" حسب Flowك
//   };

//   // 3️⃣ عرض الصفحة فقط إذا المستخدم مش موجود
//   if (user) return null;

//   return (
//     <Container maxWidth="sm" sx={{ mt: 12, textAlign: "center" }}>
//       <Typography variant="h3" fontWeight={800} gutterBottom>
//         مرحباً بك في تطبيقنا 🍽️
//       </Typography>
//       <Typography variant="h6" sx={{ mb: 6 }}>
//         اختر دورك للبدء:
//       </Typography>

//       <Stack spacing={3} direction="column" alignItems="center">
//         <Button
//           variant="contained"
//           fullWidth
//           size="large"
//           onClick={() => handleRoleSelect("customer")}
//           sx={{ py: 1.5, fontSize: "1.1rem" }}
//         >
//           أنا زبون
//         </Button>
//         <Button
//           variant="outlined"
//           fullWidth
//           size="large"
//           onClick={() => handleRoleSelect("restaurant_owner")}
//           sx={{ py: 1.5, fontSize: "1.1rem" }}
//         >
//           أنا صاحب مطعم
//         </Button>
//       </Stack>

//       <Box sx={{ mt: 6 }}>
//         <Typography variant="body2">
//           لديك حساب؟{" "}
//           <Button variant="text" onClick={() => router.push("/login")}>
//             تسجيل الدخول
//           </Button>
//         </Typography>
//       </Box>
//     </Container>
//   );
// }



"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@mui/material";
import { useMe } from "@/features/user/api/use-me";
import HeroSection from "@/widgets/(customer)/homePage/HeroSection"; 
import RoleSelectionSection from "@/widgets/(customer)/homePage/RoleSelectionSection"; 
import HowItWorksSection from "@/widgets/(customer)/homePage/HowItWorksSection"; 
import CTASection from "@/widgets/(customer)/homePage/CTASection"; 

export default function LandingPage() {
  const router = useRouter();
  const { data: user } = useMe();

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  if (user) return null;

  return (
    <Container maxWidth={false} disableGutters>
      <HeroSection />
      <RoleSelectionSection />
      <HowItWorksSection />
      <CTASection />
    </Container>
  );
}
