import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Paper,
} from "@mui/material";
import {
  Search as SearchIcon,
  LocationOn,
} from "@mui/icons-material";

export const HeroSection = ({ city, setCity, onSearch }: any) => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 15 },
        color: "white",
        textAlign: "center",
        background: "linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)",
        position: "relative",
        mb: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={900} mb={2}>
          جوعان؟ اطلب هلقيت 🍕
        </Typography>
        <Typography sx={{ mb: 5, opacity: 0.9, fontSize: "1.1rem" }}>
          أفضل المطاعم في فلسطين بين إيديك
        </Typography>

        {/* هنا دمجنا الـ البحث تبعك داخل Paper أبيض عشان يبرز */}
        <Paper
          elevation={6}
          sx={{
            p: "6px",
            display: "flex",
            alignItems: "center",
            borderRadius: "16px",
            maxWidth: 700,
            mx: "auto",
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            placeholder="أدخل اسم المدينة (مثلاً: Ramallah)"
            value={city} // من كودك
            onChange={(e) => setCity(e.target.value)} // من كودك
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start" sx={{ pl: 2 }}>
                  <LocationOn color="primary" />
                </InputAdornment>
              ),
              sx: { fontSize: "1.1rem", py: 1 },
            }}
          />
          <Button
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            onClick={onSearch} // الدالة تبعتك اللي بتعمل setCity
            sx={{
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              bgcolor: "#212121",
              "&:hover": { bgcolor: "#000" },
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            بحث
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
