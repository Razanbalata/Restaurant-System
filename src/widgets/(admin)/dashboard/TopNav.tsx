"use client";

import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Avatar,
  Typography,
  Stack,
  useTheme,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { Utensils, ShoppingCartIcon } from "lucide-react";
import { NotificationsNone } from "@mui/icons-material";
import { useMe } from "@/features/user/api/use-me";
import { useCartStore } from "@/features/(customer)/cart/model/useCartStore";
import { SearchBar } from "./SearchBar";
import { useNotificationStore } from "@/shared/notifications/useNotificationStore";
import { useRouter } from "next/navigation";

const TopNav = () => {
  const { data: user } = useMe();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { items } = useCartStore();
  const { count } = useNotificationStore();
  const router = useRouter();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: `${theme.palette.background.paper}CC`,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        {/* Left side: Logo + Search */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
          {/* Search */}
          <Box sx={{ flex: 1 }}>
            <SearchBar />
          </Box>
        </Box>

        {/* Right side */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          {!isMobile && (
            <>
              {/* Notifications */}
              <IconButton sx={{ bgcolor: theme.palette.action.hover, borderRadius: 3 }}>
                <Badge badgeContent={count} color="primary">
                  <NotificationsNone fontSize="small" />
                </Badge>
              </IconButton>

              {/* Cart (if customer) */}
              {user?.role !== "restaurant_owner" && (
                <IconButton
                  sx={{ bgcolor: theme.palette.action.hover, borderRadius: 3 }}
                  onClick={() => router.push("/customer/cart")}
                >
                  <Badge badgeContent={items.length} color="primary">
                    <ShoppingCartIcon size={20} />
                  </Badge>
                </IconButton>
              )}

              <Divider orientation="vertical" flexItem />
            </>
          )}

          {/* Avatar + Name + Role */}
          <Stack direction="row-reverse"  spacing={1} alignItems="center">
            {!isMobile && user?.name && (
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="subtitle2" fontWeight={700}>
                  {user.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.role === "restaurant_owner" ? "Restaurant Owner" : "Customer"}
                </Typography>
              </Box>
            )}
            <Avatar
              src={(user as any)?.avatar_url}
              sx={{
                width: 36,
                height: 36,
                borderRadius: 3,
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
