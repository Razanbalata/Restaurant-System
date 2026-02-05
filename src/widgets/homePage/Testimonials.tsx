"use client";
import { Box, Container, Typography, Grid, Card, Avatar, Stack, useTheme, alpha } from "@mui/material";
import { Star } from "lucide-react";

export const Testimonials = () => {
  const theme = useTheme();
  const reviews = [
    { name: "Ahmed Hassan", role: "Owner", content: "FoodFlow transformed how I manage my restaurant. Revenue increased by 40%." },
    { name: "Sara Mohamed", role: "Customer", content: "The easiest food ordering app! Real-time tracking is amazing." },
    { name: "Khalid Omar", role: "Cafe Owner", content: "The analytics dashboard alone is worth it. Game changer for my business." },
  ];

  return (
    <Box sx={{ py: 15, bgcolor: alpha(theme.palette.secondary.main, 0.3) }}>
      <Container maxWidth="lg">
        <Box textAlign="center" sx={{ mb: 10 }}>
          <Typography color="primary" sx={{ fontWeight: 700 }}>Testimonials</Typography>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>Loved by thousands</Typography>
        </Box>
        <Grid container spacing={3}>
          {reviews.map((r, i) => (
            <Grid size={{xs:12,md:4}} key={i}>
              <Card sx={{ p: 4, borderRadius: "20px" }}>
                <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#ffb400" color="#ffb400" />)}
                </Stack>
                <Typography variant="body1" sx={{ mb: 4, fontStyle: "italic", color: "text.secondary" }}>"{r.content}"</Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "primary.main" }}>{r.name[0]}</Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{r.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{r.role}</Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};