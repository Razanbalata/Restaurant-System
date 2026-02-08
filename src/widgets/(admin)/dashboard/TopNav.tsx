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
  List,
  MenuItem,
  Menu,
  ListItemText,
} from "@mui/material";
import {
  Delete,
  Edit,
  NotificationsNone,
  ShoppingBasket,
} from "@mui/icons-material";
import {  ShoppingCartIcon } from "lucide-react";
import { useMe } from "@/features/user/api/use-me";
import { useCartStore } from "@/features/(customer)/cart/model/useCartStore";
import { SearchBar } from "./SearchBar";
import { useState } from "react";
import { useNotificationStore } from "@/shared/notifications/useNotificationStore";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { useRouter } from "next/navigation";

const TopNav = () => {
  const { data: user } = useMe();
  const theme = useTheme();
  const { items } = useCartStore();
  const { count,notifications, clearNotifications } = useNotificationStore();
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
  // استخدمي currentTarget لضمان الإمساك بالزر نفسه وليس الأيقونة الداخلية
  const element = event.currentTarget; 
  console.log("Element captured:", element);
  setAnchorEl(element);
};

  const handleClose = () => {
    setAnchorEl(null);
    // اختياري: إذا أردتِ تصفير العداد عند فتح القائمة فقط وليس مسح الإشعارات
    // clearNotifications();
  };

  const getIcon = (type: string) => {
    if (type === "INSERT")
      return <ShoppingBasket sx={{ color: "success.main", mr: 1 }} />;
    if (type === "UPDATE") return <Edit sx={{ color: "info.main", mr: 1 }} />;
    return <Delete sx={{ color: "error.main", mr: 1 }} />;
  };
console.log("هل الـ anchorEl موجود؟", !!anchorEl);
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
          <IconButton
            onClick={handleOpen}
            sx={{ bgcolor: theme.palette.action.hover, borderRadius: 3 }}
          >
            <Badge badgeContent={count} variant="standard" color="primary">
              <NotificationsNone fontSize="small" />
            </Badge>
          </IconButton>

          {/* Notification Menu====================== */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              sx: {
                width: 320,
                maxHeight: 400,
                mt: 1.5,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
                borderRadius: 2,
                zIndex: 9999
              },
            }}
          >
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: "1rem", fontWeight: 700 }}
              >
                Notifications
              </Typography>
              {notifications.length > 0 && (
                <Typography
                  variant="caption"
                  sx={{
                    cursor: "pointer",
                    color: "primary.main",
                    fontWeight: 600,
                  }}
                  onClick={clearNotifications}
                >
                  Delete All
                </Typography>
              )}
            </Box>

            <Divider />

            <List sx={{ p: 0 }}>
              {notifications.length === 0 ? (
                <Box sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    No new notifications
                  </Typography>
                </Box>
              ) : (
                notifications.map((notif) => (
                  <MenuItem
                    key={notif.id}
                    onClick={handleClose}
                    sx={{ py: 1.5, borderBottom: "1px solid #f0f0f0" }}
                  >
                    {getIcon(notif.type)}
                    <ListItemText
                    onClick={()=>router.push(`/orders/${notif.order_id}`)}
                      primary={
                        notif.type === "INSERT"
                          ? "New order received!"
                          : "Order status updated"
                      }
                      secondary={
                        <Box
                          component="span"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 0.5,
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            {notif.status || "معالجة"}
                          </Typography>
                          <Typography variant="caption" color="text.disabled">
                            {notif.time}
                          </Typography>
                        </Box>
                      }
                      primaryTypographyProps={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                      }}
                    />
                  </MenuItem>
                ))
              )}
            </List>
          </Menu>

          {user?.role !== "restaurant_owner" && (
            <IconButton
              sx={{ bgcolor: theme.palette.action.hover, borderRadius: 3 }}
              onClick={()=>router.push("/customer/cart")}
            >
              <Badge badgeContent={items.length} color="primary">
                <ShoppingCartIcon size={20} />
              </Badge>
            </IconButton>
          )}

          <Box
            sx={{
              height: "24px",
              width: "1px",
              bgcolor: theme.palette.divider,
              mx: 1,
            }}
          />

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <Box
              sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{ lineHeight: 1 }}
              >
                {user?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.role === "restaurant_owner"
                  ? "Restaurant Owner"
                  : "Customer"}
              </Typography>
            </Box>
            <Avatar
              src={(user as any)?.avatar_url}
              sx={{
                width: 42,
                height: 42,
                borderRadius: 3,
                border: `2px solid ${theme.palette.primary.main}`,
                boxShadow: `0 0 10px ${theme.palette.primary.main}33`,
              }}
            />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
