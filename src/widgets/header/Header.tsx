"use client";
import Link from "next/link";
import { User, Store, LogOut, ShoppingBag, ChevronDown, Sun, Moon } from "lucide-react";
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
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};