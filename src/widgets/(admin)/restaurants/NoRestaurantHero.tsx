"use client";

import { Box, Paper, Typography, Button, useTheme, alpha } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useRouter } from "next/navigation";

interface Props {
  userName: string;
}

export const NoRestaurantHero = ({ userName }: Props) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: theme.palette.mode === "light" ? "#f3f4f6" : theme.palette.background.default,
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 4, md: 8 },
          borderRadius: "24px",
          maxWidth: 600,
          textAlign: "center",
          bgcolor: alpha(theme.palette.background.paper, 0.95),
          boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
        }}
      >
        <AutoAwesomeIcon
          sx={{
            fontSize: 80,
            color: theme.palette.primary.main,
            mb: 3,
            animation: "bounce 2s infinite",
          }}
        />

        <Typography variant="h4" fontWeight={900} gutterBottom>
          Welcome, {userName}!
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          You don't have any restaurants yet. Let's get started by adding your first restaurant.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: "12px",
            px: 6,
            fontWeight: 700,
            bgcolor: theme.palette.primary.main,
            "&:hover": { bgcolor: theme.palette.primary.dark },
          }}
          onClick={() => router.push("/shared/dashboard")}
        >
          Add My First Restaurant
        </Button>
      </Paper>
    </Box>
  );
};
