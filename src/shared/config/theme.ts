import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") => {
  const isLight = mode === "light";

  return createTheme({
    palette: {
      mode,
      primary: {
        // oklch(0.65 0.2 30) -> Light | oklch(0.7 0.18 30) -> Dark
        main: isLight ? "#d33d2a" : "#e67a6e", 
        contrastText: isLight ? "#ffffff" : "#1a0806",
      },
      secondary: {
        // oklch(0.97 0.01 90) -> Light | oklch(0.25 0.01 30) -> Dark
        main: isLight ? "#f6f4f1" : "#403532",
        contrastText: isLight ? "#21100d" : "#f6f4f1",
      },
      background: {
        // oklch(0.995 0.002 90) -> Light | oklch(0.15 0.01 30) -> Dark
        default: isLight ? "#fefdfc" : "#261f1d", 
        paper: isLight ? "#ffffff" : "#2e2623",
      },
      text: {
        primary: isLight ? "#21100d" : "#f6f4f1",
        secondary: isLight ? "#857a77" : "#a39996",
      },
      divider: isLight ? "#ebe8e5" : "#473d3a",
      success: {
        main: "#3d965d", // oklch(0.65 0.18 145)
      },
    },

    typography: {
      fontFamily: "'Inter', 'Cairo', sans-serif",
      h1: { fontWeight: 800, letterSpacing: "-0.02em" },
      h2: { fontWeight: 700, letterSpacing: "-0.01em" },
      button: { textTransform: "none", fontWeight: 600 },
    },

    shape: {
      borderRadius: 12,
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "var(--radius, 12px)", // يقرأ من CSS للمرونة
            padding: "10px 24px",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              transform: "translateY(-1px)",
              transition: "all 0.2s ease-in-out",
            },
          },
          containedPrimary: {
            "&:hover": {
              backgroundColor: isLight ? "#b12d1d" : "#f19a90", 
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "calc(var(--radius, 12px) * 2)",
            backgroundImage: "none",
            border: `1px solid ${isLight ? "#ebe8e5" : "#473d3a"}`,
            boxShadow: isLight 
              ? "0 1px 3px 0 rgba(0, 0, 0, 0.05)" 
              : "0 1px 3px 0 rgba(0, 0, 0, 0.3)",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: isLight ? "rgba(255, 255, 255, 0.8)" : "rgba(38, 31, 29, 0.8)",
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${isLight ? "#ebe8e5" : "#473d3a"}`,
            color: isLight ? "#21100d" : "#f6f4f1",
          },
        },
      },
    },
  });
};