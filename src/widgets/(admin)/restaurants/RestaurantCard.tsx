import {
  Paper,
  Stack,
  Typography,
  Rating,
  Divider,
  Chip,
  Box,
  CardActions,
  Avatar,
  Button,
} from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";

import MutationButton from "@/features/(admin)/restaurant/mutations-restaurant/ui/MutationButton";
import DeleteRestaurantBtn from "@/features/(admin)/restaurant/delete-restaurant/ui/DeleteRestaurantBtn";
import { useRouter } from "next/navigation";

export const RestaurantInfoCard = ({ restaurant, isOwner }) => {
  const router = useRouter();

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      {/* ===== Banner ===== */}
      <Box
        sx={{
          height: 260,
          borderRadius: "32px",
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.15),
              rgba(0,0,0,0.65)
            ),
            url("/restaurant-cover.jpg")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      />

      {/* ===== Card ===== */}
      <Paper
        elevation={0}
        sx={{
          mt: "-120px",
          mx: { xs: 2, md: 4 },
          p: { xs: 3, md: 5 },
          borderRadius: "32px",
          boxShadow: "0 30px 60px rgba(0,0,0,0.08)",
          position: "relative",
        }}
      >
        {/* Owner Actions */}
        {isOwner && (
          <CardActions sx={{ position: "absolute", top: 24, right: 24, gap: 1 }}>
            <MutationButton mode="edit" restaurant={restaurant} />
            <DeleteRestaurantBtn r={restaurant} />
          </CardActions>
        )}
        {/* CTA Menu */}
            {!isOwner &&<Button
              size="large"
              variant="contained"
              startIcon={<RestaurantMenuRoundedIcon />}
              sx={{
                px: 4,
                borderRadius: "14px",
                fontWeight: 800,
                alignSelf: { xs: "stretch", sm: "center" },
              }}
              onClick={() => router.push(`/menu`)}
            >
              View Menu
            </Button>}

        <Stack spacing={4}>
          {/* ===== Header ===== */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <Avatar
              sx={{
                width: 96,
                height: 96,
                fontSize: "2.5rem",
                fontWeight: 900,
                bgcolor: "#111",
                border: "6px solid white",
              }}
            >
              {restaurant.name?.charAt(0)}
            </Avatar>

            <Box flex={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  sx={{ letterSpacing: "-1px" }}
                >
                  {restaurant.name}
                </Typography>
                <VerifiedRoundedIcon color="primary" />
              </Stack>

              <Stack direction="row" spacing={2} mt={1} alignItems="center">
                <Chip label={restaurant.category} size="small" />
                <Rating value={4.8} readOnly size="small" />
                <Typography fontWeight={700}>4.8</Typography>
              </Stack>
            </Box>

            
          </Stack>

          <Divider />

          {/* ===== Info Grid ===== */}
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
            gap={3}
          >
            <InfoItem
              icon={<LocationOnRoundedIcon color="primary" />}
              label="Location"
              value={`${restaurant.city}, ${restaurant.country}`}
            />

            <InfoItem
              icon={<AccessTimeRoundedIcon color="primary" />}
              label="Preparation Time"
              value="30 – 45 minutes"
            />

            <InfoItem
              icon={<Box sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#4CAF50",
                mt: 0.6,
              }} />}
              label="Status"
              value="Open Now"
            />
          </Box>

          {/* ===== Description ===== */}
          <Box
            sx={{
              bgcolor: "#F7F8FA",
              p: 3,
              borderRadius: "20px",
            }}
          >
            <Typography fontWeight={800} gutterBottom>
              About Restaurant
            </Typography>
            <Typography color="text.secondary" lineHeight={1.8}>
              {restaurant.description ||
                "This restaurant offers high quality meals prepared with fresh ingredients and professional standards."}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

/* ===== Small Helper Component ===== */
const InfoItem = ({ icon, label, value }) => (
  <Box>
    <Typography
      variant="caption"
      color="text.secondary"
      fontWeight={700}
      sx={{ textTransform: "uppercase" }}
    >
      {label}
    </Typography>

    <Stack direction="row" spacing={1} mt={1} alignItems="center">
      {icon}
      <Typography fontWeight={600}>{value}</Typography>
    </Stack>
  </Box>
);
