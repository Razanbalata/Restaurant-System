"use client";
import { Box, Button, Typography, useTheme, alpha, Container } from "@mui/material";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Box sx={{ 
          bgcolor: "primary.main", p: { xs: 6, md: 10 }, borderRadius: "40px", textAlign: "center", color: "white",
          position: "relative", overflow: "hidden" 
        }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>Ready to transform your food business?</Typography>
          <Button variant="contained" sx={{ bgcolor: "white", color: "primary.main", px: 5, py: 2, "&:hover": { bgcolor: "#f0f0f0" } }} endIcon={<ArrowRight />}>
            Get Started Free
          </Button>
        </Box>
      </Container>
  );
}