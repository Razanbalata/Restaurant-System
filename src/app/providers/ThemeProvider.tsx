"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { getTheme } from "@/shared/config/theme";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

// المكون الداخلي الذي يتعامل مع ثيم MUI
const MUIThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ننتظر حتى يتم تحميل المكون في المتصفح لتجنب تعارض الـ Hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const mode = (resolvedTheme as "light" | "dark") || "light";
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleColorMode = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  // لتجنب الوميض، لا نرندر الـ ThemeProvider إلا بعد التأكد من الـ Mounting
  // لكننا نضع الـ CssBaseline والـ Provider الخارجي ليعمل السكربت
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    // NextThemesProvider هو المسؤول عن تخزين المود في LocalStorage ومنع الوميض
    <NextThemesProvider attribute="class" defaultTheme="light">
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </NextThemesProvider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);