"use client";

import { Card, CardContent, Box, Typography, useTheme } from "@mui/material";

type Stat = {
  label: string;
  count: number;
  color: string; // أي لون MUI أو HEX
};

type Props = {
  stats: Stat[];
};

export function OrdersStats({ stats }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
      }}
    >
      {stats.map((stat) => (
        <Card key={stat.label} sx={{ borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
            <Box
              sx={{
                width: 8,
                height: 48,
                borderRadius: 1,
                bgcolor: stat.color,
              }}
            />
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {stat.count}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
