"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "@/shared/config/theme"; 

type ColorModeContextType = {
  toggleColorMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
});

export const AppThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  // Load saved mode
  useEffect(() => {
    const saved = localStorage.getItem("themeMode") as "light" | "dark";
    if (saved) setMode(saved);
  }, []);

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", next);
      return next;
    });
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);
