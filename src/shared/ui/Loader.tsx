// shared/ui/Loader.tsx
"use client";

import { Box, CircularProgress } from "@mui/material";

export function Loader() {
  return (
    <Box display="flex" justifyContent="center" p={5}>
      <CircularProgress />
    </Box>
  );
}
