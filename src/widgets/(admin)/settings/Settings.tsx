"use client";
import { useState } from "react";
import { Box, Typography, Button, Grid, CircularProgress, Paper, useTheme, alpha } from "@mui/material";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { InfoSection } from "./info-section";
import { OperationalSection } from "./OperationalSection";
import { NotificationsSection } from "./NotificationsSection";
import { SecuritySection } from "./SecuritySection";
import { useMe } from "@/features/user/api/use-me";
import { useRestaurantById } from "@/features/(admin)/restaurant/get-restaurants/api/useRestaurantById";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { useRestaurants } from "@/features/(admin)/restaurant/get-restaurants/api/useRestaurants";
import { RestaurantMenuOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { SettingsSkeleton } from "@/shared/ui/Skeletons/SettingsSkeleton";

export default function SettingsPage() {
  const { selectedRestaurant } = useRestaurant();
  const theme = useTheme()
  const router = useRouter()
  const { data: user } = useMe();
  const { data: restaurant,isPending:isRestaurantLoading } = useRestaurantById(selectedRestaurant?.id);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    restaurantInfo: {
      name: restaurant?.name,
      description: restaurant?.description,
      city: restaurant?.city,
      country: restaurant?.country,
    },
    isOpen: restaurant?.is_active,
    deliveryFee: 5,
    minOrder: 30,
    emailNotifications: true,
    smsNotifications: true,
    orderAlerts: true,
  });
  const { useUpdateRestaurant } = useRestaurants();
  const updateMutation = useUpdateRestaurant();

  const updateSettings = (fields: any) =>
    setSettings((prev) => ({ ...prev, ...fields }));

  const handleSave = async () => {
    updateMutation.mutate({ id: restaurant.id, updates: settings.restaurantInfo });
  };



  if (isRestaurantLoading) {
    return <SettingsSkeleton />;
  }

  if (!restaurant && user?.role === "restaurant_owner") {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: "24px",
            border: `2px dashed ${theme.palette.divider}`,
            bgcolor: alpha(theme.palette.background.paper, 0.5),
            maxWidth: 600,
            width: '100%'
          }}
        >
          <RestaurantMenuOutlined sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2, opacity: 0.3 }} />
          <Typography variant="h5" fontWeight={700} gutterBottom>
            No Restaurant Yet
          </Typography>
          <Typography color="text.secondary">
            You currently don’t have a restaurant. Add your first restaurant to manage your settings!
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, borderRadius: '12px', px: 4 }}
            onClick={() => router.push("/shared/dashboard")}
          >
            Add Restaurant
          </Button>
        </Paper>
      </Box>
    );
  }


  return (
    <Box sx={{ p: 4, maxWidth: 1100, mx: "auto" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Settings
          </Typography>
          <Typography color="text.secondary">
            Manage your restaurant preferences
          </Typography>
        </Box>
        <Button
          variant="contained"
          disableElevation
          startIcon={
            isSaving ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <Save size={18} />
            )
          }
          onClick={handleSave}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            py: 1,
            fontWeight: 600,
            bgcolor: "#16a34a",
            "&:hover": { bgcolor: "#15803d" },
          }}
        >
          Save Changes
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <InfoSection data={settings.restaurantInfo} onChange={updateSettings} />
       <NotificationsSection data={settings} onChange={updateSettings} />
        
        </Grid>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          
          <OperationalSection data={settings} onChange={updateSettings} />
          <SecuritySection restayrantId={restaurant?.id} />
        </Grid>
      </Grid>
    </Box>
  );
}
