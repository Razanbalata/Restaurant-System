// // "use client";
// // import {
// //   Box,
// //   List,
// //   ListItemButton,
// //   ListItemIcon,
// //   ListItemText,
// //   Typography,
// //   Avatar,
// //   Divider,
// //   IconButton,
// //   useTheme,
// //   Tooltip,
// // } from "@mui/material";
// // import {
// //   ChevronLeft,
// //   ChevronRight,
// //   DarkModeRounded,
// //   LightModeRounded,
// //   SettingsRounded,
// // } from "@mui/icons-material";
// // import { usePathname, useRouter } from "next/navigation";
// // import { useMe } from "@/features/user/api/use-me";
// // import { useRestaurant } from "@/app/providers/RestaurantContext";
// // import { adminMenu, customerMenu } from "@/shared/config/sidebar.config";
// // import { useColorMode } from "@/app/providers/ThemeProvider";
// // import { LogOutIcon } from "lucide-react";
// // import { useLogout } from "@/features/user/api/use-logout";

// // export const Sidebar = ({
// //   open,
// //   onToggle,
// // }: {
// //   open: boolean;
// //   onToggle: () => void;
// // }) => {
// //   const theme = useTheme();
// //   const pathname = usePathname();
// //   const router = useRouter();
// //   const { data: user } = useMe();
// //   const { selectedRestaurant } = useRestaurant();
// //   const { toggleColorMode } = useColorMode();
// //   const { mutate } = useLogout();

// //   const isAdmin = user?.role === "restaurant_owner";
// //   const menuItems = isAdmin ? adminMenu : customerMenu;

// //   return (
// //     <Box
// //       sx={{
// //         width: open ? 260 : 80,
// //         transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
// //         height: "100vh",
// //         borderRight: `1px solid ${theme.palette.divider}`,
// //         display: "flex",
// //         flexDirection: "column",
// //         bgcolor: theme.palette.background.paper,
// //         position: "relative",
// //       }}
// //     >
// //       {/* Profile Section */}
// //       <Box
// //         sx={{
// //           p: 2,
// //           display: "flex",
// //           alignItems: "center",
// //           gap: 2,
// //           position: "relative",
// //         }}
// //       >
// //         {/* Avatar Hover Toggle */}
// //         <Box
// //           sx={{
// //             position: "relative",
// //             display: "inline-block",
// //             cursor: !open ? "pointer" : "default",
// //             "&:hover .avatar-toggle": {
// //               opacity: 1,
// //               transform: "translateY(-50%) scale(1)",
// //             },
// //           }}
// //           onClick={() => open && onToggle()} // اضغط لفتح السايدبار
// //         >
// //           <Avatar sx={{ bgcolor: theme.palette.primary.main, fontWeight: "bold" }}>
// //             {user?.name?.[0]}
// //           </Avatar>

// //           {!open && (
// //             <Tooltip title="Expand sidebar" placement="right">
// //               <IconButton
// //                 className="avatar-toggle"
// //                 onClick={onToggle}
// //                 size="large"
// //                 sx={{
// //                   position: "absolute",
// //                   left: -2,
// //                   top: "50%",
// //                   transform: "translateY(-50%) scale(0.8)",
// //                   opacity: 0,
// //                   bgcolor: theme.palette.background.paper,
// //                   border: `1px solid ${theme.palette.divider}`,
// //                   boxShadow: 2,
// //                   transition: "all 0.2s ease",
// //                   "&:hover": { bgcolor: theme.palette.primary.main, color: "#fff" },
// //                 }}
// //               >
// //                 <ChevronRight fontSize="small" />
// //               </IconButton>
// //             </Tooltip>
// //           )}
// //         </Box>

// //         {open && (
// //           <Box sx={{ flexGrow: 1, minWidth: 0 }}>
// //             <Typography variant="subtitle2" noWrap fontWeight={700}>
// //               {user?.name}
// //             </Typography>
// //             <Typography variant="caption" color="text.secondary">
// //               {isAdmin ? "Restaurant Manager" : "Premium Customer"}
// //             </Typography>
// //           </Box>
// //         )}

// //         {/* Collapse Toggle زر جانبي */}
// //         {open && (
// //           <Tooltip title="Collapse sidebar" placement="right">
// //             <IconButton
// //               onClick={onToggle}
// //               size="small"
// //               sx={{
// //                 bgcolor: theme.palette.action.hover,
// //                 border: `1px solid ${theme.palette.divider}`,
// //                 transition: "all 0.25s ease",
// //                 "&:hover": { bgcolor: theme.palette.action.selected },
// //               }}
// //             >
// //               <ChevronLeft />
// //             </IconButton>
// //           </Tooltip>
// //         )}
// //       </Box>

// //       <Divider sx={{ opacity: 0.6 }} />

// //       {/* Menu Items */}
// //       <List sx={{ flexGrow: 1, px: 1.5, py: 2 }}>
// //         {menuItems.map(({ label, icon: Icon, path }: any) => {
// //           const fullPath = path.includes("restaurantDetails")
// //             ? `${path}/${selectedRestaurant?.id}`
// //             : path;
// //           const isActive = pathname === fullPath;

// //           return (
// //             <Tooltip key={label} title={open ? "" : label} placement="right">
// //               <ListItemButton
// //                 onClick={() => router.push(fullPath)}
// //                 sx={{
// //                   borderRadius: 3,
// //                   mb: 1,
// //                   justifyContent: open ? "initial" : "center",
// //                   bgcolor: isActive
// //                     ? `${theme.palette.primary.main}15`
// //                     : "transparent",
// //                   color: isActive
// //                     ? theme.palette.primary.main
// //                     : theme.palette.text.secondary,
// //                   "&:hover": {
// //                     bgcolor: isActive
// //                       ? `${theme.palette.primary.main}25`
// //                       : theme.palette.action.hover,
// //                   },
// //                 }}
// //               >
// //                 <ListItemIcon
// //                   sx={{
// //                     minWidth: 0,
// //                     mr: open ? 2 : "auto",
// //                     color: isActive ? theme.palette.primary.main : "inherit",
// //                   }}
// //                 >
// //                   <Icon size={22} />
// //                 </ListItemIcon>
// //                 {open && (
// //                   <ListItemText
// //                     primary={label}
// //                     primaryTypographyProps={{
// //                       fontSize: "0.9rem",
// //                       fontWeight: isActive ? 700 : 500,
// //                     }}
// //                   />
// //                 )}
// //               </ListItemButton>
// //             </Tooltip>
// //           );
// //         })}
// //       </List>

// //       {/* Bottom Actions */}
// //       <Box sx={{ p: 1.5, borderTop: `1px solid ${theme.palette.divider}` }}>
// //         <ListItemButton
// //           onClick={toggleColorMode}
// //           sx={{ borderRadius: 3, mb: 0.5 }}
// //         >
// //           <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto" }}>
// //             {theme.palette.mode === "dark" ? (
// //               <LightModeRounded />
// //             ) : (
// //               <DarkModeRounded />
// //             )}
// //           </ListItemIcon>
// //           {open && (
// //             <ListItemText

// //               primary={
// //                 theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"
// //               }
// //             />
// //           )}
// //         </ListItemButton>

// //         <ListItemButton

// //           onClick={() => {
// //             mutate();
// //             router.replace("/");
// //           }}
// //           sx={{ borderRadius: 3, color: theme.palette.error.main }}
// //         >
// //           <ListItemIcon
// //             sx={{ minWidth: 0, mr: open ? 2 : "auto", color: "inherit" }}
// //           >
// //             <LogOutIcon size={20} />
// //           </ListItemIcon>
// //           {open && <ListItemText primary="Logout" />}
// //         </ListItemButton>
// //       </Box>
// //     </Box>
// //   );
// // };
// "use client";
// import {
//   Box,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   Avatar,
//   Divider,
//   Tooltip,
//   useTheme,
//   Chip,
//   IconButton,
// } from "@mui/material";
// import {
//   ChevronLeft,
//   ChevronRight,
//   DarkModeRounded,
//   LightModeRounded,
// } from "@mui/icons-material";
// import {
//   Utensils,
//   LogOut,
// } from "lucide-react";
// import { usePathname, useRouter } from "next/navigation";
// import { useMe } from "@/features/user/api/use-me";
// import { useRestaurant } from "@/app/providers/RestaurantContext";
// import { adminMenu, customerMenu } from "@/shared/config/sidebar.config";
// import { useColorMode } from "@/app/providers/ThemeProvider";
// import { useLogout } from "@/features/user/api/use-logout";
// import { useOrders } from "@/features/(admin)/order/getOrder/api/useOrders";  // استيراد الهوك الخاص بالطلبات

// export const Sidebar = ({
//   open,
//   onToggle,
// }: {
//   open: boolean;
//   onToggle: () => void;
// }) => {
//   const theme = useTheme();
//   const pathname = usePathname();
//   const router = useRouter();
//   const { data: user } = useMe();
//   const { selectedRestaurant } = useRestaurant();
//   const { toggleColorMode } = useColorMode();
//   const { mutate: logout } = useLogout();
  
//   // لجلب عدد الطلبات كما في كود التيلويند
//   const { useOrdersQuery } = useOrders(selectedRestaurant?.id || "rest-1");
//   const { data: orders } = useOrdersQuery
//   const pendingOrdersCount = orders?.filter(
//     (o: any) => ["pending", "confirmed", "preparing"].includes(o.status)
//   ).length || 0;

//   const isAdmin = user?.role === "restaurant_owner";
//   const menuItems = isAdmin ? adminMenu : customerMenu;

//   return (
//     <Box
//       sx={{
//         width: open ? 260 : 80,
//         transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//         height: "100vh",
//         borderRight: `1px solid ${theme.palette.divider}`,
//         display: "flex",
//         flexDirection: "column",
//         bgcolor: "background.paper", // نفس فكرة bg-card
//         position: "relative",
//       }}
//     >
//       {/* 1. Logo Section (نفس تصميم التيلويند) */}
//       <Box sx={{ 
//         height: 64, 
//         display: 'flex', 
//         alignItems: 'center', 
//         px: open ? 2.5 : 0, 
//         justifyContent: open ? 'flex-start' : 'center',
//         gap: 1.5, 
//         borderBottom: `1px solid ${theme.palette.divider}` 
//       }}>
//         <Box sx={{ 
//           minWidth: 36, 
//           height: 36, 
//           bgcolor: 'primary.main', 
//           borderRadius: 2, // rounded-lg
//           display: 'flex', 
//           alignItems: 'center', 
//           justifyContent: 'center' 
//         }}>
//           <Utensils size={18} color="white" />
//         </Box>
//         {open && (
//           <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
//             FoodFlow
//           </Typography>
//         )}
//       </Box>
// {/* 2. Navigation Items */}
// <List sx={{ flexGrow: 1, px: 1.5, py: 2 }}>
//   {menuItems.map(({ label, icon: Icon, path }: any) => {
//     const fullPath = path.includes("restaurantDetails") ? `${path}/${selectedRestaurant?.id}` : path;
//     const isActive = pathname === fullPath;

//     return (
//       <Tooltip key={label} title={open ? "" : label} placement="right">
//         <ListItemButton
//           onClick={() => router.push(fullPath)}
//           sx={{
//             borderRadius: 1.5, // انحناء أقل قليلاً للمستطيلات
//             mb: 0.4, // مسافة بسيطة بين الروابط
//             px: open ? 1.5 : 0, // padding أفقي
//             py: 0.6, // تقليل الـ padding العمودي لجعل المستطيل "نحيف"
//             minHeight: 38, // تحديد ارتفاع ثابت وصغير للمستطيل
//             justifyContent: open ? "initial" : "center",
//             bgcolor: isActive ? `${theme.palette.primary.main}15` : "transparent",
//             color: isActive ? "primary.main" : "text.secondary",
//             "&:hover": {
//               bgcolor: isActive ? `${theme.palette.primary.main}25` : "action.hover",
//             },
//           }}
//         >
//           <ListItemIcon sx={{ 
//             minWidth: 0, 
//             mr: open ? 1.2 : 0, // تقريب الأيقونة من النص
//             color: isActive ? "primary.main" : "inherit",
//             display: 'flex',
//             justifyContent: 'center'
//           }}>
//             <Icon size={18} strokeWidth={isActive ? 2.5 : 2} /> 
//           </ListItemIcon>
          
//           {open && (
//             <ListItemText
//               primary={label}
//               primaryTypographyProps={{
//                 fontSize: "0.82rem", // تصغير الخط قليلاً ليتناسب مع المستطيل النحيف
//                 fontWeight: isActive ? 600 : 500,
//                 letterSpacing: '0.01em'
//               }}
//             />
//           )}

//           {/* Badge الطلبات المعلقة - صغرنا حجمه أيضاً */}
//           {open && label === "Orders" && pendingOrdersCount > 0 && (
//             <Box 
//               sx={{ 
//                 height: 18, 
//                 minWidth: 18, 
//                 px: 0.6,
//                 bgcolor: 'primary.main',
//                 color: 'white',
//                 borderRadius: 1,
//                 fontSize: '0.65rem', 
//                 fontWeight: 'bold',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//             >
//               {pendingOrdersCount}
//             </Box>
//           )}
//         </ListItemButton>
//       </Tooltip>
//     );
//   })}
// </List>

//       {/* 3. User Section (تحت المنوية مباشرة قبل الـ Logout) */}
//       <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
//         <Box sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: 1.5, 
//           mb: 2,
//           justifyContent: open ? 'flex-start' : 'center'
//         }}>
//           <Avatar 
//             sx={{ 
//               width: 36, 
//               height: 36, 
//               bgcolor: 'primary.main', 
//               fontSize: '0.9rem',
//               fontWeight: 'bold'
//             }}
//           >
//             {user?.name?.[0]}
//           </Avatar>
//           {open && (
//             <Box sx={{ overflow: 'hidden' }}>
//               <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
//                 {user?.name}
//               </Typography>
//               <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
//                 {isAdmin ? "Restaurant Owner" : "Customer"}
//               </Typography>
//             </Box>
//           )}
//         </Box>

//         {/* 4. Bottom Buttons (Theme & Logout) */}
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
//           <ListItemButton
//             onClick={toggleColorMode}
//             sx={{ borderRadius: 2, justifyContent: open ? "initial" : "center", px: open ? 2 : 0 }}
//           >
//             <ListItemIcon sx={{ minWidth: 0, mr: open ? 1.5 : 0 }}>
//               {theme.palette.mode === "dark" ? <LightModeRounded fontSize="small" /> : <DarkModeRounded fontSize="small" />}
//             </ListItemIcon>
//             {open && <ListItemText primary="Theme" primaryTypographyProps={{ fontSize: '0.875rem' }} />}
//           </ListItemButton>

//           <ListItemButton
//             onClick={() => {
//               logout();
//               router.replace("/");
//             }}
//             sx={{ 
//               borderRadius: 2, 
//               justifyContent: open ? "initial" : "center", 
//               px: open ? 2 : 0,
//               color: 'error.main',
//               "&:hover": { bgcolor: 'error.lighter' } 
//             }}
//           >
//             <ListItemIcon sx={{ minWidth: 0, mr: open ? 1.5 : 0, color: 'inherit' }}>
//               <LogOut size={18} />
//             </ListItemIcon>
//             {open && <ListItemText primary="Sign out" primaryTypographyProps={{ fontSize: '0.875rem' }} />}
//           </ListItemButton>
//         </Box>
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
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  DarkModeRounded,
  LightModeRounded,
} from "@mui/icons-material";
import {
  Utensils,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMe } from "@/features/user/api/use-me";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { adminMenu, customerMenu } from "@/shared/config/sidebar.config";
import { useColorMode } from "@/app/providers/ThemeProvider";
import { useLogout } from "@/features/user/api/use-logout";
import { useOrders } from "@/features/(admin)/order/getOrder/api/useOrders";
import { NotificationMenu } from "./NotificationMenu"; // تأكد من استيراد مكون الإشعارات

export const Sidebar = ({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) => {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { data: user } = useMe();
  const { selectedRestaurant } = useRestaurant();
  const { toggleColorMode } = useColorMode();
  const { mutate: logout } = useLogout();
  
  // جلب الطلبات لحساب عدد التنبيهات على رابط الـ Orders
  const { useOrdersQuery } = useOrders(selectedRestaurant?.id || "rest-1");
  const { data: orders } = useOrdersQuery;
  const pendingOrdersCount = orders?.filter(
    (o: any) => ["pending", "confirmed", "preparing"].includes(o.status)
  ).length || 0;

  const isAdmin = user?.role === "restaurant_owner";
  const menuItems = isAdmin ? adminMenu : customerMenu;

  return (
    <Box
      sx={{
        width: open ? 260 : 80,
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        height: "100vh",
        borderRight: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        position: "relative",
        zIndex: 1201, // لضمان ظهوره فوق المحتوى
      }}
    >
      {/* 1. Header Section (Logo & Notifications) */}
      <Box sx={{ 
        height: 64, 
        display: 'flex', 
        alignItems: 'center', 
        px: open ? 2 : 0, 
        justifyContent: open ? 'space-between' : 'center',
        borderBottom: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ 
            minWidth: 36, 
            height: 36, 
            bgcolor: 'primary.main', 
            borderRadius: 2, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer'
          }} onClick={onToggle}>
            <Utensils size={18} color="white" />
          </Box>
          {open && (
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', noWrap: true }}>
              FoodFlow
            </Typography>
          )}
        </Box>

        {/* زر الإشعارات يظهر فقط عندما يكون السايدبار مفتوحاً أو كـ Tooltip */}
        {open && <NotificationMenu />}
      </Box>

      {/* 2. Navigation Items */}
      <List sx={{ flexGrow: 1, px: 1.5, py: 2 }}>
   {menuItems.map(({ label, icon: Icon, path }: any) => {
    const fullPath = path.includes("restaurantDetails") ? `${path}/${selectedRestaurant?.id}` : path;
    const isActive = pathname === fullPath;

    return (
      <Tooltip key={label} title={open ? "" : label} placement="right">
        <ListItemButton
          onClick={() => router.push(fullPath)}
          sx={{
            borderRadius: 1.5, // انحناء أقل قليلاً للمستطيلات
            mb: 0.4, // مسافة بسيطة بين الروابط
            px: open ? 1.5 : 0, // padding أفقي
            py: 0.6, // تقليل الـ padding العمودي لجعل المستطيل "نحيف"
            minHeight: 38, // تحديد ارتفاع ثابت وصغير للمستطيل
            justifyContent: open ? "initial" : "center",
            bgcolor: isActive ? `${theme.palette.primary.main}15` : "transparent",
            color: isActive ? "primary.main" : "text.secondary",
            "&:hover": {
              bgcolor: isActive ? `${theme.palette.primary.main}25` : "action.hover",
            },
          }}
        >
          <ListItemIcon sx={{ 
            minWidth: 0, 
            mr: open ? 1.2 : 0, // تقريب الأيقونة من النص
            color: isActive ? "primary.main" : "inherit",
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} /> 
          </ListItemIcon>
          
          {open && (
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                fontSize: "0.82rem", // تصغير الخط قليلاً ليتناسب مع المستطيل النحيف
                fontWeight: isActive ? 600 : 500,
                letterSpacing: '0.01em'
              }}
            />
          )}

          {/* Badge الطلبات المعلقة - صغرنا حجمه أيضاً */}
          {open && label === "Orders" && pendingOrdersCount > 0 && (
            <Box 
              sx={{ 
                height: 18, 
                minWidth: 18, 
                px: 0.6,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: 1,
                fontSize: '0.65rem', 
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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

      {/* 3. Footer Section (User, Theme, Logout) */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
        {/* User Info */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5, 
          mb: 2,
          justifyContent: open ? 'flex-start' : 'center'
        }}>
          <Avatar 
            sx={{ 
              width: 36, 
              height: 36, 
              bgcolor: 'primary.main', 
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}
          >
            {user?.name?.[0]}
          </Avatar>
          {open && (
            <Box sx={{ overflow: 'hidden' }}>
              <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                {user?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block', fontSize: '0.7rem' }}>
                {isAdmin ? "Manager" : "Customer"}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {/* Theme Toggle */}
          <Tooltip title={open ? "" : "Toggle Theme"} placement="right">
            <ListItemButton
              onClick={toggleColorMode}
              sx={{ borderRadius: 2, justifyContent: open ? "initial" : "center", px: open ? 1.5 : 0, minHeight: 40 }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 1.5 : 0 }}>
                {theme.palette.mode === "dark" ? <LightModeRounded fontSize="small" /> : <DarkModeRounded fontSize="small" />}
              </ListItemIcon>
              {open && <ListItemText primary="Theme Mode" primaryTypographyProps={{ fontSize: '0.8rem', fontWeight: 500 }} />}
            </ListItemButton>
          </Tooltip>

          {/* Logout Button */}
          <Tooltip title={open ? "" : "Sign out"} placement="right">
            <ListItemButton
              onClick={() => {
                logout();
                router.replace("/");
              }}
              sx={{ 
                borderRadius: 2, 
                justifyContent: open ? "initial" : "center", 
                px: open ? 1.5 : 0,
                minHeight: 40,
                color: 'error.main',
                "&:hover": { bgcolor: 'error.lighter' } 
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 1.5 : 0, color: 'inherit' }}>
                <LogOut size={18} />
              </ListItemIcon>
              {open && <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.8rem', fontWeight: 600 }} />}
            </ListItemButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};