"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon, Notifications } from "@mui/icons-material";
import { useState } from "react";
import { useMe } from "@/features/user/api/use-me";
import { useLogout } from "@/features/user/api/use-logout";
import { useRouter } from "next/navigation";

export default function CustomerNavbar() {
  const theme = useTheme();
  const { data: user } = useMe();
  const { mutate: logout } = useLogout();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side - Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            FoodFlow
          </Typography>
        </Box>

        {/* Right side - Icons & User */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Notifications */}
          <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* User Avatar */}
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              {user?.name?.[0] || "U"}
            </Avatar>
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem disabled>{user?.name}</MenuItem>
            <MenuItem
              onClick={() => {
                logout();
                router.replace("/");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
