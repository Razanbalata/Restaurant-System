"use client";
import { Box, Typography, useTheme, alpha } from "@mui/material";
import FoodCard from "./DishesGrid";
import { UtensilsCrossed } from "lucide-react"; // أيقونة للحالة الفارغة

interface DishesListProps {
  displayedMeals: any[];
  categories: any[];
  activeTab: number;
}

export const DishesList = ({ displayedMeals, categories, activeTab }: DishesListProps) => {
  const theme = useTheme();

  // 1. حالة عدم وجود وجبات (Empty State بتصميم أنيق)
  if (displayedMeals.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        py: 12, border: `1px dashed ${theme.palette.divider}`, 
        borderRadius: 2, bgcolor: alpha(theme.palette.action.hover, 0.02)
      }}>
        <UtensilsCrossed size={48} strokeWidth={1} color={theme.palette.text.disabled} />
        <Typography variant="body1" sx={{ mt: 2, fontWeight: 600, color: 'text.secondary' }}>
          No dishes found in this category
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Try adding a new meal or checking another section.
        </Typography>
      </Box>
    );
  }

  // دالة مساعدة لتوليد حاوية الفليكس
  const FlexContainer = ({ children }: { children: React.ReactNode }) => (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 3, // المسافة بين الكروت
      justifyContent: 'flex-start'
    }}>
      {children}
    </Box>
  );

  // تنسيق الكارد ليكون ريسبونسيف داخل الفليكس
  const itemStyles = {
    // xs: 100%, sm: 48% (2 items), md: 31% (3 items), lg: 23.5% (4 items)
    flexBasis: {
      xs: '100%',
      sm: 'calc(50% - 12px)',
      md: 'calc(33.333% - 16px)',
      lg: 'calc(25% - 18px)'
    },
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0, // لمنع تمدد المحتوى خارج الحاوية
  };

  // 2. حالة عرض "الكل" (Grouping)
  if (activeTab === 0) {
    return (
      <Box>
        {categories.map((cat) => {
          const categoryMeals = displayedMeals.filter((m) => m.category_id === cat.id);
          if (categoryMeals.length === 0) return null;

          return (
            <Box key={cat.id} sx={{ mb: 8 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 900, mb: 4, pl: 2, 
                  borderLeft: `3px solid ${theme.palette.primary.main}`,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.9rem',
                  color: 'text.secondary'
                }}
              >
                {cat.name} — {categoryMeals.length}
              </Typography>
              
              <FlexContainer>
                {categoryMeals.map((meal) => (
                  <Box key={meal.id} sx={itemStyles}>
                    <FoodCard item={meal} />
                  </Box>
                ))}
              </FlexContainer>
            </Box>
          );
        })}
      </Box>
    );
  }

  // 3. حالة عرض "قسم محدد"
  return (
    <FlexContainer>
      {displayedMeals.map((meal) => (
        <Box key={meal.id} sx={itemStyles}>
          <FoodCard item={meal} />
        </Box>
      ))}
    </FlexContainer>
  );
};