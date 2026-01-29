"use client";
import { AppBar, Toolbar, Box, IconButton, Badge, Avatar, Typography, Stack, useTheme } from "@mui/material";
import { NotificationsNone } from "@mui/icons-material";
import { ShoppingCartIcon } from "lucide-react";
import { useMe } from "@/features/user/api/use-me";
import { useCartStore } from "@/features/(customer)/cart/model/useCartStore";
import { SearchBar } from "./SearchBar";

const TopNav = () => {
  const { data: user } = useMe();
  const theme = useTheme();
  const { items } = useCartStore();

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
        <Box sx={{ width: { md: 400, xs: 200 } }}>
          <SearchBar />
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton sx={{ bgcolor: theme.palette.action.hover, borderRadius: 3 }}>
            <Badge variant="dot" color="primary">
              <NotificationsNone fontSize="small" />
            </Badge>
          </IconButton>

          {user?.role !== "restaurant_owner" && (
            <IconButton sx={{ bgcolor: theme.palette.action.hover, borderRadius: 3 }}>
              <Badge badgeContent={items.length} color="primary">
                <ShoppingCartIcon size={20} />
              </Badge>
            </IconButton>
          )}

          <Box sx={{ height: "24px", width: "1px", bgcolor: theme.palette.divider, mx: 1 }} />

          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ cursor: "pointer" }}>
            <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ lineHeight: 1 }}>
                {user?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.role === "restaurant_owner" ? "Restaurant Owner" : "Customer"}
              </Typography>
            </Box>
            <Avatar
              src={(user as any)?.avatar_url}
              sx={{
                width: 42, height: 42,
                borderRadius: 3,
                border: `2px solid ${theme.palette.primary.main}`,
                boxShadow: `0 0 10px ${theme.palette.primary.main}33`
              }}
            />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;