"use client";

import { Box, Button, Stack, Typography, useTheme, alpha } from "@mui/material";
import { useRouter } from "next/navigation";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

export default function NotFoundPage() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(
          135deg,
          ${alpha(theme.palette.primary.main, 0.08)},
          ${alpha(theme.palette.secondary.main, 0.08)}
        )`,
        px: 2,
      }}
    >
      <Stack
        spacing={3}
        alignItems="center"
        textAlign="center"
        sx={{
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[6],
        }}
      >
        <ErrorOutlineRoundedIcon
          sx={{
            fontSize: 72,
            color: theme.palette.primary.main,
          }}
        />

        <Typography variant="h2" fontWeight={700}>
          404
        </Typography>

        <Typography variant="h6" color="text.secondary">
          Oops! The page you’re looking for doesn’t exist.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          It might have been moved or deleted, or maybe the URL is wrong.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => router.push("/")}
          sx={{ mt: 1, px: 4 }}
        >
          Go back home
        </Button>
      </Stack>
    </Box>
  );
}
