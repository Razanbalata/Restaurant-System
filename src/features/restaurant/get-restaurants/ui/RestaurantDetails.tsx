"use client";

import { useState } from "react";
import { 
  Dialog, DialogContent, Box, Typography, Button, 
  IconButton, Stack, Chip, Divider, Rating 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { MenuDrawer } from "@/features/menu/ui/MenuDrawer";  // المكون الذي جهزناه سابقاً

export const RestaurantDetails = ({ open, onClose, restaurant }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!restaurant) return null;

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        fullWidth 
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4, overflow: "hidden" } }}
      >
        {/* صورة هيدر للمطعم */}
        <Box sx={{ position: "relative", height: 220, bgcolor: "grey.200" }}>
          <Box 
            component="img"
            src={`https://source.unsplash.com/featured/?restaurant,${restaurant.category}`}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <IconButton 
            onClick={onClose}
            sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(255,255,255,0.7)", "&:hover": { bgcolor: "white" } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 4 }}>
          <Stack spacing={2}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h4" fontWeight="900" gutterBottom>
                  {restaurant.name}
                </Typography>
                <Chip label={restaurant.category || "مطعم"} color="primary" variant="outlined" size="small" />
              </Box>
              <Box textAlign="right">
                <Rating value={4.5} readOnly precision={0.5} size="small" />
                <Typography variant="body2" color="text.secondary">(120 تقييم)</Typography>
              </Box>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">{restaurant.city}, {restaurant.country}</Typography>
            </Stack>

            <Typography variant="body1" color="text.secondary" sx={{ py: 1 }}>
              هذا المطعم يقدم أشهى المأكولات في {restaurant.city}. يتميز بجودة المكونات والخدمة السريعة. يمكنك الآن تصفح القائمة الكاملة وتوليدها عبر الذكاء الاصطناعي.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* الزر الرئيسي لفتح المنيو */}
            <Button 
              variant="contained" 
              size="large" 
              fullWidth
              startIcon={<RestaurantMenuIcon />}
              onClick={() => setIsMenuOpen(true)}
              sx={{ 
                py: 2, 
                borderRadius: 3, 
                fontSize: "1.1rem",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                textTransform: "none"
              }}
            >
              عرض المنيو (قائمة الطعام)
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* استدعاء المنيو ليكون "فوق" صفحة التفاصيل */}
      <MenuDrawer 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        restaurant={restaurant} 
      />
    </>
  );
};