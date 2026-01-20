// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: mode === "light" ? "#10B981" : "#34D399",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: mode === "light" ? "#3B82F6" : "#60A5FA",
        contrastText: "#FFFFFF",
      },

      // 🌟 خلفيات حديثة وهادئة
      background: {
        default: mode === "light" ? "#F1F3F5" : "#0B1120", // رمادي فاتح / كحلي داكن
        paper: mode === "light" ? "#F9FAFB" : "#111827",   // أخف من الخلفية لكن متناسق
      },

      text: {
        primary: mode === "light" ? "#1E293B" : "#F1F5F9",
        secondary: mode === "light" ? "#475569" : "#94A3B8",
      },

      divider: mode === "light" ? "#E2E8F0" : "#1F2937",

      action: {
        hover: mode === "light" ? "rgba(16,185,129,0.08)" : "rgba(52,211,153,0.1)",
        selected: mode === "light" ? "rgba(16,185,129,0.12)" : "rgba(52,211,153,0.15)",
      },
    },

    typography: {
      fontFamily: "'Cairo', sans-serif",
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      body1: { fontWeight: 500 },
      body2: { fontWeight: 400 },
    },

    shape: {
      borderRadius: 12,
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(16,185,129,0.2)",
            },
          },
        },
      },

      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            margin: "4px 8px",
            "&.Mui-selected": {
              backgroundColor: mode === "light" ? "rgba(16,185,129,0.12)" : "rgba(52,211,153,0.15)",
              color: mode === "light" ? "#10B981" : "#34D399",
              "& .MuiListItemIcon-root": {
                color: mode === "light" ? "#10B981" : "#34D399",
              },
            },
            "&:hover": {
              backgroundColor: mode === "light" ? "rgba(16,185,129,0.08)" : "rgba(52,211,153,0.1)",
            },
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            boxShadow: mode === "light"
              ? "0 1px 3px rgba(0,0,0,0.1)"
              : "0 4px 12px rgba(0,0,0,0.25)",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#F9FAFB" : "#111827",
            color: mode === "light" ? "#1E293B" : "#F1F5F9",
            boxShadow: "none",
            borderBottom: `1px solid ${mode === "light" ? "#E2E8F0" : "#1F2937"}`,
          },
        },
      },
    },
  });
