import { Box, Button, Container, Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
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
          color="white"
          gutterBottom
        >
          إدارة مطعمك أو اطلب طعامك بسهولة 🍔
        </Typography>

        <Typography
          variant="h6"
          color="rgba(255,255,255,0.85)"
          mb={4}
        >
          منصة ذكية تجمع أصحاب المطاعم والزبائن في تجربة واحدة
        </Typography>

        <Button
          size="large"
          variant="contained"
          sx={{
            px: 5,
            py: 1.8,
            fontSize: "1.1rem",
            fontWeight: 700,
            borderRadius: 3,
          }}
        >
          ابدأ الآن
        </Button>
      </Container>
    </Box>
  );
}
