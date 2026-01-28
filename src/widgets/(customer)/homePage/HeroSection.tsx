"use client";
import { Box, Button, Container, Typography, useTheme, alpha } from "@mui/material";

export default function HeroSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        backgroundImage: `
          linear-gradient(${alpha(theme.palette.common.black, 0.6)}, ${alpha(theme.palette.common.black, 0.6)}),
          url('/images/hero-food.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          fontWeight={900}
          color="common.white"
          gutterBottom
          sx={{ fontSize: { xs: "2.5rem", md: "3.75rem" } }}
        >
          إدارة مطعمك أو اطلب طعامك بسهولة 🍔
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: alpha(theme.palette.common.white, 0.85), mb: 4 }}
        >
          منصة ذكية تجمع أصحاب المطاعم والزبائن في تجربة واحدة
        </Typography>

        <Button
          size="large"
          variant="contained"
          color="primary"
          sx={{
            px: 5,
            py: 1.8,
            fontSize: "1.1rem",
            fontWeight: 700,
            borderRadius: `${Number(theme.shape.borderRadius) * 1.5}px`, // ربط الحواف بالثيم
          }}
        >
          ابدأ الآن
        </Button>
      </Container>
    </Box>
  );
}