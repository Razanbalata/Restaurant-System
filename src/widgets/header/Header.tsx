"use client";
import Link from "next/link";
import { User, Store, LogOut, ShoppingBag, ChevronDown, Sun, Moon } from "lucide-react";
import { useMe } from "@/features/user/api/use-me";
import { useLogout } from "@/features/user/api/use-logout";
import { useCart } from "@/features/cart/api/useCart";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  useTheme,
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  Avatar
} from "@mui/material";
import { useState } from "react";
import { useColorMode } from "@/app/providers/ThemeProvider";

export const Header = () => {
  const { data: userData, isLoading } = useMe();
  const { mutate: logout } = useLogout();
  const { data: cart = [] } = useCart(String(userData?.id));
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const isDark = theme.palette.mode === "dark";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(null);

  const hasRestaurant = !!userData?.restaurant;

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        bgcolor: 'background.paper', 
        borderBottom: 1, 
        borderColor: 'divider',
        color: 'text.primary'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 900, 
                color: 'primary.main', 
                letterSpacing: '-1px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Zajel<Box component="span" sx={{ color: 'text.primary' }}>Food</Box>
            </Typography>
          </Link>

          {/* Actions Area */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            
            {/* Dark Mode Toggle */}
            <IconButton onClick={toggleColorMode} color="inherit">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>

            {/* Cart Icon */}
            <IconButton 
              component={Link} 
              href="/cart" 
              color="inherit"
              sx={{ '&:hover': { bgcolor: 'action.hover' } }}
            >
              <Badge badgeContent={cart.length} color="error">
                <ShoppingBag size={22} />
              </Badge>
            </IconButton>

            {isLoading ? (
              <Box sx={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid', borderColor: 'primary.main', borderTopColor: 'transparent', animation: 'spin 1s linear infinite', mx: 1 }} />
            ) : userData ? (
              <>
                {/* User Menu Trigger */}
                <Box 
                  onClick={handleOpenMenu}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    cursor: 'pointer',
                    p: '4px 8px',
                    borderRadius: 10,
                    border: 1,
                    borderColor: 'divider',
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      bgcolor: 'primary.light', 
                      fontSize: '0.875rem', 
                      fontWeight: 'bold',
                      color: 'primary.contrastText'
                    }}
                  >
                    {userData.name?.[0].toUpperCase()}
                  </Avatar>
                  <ChevronDown size={16} />
                </Box>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseMenu}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  slotProps={{
                    paper: {
                      sx: {
                        mt: 1.5,
                        borderRadius: 3,
                        minWidth: 200,
                        boxShadow: theme.shadows[3],
                        border: 1,
                        borderColor: 'divider'
                      }
                    }
                  }}
                >
                  {hasRestaurant ? (
                    <MenuItem 
                      onClick={handleCloseMenu} 
                      component={Link} 
                      href="/dashboard"
                      sx={{ color: 'success.main', fontWeight: 'bold' }}
                    >
                      <ListItemIcon><Store size={18} color={theme.palette.success.main} /></ListItemIcon>
                      لوحة التحكم
                    </MenuItem>
                  ) : (
                    <MenuItem 
                      onClick={handleCloseMenu} 
                      component={Link} 
                      href="/register-restaurant"
                      sx={{ color: 'primary.main', fontWeight: 'bold' }}
                    >
                      <ListItemIcon><Store size={18} color={theme.palette.primary.main} /></ListItemIcon>
                      سجل مطعمك
                    </MenuItem>
                  )}

                  <Divider sx={{ my: 1 }} />

                  <MenuItem onClick={handleCloseMenu} component={Link} href="/order">
                    <ListItemIcon><ShoppingBag size={18} /></ListItemIcon>
                    طلباتي
                  </MenuItem>

                  <MenuItem onClick={handleCloseMenu} component={Link} href="/profile">
                    <ListItemIcon><User size={18} /></ListItemIcon>
                    الملف الشخصي
                  </MenuItem>

                  <Divider sx={{ my: 1 }} />

                  <MenuItem 
                    onClick={() => { logout(); handleCloseMenu(); }}
                    sx={{ color: 'error.main' }}
                  >
                    <ListItemIcon><LogOut size={18} color={theme.palette.error.main} /></ListItemIcon>
                    تسجيل الخروج
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box 
                component={Link} 
                href="/login"
                sx={{ 
                  bgcolor: 'text.primary', 
                  color: 'background.paper', 
                  px: 2, 
                  py: 1, 
                  borderRadius: 2, 
                  fontSize: '0.875rem', 
                  fontWeight: 'bold', 
                  textDecoration: 'none',
                  '&:hover': { opacity: 0.9 }
                }}
              >
                تسجيل الدخول
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};