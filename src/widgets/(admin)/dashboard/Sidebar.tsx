"use client";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Tooltip,
  useTheme,
} from "@mui/material";
import { Utensils, LogOut } from "lucide-react";
import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useMe } from "@/features/user/api/use-me";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { adminMenu, customerMenu } from "@/shared/config/sidebar.config";
import { useColorMode } from "@/app/providers/ThemeProvider";
import { useLogout } from "@/features/user/api/use-logout";
import { useOrders } from "@/features/(admin)/order/getOrder/api/useOrders";
import { useMediaQuery } from "@mui/material";
import ToggleTheme from "@/shared/ui/ToggleTheme";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ open, onToggle }: SidebarProps) => {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { data: user } = useMe();
  const { selectedRestaurant } = useRestaurant();
  const { toggleColorMode } = useColorMode();
  const { mutate: logout } = useLogout();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Orders pending count
  const { useOrdersQuery } = useOrders(selectedRestaurant?.id || "rest-1");
  const { data: orders } = useOrdersQuery;
  const pendingOrdersCount =
    orders?.filter((o: any) =>
      ["pending", "confirmed", "preparing"].includes(o.status)
    ).length || 0;
  const isAdmin = user?.role === "restaurant_owner"
  const menuItems = isAdmin ? adminMenu:customerMenu;

  return (
    <Box
      sx={{
        width: isMobile ? 80 : open ? 280 : 80, // responsive
        transition: "width 0.3s",
        height: "100vh",
        borderRight: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        position: "relative",
        zIndex: 1201,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          px: open && !isMobile ? 2 : 0,
          justifyContent: open && !isMobile ? "space-between" : "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              minWidth: 36,
              height: 36,
              bgcolor: "primary.main",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={onToggle}
          >
            <Utensils size={18} color="white" />
          </Box>
          {open && !isMobile && (
            <Typography
              variant="h6"
              noWrap
              sx={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}
            >
              FoodFlow
            </Typography>
          )}
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ flexGrow: 1, px: 1.5, py: 2 }}>
        {menuItems.map(({ label, icon: Icon, path }: any) => {
          const fullPath = path.includes("restaurantDetails")
            ? `${path}/${selectedRestaurant?.id}`
            : path;
          const isActive = pathname === fullPath;

          return (
            <Tooltip
              key={label}
              title={!open || isMobile ? label : ""}
              placement="right"
            >
              <ListItemButton
                onClick={() => router.push(fullPath)}
                sx={{
                  borderRadius: 1.5,
                  mb: 0.4,
                  px: open && !isMobile ? 1.5 : 0,
                  py: 0.6,
                  minHeight: 38,
                  justifyContent: open && !isMobile ? "initial" : "center",
                  bgcolor: isActive ? `${theme.palette.primary.main}15` : "transparent",
                  color: isActive ? "primary.main" : "text.secondary",
                  "&:hover": {
                    bgcolor: isActive
                      ? `${theme.palette.primary.main}25`
                      : "action.hover",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open && !isMobile ? 1.2 : 0,
                    color: isActive ? "primary.main" : "inherit",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                </ListItemIcon>

                {open && !isMobile && (
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontSize: "0.82rem",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                )}

                {open && !isMobile && label === "Orders" && pendingOrdersCount > 0 && (
                  <Box
                    sx={{
                      height: 18,
                      minWidth: 18,
                      px: 0.6,
                      bgcolor: "primary.main",
                      color: "white",
                      borderRadius: 1,
                      fontSize: "0.65rem",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {pendingOrdersCount}
                  </Box>
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      

      {/* User Avatar */}
      <Box sx={{ p: 1, borderTop: `1px solid ${theme.palette.divider}`,display:"flex",alignItems:"center",justifyContent:"flex-start",gap:1 }}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: "primary.main",
            fontSize: "0.9rem",
            fontWeight: "bold",
            mx: open && !isMobile ? 0 : "auto",
          }}
        >
          {user?.name?.[0]}
        </Avatar>
        {open && !isMobile && (
          <Typography variant="subtitle2" fontWeight={700}>
            {user?.name}
          </Typography>
        )}
      </Box>

      {/* Footer: Theme + Logout */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, mt: "auto" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* Theme toggle */}
         
          <ToggleTheme onToggle={toggleColorMode} open={open} />

          {/* Logout */}
          <ListItemButton
            onClick={() => {
              logout();
              router.replace("/");
            }}
            sx={{
              borderRadius: 2,
              justifyContent: open && !isMobile ? "initial" : "center",
              px: open && !isMobile ? 1.5 : 0,
              minHeight: 20,
              color: "error.main",
              "&:hover": { bgcolor: "error.lighter" },
            }}
          >
            <ListItemIcon
              sx={{ minWidth: 0, mr: open && !isMobile ? 1.5 : 0, color: "inherit" }}
            >
              <LogOut size={18} />
            </ListItemIcon>
            {open && !isMobile && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: "0.8rem", fontWeight: 600 }}
              />
            )}
          </ListItemButton>
        </Box>
      </Box>
    </Box>
  );
};
