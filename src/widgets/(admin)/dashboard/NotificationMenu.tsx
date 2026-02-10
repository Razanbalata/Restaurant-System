"use client";
import React, { useState } from "react";
import { 
  Badge, Menu, MenuItem, IconButton, Typography, 
  Box, Divider, List, ListItemText 
} from "@mui/material";
import { Bell, ShoppingBasket, Edit, Trash2, CheckCircle2 } from "lucide-react";
import { useNotificationStore } from "@/shared/notifications/useNotificationStore";
import { useRouter } from "next/navigation";

export const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { count, notifications, clearNotifications } = useNotificationStore();
  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const getIcon = (type: string) => {
    if (type === "INSERT") return <ShoppingBasket size={18} className="text-green-500" />;
    if (type === "UPDATE") return <Edit size={18} className="text-blue-500" />;
    return <Trash2 size={18} className="text-red-500" />;
  };

  return (
    <>
      <IconButton 
        onClick={handleOpen}
        className="hover:bg-primary/10 transition-colors duration-200"
      >
        <Badge badgeContent={count} color="primary" sx={{ "& .MuiBadge-badge": { fontSize: 10, height: 16, minWidth: 16 } }}>
          <Bell size={20} className="text-muted-foreground" />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          className: "mt-2 w-80 rounded-xl border border-border shadow-xl bg-card"
        }}
      >
        <Box className="flex items-center justify-between p-4 bg-muted/20">
          <Typography className="font-bold text-sm">Notifications</Typography>
          {notifications.length > 0 && (
            <Typography 
              onClick={clearNotifications}
              className="text-xs text-primary cursor-pointer hover:underline font-semibold"
            >
              Clear all
            </Typography>
          )}
        </Box>
        <Divider />
        <List className="p-0 max-h-[400px] overflow-auto">
          {notifications.length === 0 ? (
            <Box className="p-8 text-center flex flex-col items-center gap-2">
              <CheckCircle2 size={32} className="text-muted-foreground/40" />
              <Typography className="text-sm text-muted-foreground">All caught up!</Typography>
            </Box>
          ) : (
            notifications.map((notif) => (
              <MenuItem 
                key={notif.id} 
                onClick={() => { handleClose(); router.push(`/owner/orders/${notif.order_id}`); }}
                className="p-4 border-b border-border/50 hover:bg-muted/30 whitespace-normal items-start gap-3"
              >
                <Box className="mt-1 p-2 rounded-lg bg-muted flex-shrink-0">
                  {getIcon(notif.type)}
                </Box>
                <Box className="flex-1 overflow-hidden">
                  <Typography className="text-sm font-semibold truncate">
                    {notif.type === "INSERT" ? "New Order" : "Status Update"}
                  </Typography>
                  <Typography className="text-xs text-muted-foreground line-clamp-1">
                    Order #{notif.order_id.slice(-6)}: {notif.status}
                  </Typography>
                  <Typography className="text-[10px] text-primary/60 mt-1 font-medium italic">
                    {notif.time}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          )}
        </List>
      </Menu>
    </>
  );
};