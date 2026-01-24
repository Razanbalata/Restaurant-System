"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();

  return (
    <Box
      sx={{
        py: 10,
        textAlign: "center",
        background:
          "linear-gradient(135deg, #f97316, #fb923c)",
        color: "white",
      }}
    >
      <Typography variant="h4" fontWeight={800} mb={3}>
        جاهز تبدأ؟
      </Typography>

      <Button
        size="large"
        variant="contained"
        sx={{ bgcolor: "white", color: "#f97316", fontWeight: 700 }}
        onClick={() => router.push("/signUp")}
      >
        إنشاء حساب
      </Button>

      <Typography mt={3}>
        لديك حساب؟{" "}
        <Button
          variant="text"
          sx={{ color: "white", fontWeight: 700 }}
          onClick={() => router.push("/login")}
        >
          تسجيل الدخول
        </Button>
      </Typography>
    </Box>
  );
}
