import { createTheme, alpha } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") => {
  const isLight = mode === "light";

  return createTheme({
    palette: {
      mode,
      primary: {
        // البني الخشبي الدافئ (Coffee Bean)
        main: isLight ? "#4E342E" : "#D7CCC8", 
        contrastText: isLight ? "#FFFFFF" : "#3E2723",
      },
      secondary: {
        // لون البيج الناعم (Sand / Cream)
        main: isLight ? "#A1887F" : "#8D6E63",
      },
      background: {
        // خلفية ورقية دافئة في الفاتح، وأسود بني في الغامق
        default: isLight ? "#FDFBF7" : "#1A1614", 
        paper: isLight ? "#FFFFFF" : "#251F1C",
      },
      text: {
        // نصوص بلمحة بنية بدلاً من الأسود الصريح لراحة العين
        primary: isLight ? "#3E2723" : "#F5F5F5",
        secondary: isLight ? "#795548" : "#BCAAA4",
      },
      divider: isLight ? "#EFEBE9" : "#3E2723",
    },

    typography: {
      fontFamily: "'Cairo', sans-serif",
      h1: { fontWeight: 800, color: isLight ? "#3E2723" : "#D7CCC8" },
      h6: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 700, letterSpacing: "0.5px" },
    },

    shape: {
      borderRadius: 12, // زوايا ناعمة تعكس هدوء التصميم
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 50, // أزرار بيضاوية (Pill-shaped) لتعزيز الطابع الهادئ
            padding: "10px 28px",
            boxShadow: "none",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "none",
              backgroundColor: isLight ? "#3E2723" : "#EFEBE9",
            },
          },
          contained: {
            backgroundColor: isLight ? "#4E342E" : "#D7CCC8",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            backgroundImage: "none",
            backgroundColor: isLight ? "#FFFFFF" : "#251F1C",
            border: `1px solid ${isLight ? "#F1EDE9" : "#3E2723"}`,
            boxShadow: isLight 
              ? "0 4px 20px rgba(78, 52, 46, 0.05)" 
              : "0 4px 25px rgba(0, 0, 0, 0.4)",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: alpha(isLight ? "#FDFBF7" : "#1A1614", 0.85),
            backdropFilter: "blur(8px)",
            color: isLight ? "#3E2723" : "#D7CCC8",
            boxShadow: "none",
            borderBottom: `1px solid ${isLight ? "#EFEBE9" : "#3E2723"}`,
          },
        },
      },
    },
  });
};