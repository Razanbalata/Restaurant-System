"use client";
import Link from "next/link";
import { User, Store, LogOut, ShoppingBag, Sun, Moon, ClipboardList } from "lucide-react";
import { useMe } from "@/features/user/api/use-me";
import { useLogout } from "@/features/user/api/use-logout";
import { useCart } from "@/features/(customer)/cart/api/useCart"; 
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
  Avatar,
  alpha
} from "@mui/material";
import { useState } from "react";
import { useColorMode } from "@/app/providers/ThemeProvider";

export const Header = () => {
  const { data: userData } = useMe();
  const { mutate: logout } = useLogout();
  const { items:cart } = useCart();
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const isDark = theme.palette.mode === "dark";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const hasRestaurant = !!userData?.restaurant;

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        bgcolor: alpha(theme.palette.background.paper, 0.8), // Slight transparency behind Header
        backdropFilter: 'blur(8px)', // Glassmorphism effect
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
            
            {/* Dark Mode Toggle */}
            <IconButton onClick={toggleColorMode} sx={{ color: 'text.secondary' }}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>

            {userData ? (
              <>
                {/* Cart Icon */}
                <IconButton 
                  component={Link} 
                  href="/cart" 
                  sx={{ color: 'text.secondary' }}
                >
                  <Badge badgeContent={cart.length} color="primary">
                    <ShoppingBag size={22} />
                  </Badge>
                </IconButton>

                {/* Profile Area */}
                <Box 
                  onClick={handleOpenMenu}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    cursor: 'pointer',
                    p: 0.5,
                    borderRadius: 50,
                    transition: '0.2s',
                    '&:hover': { bgcolor: alpha(theme.palette.action.hover, 0.1) }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 35, 
                      height: 35, 
                      bgcolor: 'primary.main',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {userData.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </Box>

                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseMenu}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      mt: 1.5,
                      minWidth: 200,
                      borderRadius: 3,
                      border: `1px solid ${theme.palette.divider}`,
                      boxShadow: `0 10px 25px ${alpha(theme.palette.common.black, 0.1)}`,
                    },
                  }}
                >
                  <MenuItem onClick={handleCloseMenu} component={Link} href="/profile">
                    <ListItemIcon><User size={18} /></ListItemIcon>
                    My Profile
                  </MenuItem>

                  <MenuItem onClick={handleCloseMenu} component={Link} href="/orders">
                    <ListItemIcon><ClipboardList size={18} /></ListItemIcon>
                    My Orders
                  </MenuItem>

                  {hasRestaurant && (
                    <MenuItem onClick={handleCloseMenu} component={Link} href="/dashboard">
                      <ListItemIcon><Store size={18} /></ListItemIcon>
                      Dashboard
                    </MenuItem>
                  )}

                  <Divider sx={{ my: 1 }} />
                  
                  <MenuItem onClick={() => { logout(); handleCloseMenu(); }} sx={{ color: 'error.main' }}>
                    <ListItemIcon><LogOut size={18} color={theme.palette.error.main} /></ListItemIcon>
                      Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              /* Guest Mode - Login Button */
              <Box 
                component={Link} 
                href="/login"
                sx={{ 
                  bgcolor: 'primary.main', // Use primary color instead of fixed black
                  color: 'primary.contrastText', 
                  px: 2.5, 
                  py: 1, 
                  borderRadius: 2, 
                  fontSize: '0.875rem', 
                  fontWeight: 800, 
                  textDecoration: 'none',
                  transition: '0.3s',
                  '&:hover': { 
                    bgcolor: 'primary.dark',
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                  }
                }}
              >
                Login
              </Box>
            )}
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};