"use client";

import { useState } from "react";
import {
  Container, TextField, Button, Grid, Card, CardContent,
  Typography, Stack, Box, CircularProgress, Chip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";

import { useRestaurants } from "../api/useRestaurants";
import MutationButton from "../../mutations-restaurant/ui/MutationButton";
import { useDeleteRestaurant } from "../../delete-restaurant/api/useDeleteRestaurant";
import { useMe } from "@/features/user/api/use-me";
import { RestaurantDetails } from "./RestaurantDetails";

export default function RestaurantSearch() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("");

  // حالة واحدة للتحكم في المطعم المختار وإغلاق/فتح المودال
  const [selectedRes, setSelectedRes] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const { data: user } = useMe();
  const { data, isLoading, error } = useRestaurants(city);
  const deleteMutation = useDeleteRestaurant();

  const handleSearch = () => setCity(cityInput.trim());

  const handleOpenDetails = (restaurant: any) => {
    setSelectedRes(restaurant);
    setDetailsOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // منع فتح التفاصيل عند الضغط على حذف
    if (window.confirm("هل أنت متأكد من حذف هذا المطعم؟")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">بحث عن المطاعم</Typography>
        {user && <MutationButton mode="add" />}
      </Box>

      {/* Search Input */}
      <Box display="flex" gap={2} mb={5}>
        <TextField
          fullWidth
          placeholder="أدخل اسم المدينة (مثلاً: Ramallah)"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          InputProps={{
            startAdornment: <LocationOnIcon color="action" sx={{ mr: 1 }} />,
          }}
        />
        <Button variant="contained" startIcon={<SearchIcon />} onClick={handleSearch} sx={{ px: 4 }}>
          بحث
        </Button>
      </Box>

      {/* Loading & Error States */}
      {isLoading && (
        <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box>
      )}

      {/* Grid List */}
      <Grid container spacing={3}>
        {data?.map((r: any) => (
          <Grid item xs={12} sm={6} md={4} key={r.id}>
            <Card
              variant="outlined"
              onClick={() => handleOpenDetails(r)}
              sx={{
                height: "100%", borderRadius: 3, cursor: "pointer",
                transition: "0.3s", "&:hover": { boxShadow: 6, borderColor: "primary.main" }
              }}
            >
              <CardContent>
                <Box mb={2}>
                  <Typography variant="h6" fontWeight="bold">{r.name}</Typography>
                  <Chip label={r.category || "مطعم"} size="small" color="secondary" sx={{ mt: 1 }} />
                </Box>

                <Stack direction="row" spacing={1} mt="auto">
                  {user && <MutationButton mode="edit" restaurant={r} />}
                  {user && (
                    <Button
                      variant="outlined" color="error" fullWidth
                      startIcon={<DeleteIcon />}
                      onClick={(e) => handleDelete(r.id, e)}
                    >حذف</Button>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* مكون التفاصيل الذي يحتوي بداخله على المنيو */}
      {selectedRes && (
        <RestaurantDetails
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          restaurant={selectedRes}
        />
      )}
    </Container>
  );
}