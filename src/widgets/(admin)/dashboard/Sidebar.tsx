// "use client";
// import { List, ListItemButton, ListItemIcon, ListItemText, Box, Divider, Typography, Avatar } from '@mui/material';
// import {
//   RestaurantMenuRounded, ShoppingBagRounded, HistoryRounded,
//   DashboardRounded, ShoppingCartRounded, BarChartRounded,
//   FavoriteRounded, SettingsRounded
// } from '@mui/icons-material';
// import { usePathname, useRouter } from 'next/navigation';
// import { useMe } from '@/features/user/api/use-me';
// import { useRestaurant } from '@/app/providers/RestaurantContext';

// export const Sidebar = () => {
//   const {selectedRestaurant} = useRestaurant()
//   const router = useRouter();
//   const pathname = usePathname();
//   const { data: user } = useMe();

//   const isAdmin = user?.role === "restaurant_owner";

//   // قوائم الأونر (Admin)
//   const adminItems = [
//     { text: 'مطاعمي', icon: <BarChartRounded />, path: '/dashbaord' },
//     { text: 'لوحة التحكم', icon: <DashboardRounded />, path: `/restaurantDetails/${selectedRestaurant?.id}` },
//     { text: 'الطلبات الحية', icon: <ShoppingCartRounded />, path: '/orders' },
//     { text: 'إدارة المنيو', icon: <RestaurantMenuRounded />, path: '/menu' },

//   ];

//   // قوائم الزبون (Customer)
//   const customerItems = [
//     { text: 'استكشف المطاعم', icon: <RestaurantMenuRounded />, path: '/explore' },
//     { text: 'طلباتي الحالية', icon: <ShoppingBagRounded />, path: '/my-orders' },
//     { text: 'المفضلة', icon: <FavoriteRounded />, path: '/favorites' },
//     { text: 'سجل الطلبات', icon: <HistoryRounded />, path: '/history' },
//   ];

//   const currentItems = isAdmin ? adminItems : customerItems;

//   return (
//     <Box sx={{ width: 260, height: '100vh', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>

//       {/* البروفايل العلوي - يظهر للكل */}
//       <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
//         <Avatar src={user?.avatar_url} sx={{ bgcolor: '#FF5B22' }}>{user?.name?.[0]}</Avatar>
//         <Box>
//           <Typography variant="subtitle2" fontWeight="700">{user?.name || "زائر"}</Typography>
//           <Typography variant="caption" color="text.secondary">
//             {isAdmin ? "مدير مطعم" : "عميل مميز"}
//           </Typography>
//         </Box>
//       </Box>

//       <Divider sx={{ mx: 2, mb: 2 }} />

//       {/* القائمة الديناميكية */}
//       <List sx={{ flexGrow: 1, px: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
//         <Typography variant="caption" sx={{ px: 2, mb: 1, color: '#9CA3AF', fontWeight: 700, letterSpacing: 1 }}>
//            القائمة الرئيسية
//         </Typography>

//         {currentItems.map((item) => {
//           const isActive = pathname === item.path;
//           console.log("ati",isActive)
//           return (
//             <ListItemButton
//               key={item.text}
//               onClick={() => router.push(item.path)}
//               sx={{
//                 borderRadius: '12px',
//                 py: 1,
//                 bgcolor: isActive ? 'rgba(255, 91, 34, 0.08)' : 'transparent',
//                 color: isActive ? '#FF5B22' : '#6B7280',
//                 '&:hover': { bgcolor: 'rgba(255, 91, 34, 0.04)' },
//               }}
//             >
//               <ListItemIcon sx={{ color: isActive ? '#FF5B22' : '#9CA3AF', minWidth: 40 }}>
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText
//                 primary={item.text}
//                 primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: isActive ? 700 : 500 }}
//               />
//             </ListItemButton>
//           );
//         })}
//       </List>

//       {/* خيارات ثابتة في الأسفل (الإعدادات) */}
//       <Box sx={{ p: 2 }}>
//         <ListItemButton sx={{ borderRadius: '12px', color: '#6B7280' }}>
//           <ListItemIcon><SettingsRounded /></ListItemIcon>
//           <ListItemText primary="الإعدادات" />
//         </ListItemButton>
//       </Box>
//     </Box>
//   );
// };

"use client";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  DarkModeRounded,
  LightModeRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMe } from "@/features/user/api/use-me";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { adminMenu, customerMenu } from "@/shared/config/sidebar.config";
import { Tooltip } from "@mui/material";
import { useColorMode } from "@/app/providers/ThemeProvider";

export const Sidebar = ({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user } = useMe();
  const { selectedRestaurant } = useRestaurant();
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  const isAdmin = user?.role === "restaurant_owner";
  const menuItems = isAdmin ? adminMenu : customerMenu;

  return (
    <Box
      sx={{
        width: open ? 260 : 80,
        transition: "width 0.3s ease",
        height: "100vh",
        borderRight: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.mode === "light" 
      ? "#F9FAFB"  // لون رمادي خفيف جداً (Stone/Slate) في وضع الفاتح يعطي فخامة أكثر من الأبيض
      : theme.palette.background.paper,
      }}
    >
      {/* Profile */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: "#FF5B22" }}>{user?.name?.[0]}</Avatar>

        {open && (
          <Box>
            <Typography fontWeight={700}>{user?.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {isAdmin ? "مدير مطعم" : "عميل"}
            </Typography>
          </Box>
        )}

        <IconButton onClick={onToggle} sx={{ ml: "auto" }}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      <Divider />

      {/* Menu */}
      <List sx={{ flexGrow: 1, px: 1 }}>
        {menuItems.map(({ label, icon: Icon, path }) => {
          const isActive = pathname.startsWith(path);

          return (
            <Tooltip key={label} title={open ? "" : label} placement="right">
              <ListItemButton
                key={label}
                onClick={() =>
                  router.push(
                    path.includes("restaurantDetails")
                      ? `${path}/${selectedRestaurant?.id}`
                      : path,
                  )
                }
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  justifyContent: open ? "initial" : "center",
                  bgcolor: isActive ? "rgba(255,91,34,0.12)" : "transparent",
                  color: isActive ? "primary.main" : "text.secondary",
                  "&:hover": {
                    bgcolor: "rgba(255,91,34,0.06)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    color: "inherit",
                  }}
                >
                  <Icon />
                </ListItemIcon>

                {open && (
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 700 : 500,
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      {/* Theme Toggle */}
      <Box sx={{ px: 1, mb: 1 }}>
        <Tooltip
          title={
            open
              ? ""
              : theme.palette.mode === "light"
                ? "الوضع الداكن"
                : "الوضع الفاتح"
          }
          placement="right"
        >
          <ListItemButton
            onClick={toggleColorMode}
            sx={{
              borderRadius: 2,
              justifyContent: open ? "initial" : "center",
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto" }}>
              {theme.palette.mode === "light" ? (
                <DarkModeRounded />
              ) : (
                <LightModeRounded />
              )}
            </ListItemIcon>

            {open && (
              <ListItemText
                primary={
                  theme.palette.mode === "light"
                    ? "الوضع الداكن"
                    : "الوضع الفاتح"
                }
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>

      {/* Settings */}
      <Box sx={{ p: 1 }}>
        <ListItemButton sx={{ borderRadius: 2 }}>
          <ListItemIcon>
            <SettingsRounded />
          </ListItemIcon>
          {open && <ListItemText primary="الإعدادات" />}
        </ListItemButton>
      </Box>
    </Box>
  );
};
