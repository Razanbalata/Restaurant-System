"use client";
import { Box, Button, Typography, useTheme, alpha } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 10,
        textAlign: "center",
        // الربط بالتدرج اللوني للثيم
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Typography variant="h4" fontWeight={800} mb={3}>
        Ready to start?
      </Typography>

      <Button
        size="large"
        variant="contained"
        sx={{ 
          bgcolor: "common.white", 
          color: "primary.main", 
          fontWeight: 700,
          "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.9) }
        }}
        onClick={() => router.push("/signUp")}
      >
        Create Account
      </Button>

      <Typography mt={3} sx={{ opacity: 0.9 }}>
        Have an account?{" "}
        <Button
          variant="text"
          sx={{ color: "inherit", fontWeight: 700, textDecoration: "underline" }}
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </Typography>
    </Box>
  );
}