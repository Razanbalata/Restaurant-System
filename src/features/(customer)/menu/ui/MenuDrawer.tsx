"use client";

import { useMenu } from "../get-menu/useMenu";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Stack,
  Avatar,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDeleteMenuItem } from "../../../(admin)/menu/mutation-hooks/useDeleteMenu";
import { useMe } from "@/features/user/api/use-me";
import { MenuItemMutationButton } from "./MenuItemMutationButton";
import { useAddToCart } from "@/features/cart/api/useAddToCart";

export const MenuDrawer = ({ isOpen, onClose, restaurant }) => {
  const restaurantId = restaurant?.id;
  console.log("restaurantId",restaurant)

  const { data: menuItems = [], isLoading } = useMenu(restaurantId);
  console.log("menuItems",menuItems)
  const deleteItem = useDeleteMenuItem(restaurantId);
  const { data: user } = useMe();
  const addToCartMutation = useAddToCart();

  // ⭐ تحديد هل المستخدم صاحب المطعم
  const isOwner = user && restaurant?.owner_id === user.id;

  const handleDelete = (itemId: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الوجبة؟")) {
      deleteItem.mutate(itemId.toString());
    }
  };

  const handleAddToCart = (item) => {
    if (!user?.id) {
    alert("يرجى تسجيل الدخول");
    return;
  }
  
  // نرسل الـ id والـ menuItemId معاً هنا
  addToCartMutation.mutate({ 
    menuItemId: item.id, 
  });
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: 420 } },
      }}
      slotProps={{
        backdrop: { sx: { backdropFilter: "blur(4px)" } },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        <Typography fontWeight="bold">
          {restaurant?.name || "قائمة الطعام"}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Body */}
      <Box sx={{ p: 2, flex: 1, overflowY: "auto" }}>
        {/* زر إضافة وجبة (للمالك فقط) */}
        {isOwner && (
          <Box sx={{ mb: 2 }}>
            <MenuItemMutationButton
              mode="create"
              restaurantId={restaurantId}
            />
          </Box>
        )}

        {isLoading ? (
          <Stack alignItems="center" mt={8} spacing={2}>
            <CircularProgress />
            <Typography color="text.secondary">
              جاري تحميل المنيو...
            </Typography>
          </Stack>
        ) : menuItems.length > 0 ? (
          <List disablePadding>
            {menuItems.map((item) => (
              <Box key={item.id}>
                <ListItem sx={{ py: 2 }}>
                  <Avatar
                    src={item.image_url}
                    variant="rounded"
                    sx={{ width: 56, height: 56, mr: 2 }}
                  >
                    {item.name?.[0]}
                  </Avatar>

                  <ListItemText
                    primary={
                      <Typography fontWeight="bold">
                        {item.name}
                      </Typography>
                    }
                    secondary={item.description}
                    sx={{ mr: 2 }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 1,
                    }}
                  >
                    <Typography fontWeight="bold" color="primary.main">
                      {item.price}₪
                    </Typography>

                    {isOwner ? (
                      <Stack direction="row" spacing={1}>
                        <MenuItemMutationButton
                          mode="edit"
                          restaurantId={restaurantId}
                          item={item}
                        />

                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(item.id)}
                        >
                          حذف
                        </Button>
                      </Stack>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleAddToCart(item)}
                      >
                        أضف للسلة
                      </Button>
                    )}
                  </Box>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        ) : (
          <Box textAlign="center" mt={10}>
            <Typography color="text.secondary">
              لا توجد وجبات حالياً
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};
