import { Box, Container, Stack, Typography } from '@mui/material';
import { Utensils } from 'lucide-react';
import React from 'react';

function Footer() {
  return (
    <Box sx={{ py: 6, borderTop: "1px solid", borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" spacing={4}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ p: 1, bgcolor: "primary.main", borderRadius: "8px", display: "flex" }}><Utensils size={18} color="white" /></Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>FoodFlow</Typography>
            </Stack>
            <Stack direction="row" spacing={4}>
              <Typography variant="body2" sx={{ cursor: "pointer", color: "text.secondary" }}>Privacy</Typography>
              <Typography variant="body2" sx={{ cursor: "pointer", color: "text.secondary" }}>Terms</Typography>
              <Typography variant="body2" sx={{ cursor: "pointer", color: "text.secondary" }}>Contact</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">© 2026 FoodFlow. All rights reserved.</Typography>
          </Stack>
        </Container>
      </Box>
  );
}

export default Footer;
