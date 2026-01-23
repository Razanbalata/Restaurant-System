"use client";
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Badge,
  Avatar,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import {
  Search,
  NotificationsNone,
  ChatBubbleOutline,
  SettingsOutlined,
} from "@mui/icons-material";
import { Moon, ShoppingCartIcon, Sun } from "lucide-react";
import { useColorMode } from "@/app/providers/ThemeProvider";
import { useMe } from "@/features/user/api/use-me";
import { useCartStore } from "@/features/(customer)/cart/model/useCartStore";
import { SearchBar } from "./SearchBar";

const TopNav = () => {
  const { data: user } = useMe();
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const { items } = useCartStore();
  const isDark = theme.palette.mode === "dark";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)", // تأثير زجاجي شفاف
        borderBottom: "1px solid #f0f0f0",
        color: "#2d2d2d",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 4 }}>
        {/* الجزء الأيسر: البحث أو المسار */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 0.5,
              borderRadius: "12px",
              width: { md: 300, xs: 150 },
              border: "1px solid #E5E7EB",
            }}
          >
            <SearchBar />
          </Box>
        </Box>

        {/* الجزء الأيمن: الإشعارات والبروفايل */}
        <Stack direction="row" spacing={1} alignItems="center">
          {/* Dark Mode Toggle */}
          {/* <IconButton onClick={toggleColorMode} color="inherit">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton> */}

          <IconButton sx={{ bgcolor: "#F3F4F6", borderRadius: "12px", p: 1 }}>
            <Badge variant="dot" color="error">
              <NotificationsNone fontSize="small" />
            </Badge>
          </IconButton>

          {user?.role !== "restaurant_owner" && (
            <IconButton color="inherit">
              <Badge badgeContent={items.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}

          <Box
            sx={{ height: "30px", width: "1px", bgcolor: "#E5E7EB", mx: 1 }}
          />

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ cursor: "pointer", ml: 1 }}
          >
            <Box
              sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}
            >
              <Typography
                variant="subtitle2"
                fontWeight="700"
                sx={{ lineHeight: 1 }}
              >
                {user?.name}
              </Typography>
              <Typography variant="caption" color="textSecondary">
               {user?.role === "restaurant_owner" ? "مالك مطعم" : "زبون"}
              </Typography>
            </Box>
            <Avatar
              src="https://via.placeholder.com/150"
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                border: "2px solid #FF5B22",
              }}
            />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
