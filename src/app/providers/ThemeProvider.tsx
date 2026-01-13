"use client";

import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") as "light" | "dark";
    if (savedMode) setMode(savedMode);
  }, []);

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prev) => {
        const next = prev === "light" ? "dark" : "light";
        localStorage.setItem("themeMode", next);
        return next;
      });
    },
  }), []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: "#F97316", // لون البرتقالي العصري
        contrastText: "#fff",
      },
      background: {
        // خلفية الصفحة
        default: mode === "light" ? "#F8FAFC" : "#020617", 
        // خلفية الكاردز والهيدر
        paper: mode === "light" ? "#FFFFFF" : "#0F172A",
      },
      text: {
        primary: mode === "light" ? "#1E293B" : "#F1F5F9",
        secondary: mode === "light" ? "#64748B" : "#94A3B8",
      },
    },
    typography: {
      fontFamily: "'Cairo', sans-serif", // يفضل استدعاء خط Cairo في globals.css
    },
    shape: {
      borderRadius: 2, // حواف ناعمة لكل المكونات
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            // الهيدر يتغير لونه تلقائياً بناءً على الـ paper background
            backgroundColor: mode === "light" ? "#FFFFFF" : "#0F172A",
            color: mode === "light" ? "#1E293B" : "#F1F5F9",
            backgroundImage: "none",
            boxShadow: "none",
            borderBottom: `1px solid ${mode === "light" ? "#E2E8F0" : "#1E293B"}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            boxShadow: mode === "light" 
              ? "0 1px 3px 0 rgb(0 0 0 / 0.1)" 
              : "0 4px 6px -1px rgb(0 0 0 / 0.2)",
            border: `1px solid ${mode === "light" ? "#E2E8F0" : "#1E293B"}`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: "none",
            fontWeight: 700,
          },
        },
      },
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useColorMode = () => useContext(ColorModeContext);