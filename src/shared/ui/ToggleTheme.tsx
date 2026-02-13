import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

function ToggleTheme({ onToggle, open }:any) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <ListItemButton
      onClick={onToggle}
      sx={{
        borderRadius: 2,
        justifyContent: open && !isMobile ? "initial" : "center",
        px: open && !isMobile ? 1.5 : 0,
        minHeight: 20,
      }}
    >
      <ListItemIcon sx={{ minWidth: 0, mr: open && !isMobile ? 1.5 : 0 }}>
        {theme.palette.mode === "dark" ? (
          <LightModeRounded sx={{ fontSize: 18 }} />
        ) : (
          <DarkModeRounded sx={{ fontSize: 18 }} />
        )}
      </ListItemIcon>
      {open && !isMobile && (
        <ListItemText
          primary="Theme Mode"
          primaryTypographyProps={{ fontSize: "0.8rem", fontWeight: 500 }}
        />
      )}
    </ListItemButton>
  );
}

export default ToggleTheme;
