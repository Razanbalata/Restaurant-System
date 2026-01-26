import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        // البرتقالي المحروق (فاتح للشهية)
        main: mode === "light" ? "#F59E0B" : "#FBBF24", 
        contrastText: "#FFFFFF",
      },
      secondary: {
        // الأخضر (للأكل الصحي والطازج)
        main: mode === "light" ? "#10B981" : "#34D399",
        contrastText: "#FFFFFF",
      },
      error: {
        main: "#EF4444",
      },
      background: {
        // خلفيات كريمية دافئة للـ Light Mode
        default: mode === "light" ? "#FDFCFB" : "#0F172A",
        paper: mode === "light" ? "#FFFFFF" : "#1E293B",
      },
      text: {
        primary: mode === "light" ? "#1E293B" : "#F8FAFC",
        secondary: mode === "light" ? "#64748B" : "#94A3B8",
      },
      divider: mode === "light" ? "#F1F5F9" : "#334155",
    },

    typography: {
      fontFamily: "'Cairo', sans-serif",
      h1: { fontWeight: 800, color: mode === "light" ? "#1E293B" : "#FFFFFF" },
      h6: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 700 },
    },

    shape: {
      borderRadius: 16, // زوايا منحنية أكثر تعطي طابع "ودود" للمطاعم
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "8px 20px",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 16px rgba(245, 158, 11, 0.3)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: mode === "light" 
              ? "0 4px 20px rgba(0,0,0,0.05)" 
              : "0 4px 20px rgba(0,0,0,0.4)",
            border: `1px solid ${mode === "light" ? "#F1F5F9" : "#334155"}`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "rgba(255,255,255,0.8)" : "rgba(15,23,42,0.8)",
            backdropFilter: "blur(10px)", // تأثير الزجاج المضبب (Modern look)
            color: mode === "light" ? "#1E293B" : "#F8FAFC",
            boxShadow: "none",
            borderBottom: `1px solid ${mode === "light" ? "#F1F5F9" : "#334155"}`,
          },
        },
      },
    },
  });