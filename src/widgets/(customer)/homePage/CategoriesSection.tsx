import React from "react";
import {
  Box,
  Typography,
  Container,
  Stack,
  Paper,
  ButtonBase,
} from "@mui/material";
import {
  LocalPizza,
  LunchDining,
  BakeryDining,
  BreakfastDining,
  Icecream,
  LocalBar,
  Restaurant,
} from "@mui/icons-material";

// مصفوفة التصنيفات (ممكن تغيري الصور لروابط حقيقية لاحقاً)
const categories = [
  { id: 1, name: "بيتزا", icon: <LocalPizza />, color: "#E91E63" }, // وردي محمر
  { id: 2, name: "برجر", icon: <LunchDining />, color: "#FF9800" }, // برتقالي
  { id: 3, name: "شاورما", icon: <Restaurant />, color: "#795548" }, // بني
  { id: 4, name: "فطور", icon: <BreakfastDining />, color: "#4CAF50" }, // أخضر
  { id: 5, name: "حلويات", icon: <Icecream />, color: "#9C27B0" }, // بنفسجي
  { id: 6, name: "مخبوزات", icon: <BakeryDining />, color: "#8D6E63" }, // بني فاتح
  { id: 7, name: "عصائر", icon: <LocalBar />, color: "#2196F3" }, // أزرق
];

export const CategoriesSection = ({ onCategorySelect }: any) => {
  return (
    <Container maxWidth="lg" sx={{ my: 6 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, mb: 3, textAlign: "right", pr: 2 }}
      >
        شو حابب تاكل اليوم؟
      </Typography>

      <Stack
        direction="row"
        spacing={3}
        sx={{
          overflowX: "auto", // للسماح بالتمرير في الشاشات الصغيرة
          pb: 2,
          px: 2,
          "&::-webkit-scrollbar": { display: "none" }, // إخفاء شريط التمرير لشكل أنظف
        }}
      >
        {categories.map((cat) => (
          <Box key={cat.id} sx={{ textAlign: "center", flexShrink: 0 }}>
            <ButtonBase
              onClick={() => onCategorySelect(cat.name)}
              sx={{
                width: 75,
                height: 75,
                borderRadius: "24px", // زوايا منحنية مودرن
                bgcolor: `${cat.color}15`, // لون الأيقونة بظلال شفاف (15%)
                color: cat.color,
                transition: "0.3s",
                "&:hover": {
                  bgcolor: cat.color, // عند الهوفر بتصير الدائرة غامقة
                  color: "white", // والأيقونة بتصير بيضاء
                  transform: "translateY(-8px)",
                  boxShadow: `0 12px 20px -10px ${cat.color}`,
                },
              }}
            >
              {/* استنساخ الأيقونة مع تكبير حجمها */}
              {React.cloneElement(cat.icon as React.ReactElement, {
                sx: { fontSize: "2.5rem" },
              })}
            </ButtonBase>

            <Typography sx={{ mt: 1.5, fontWeight: 700, fontSize: "0.85rem" }}>
              {cat.name}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};
