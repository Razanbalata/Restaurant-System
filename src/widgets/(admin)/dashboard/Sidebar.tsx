"use client";
import {
  Box, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Avatar, Divider, IconButton, useTheme, Tooltip
} from "@mui/material";
import {
  ChevronLeft, ChevronRight, DarkModeRounded, LightModeRounded,
  SettingsRounded
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useMe } from "@/features/user/api/use-me";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { adminMenu, customerMenu } from "@/shared/config/sidebar.config";
import { useColorMode } from "@/app/providers/ThemeProvider";
import { LogOutIcon } from "lucide-react";
import { useLogout } from "@/features/user/api/use-logout";

export const Sidebar = ({ open, onToggle }: { open: boolean; onToggle: () => void; }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { data: user } = useMe();
  const { selectedRestaurant } = useRestaurant();
  const { toggleColorMode } = useColorMode();
  const { mutate } = useLogout();

  const isAdmin = user?.role === "restaurant_owner";
  const menuItems = isAdmin ? adminMenu : customerMenu;

  return (
    <Box
      sx={{
        width: open ? 260 : 80,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        height: "100vh",
        borderRight: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.background.paper, // يعتمد على الثيم
      }}
    >
      {/* Profile Section */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: theme.palette.primary.main, fontWeight: 'bold' }}>
          {user?.name?.[0]}
        </Avatar>

        {open && (
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap fontWeight={700}>
              {user?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {isAdmin ? "مدير مطعم" : "عميل مميز"}
            </Typography>
          </Box>
        )}

        <IconButton onClick={onToggle}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      <Divider sx={{ opacity: 0.6 }} />

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, px: 1.5, py: 2 }}>
        {menuItems.map(({ label, icon: Icon, path }) => {
          const fullPath = path.includes("restaurantDetails") 
            ? `${path}/${selectedRestaurant?.id}` 
            : path;
          const isActive = pathname === fullPath;

          return (
            <Tooltip key={label} title={open ? "" : label} placement="right">
              <ListItemButton
                onClick={() => router.push(fullPath)}
                sx={{
                  borderRadius: 3,
                  mb: 1,
                  justifyContent: open ? "initial" : "center",
                  // استخدام لون البراند مع شفافية بسيطة عند التفعيل
                  bgcolor: isActive ? `${theme.palette.primary.main}15` : "transparent",
                  color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                  "&:hover": {
                    bgcolor: isActive ? `${theme.palette.primary.main}25` : theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 0, 
                  mr: open ? 2 : "auto", 
                  color: isActive ? theme.palette.primary.main : "inherit" 
                }}>
                  <Icon size={22} />
                </ListItemIcon>
                {open && (
                  <ListItemText 
                    primary={label} 
                    primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: isActive ? 700 : 500 }} 
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      {/* Bottom Actions */}
      <Box sx={{ p: 1.5, borderTop: `1px solid ${theme.palette.divider}` }}>
        <ListItemButton onClick={toggleColorMode} sx={{ borderRadius: 3, mb: 0.5 }}>
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto" }}>
            {theme.palette.mode === "dark" ? <LightModeRounded /> : <DarkModeRounded />}
          </ListItemIcon>
          {open && <ListItemText primary={theme.palette.mode === "dark" ? "الوضع الفاتح" : "الوضع الداكن"} />}
        </ListItemButton>

        <ListItemButton 
          onClick={() => mutate()} 
          sx={{ borderRadius: 3, color: theme.palette.error.main }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", color: "inherit" }}>
            <LogOutIcon size={20} />
          </ListItemIcon>
          {open && <ListItemText primary="تسجيل الخروج" />}
        </ListItemButton>
      </Box>
    </Box>
  );
};