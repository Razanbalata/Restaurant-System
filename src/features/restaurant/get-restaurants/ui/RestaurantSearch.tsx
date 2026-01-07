"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  CircularProgress,
  Chip,
  IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useRestaurants } from "../api/useRestaurants";
import MutationButton from "../../mutations-restaurant/ui/MutationButton";
import { useDeleteRestaurant } from "../../delete-restaurant/api/useDeleteRestaurant";
import { useUpdateRestaurant } from "../../mutations-restaurant/api/useUpdateRestaurant";
import { useMe } from "@/features/user/api/use-me";

export default function RestaurantSearch() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("");
  const { data: user, isLoading: isUserLoading } = useMe();
  const { data, isLoading, error } = useRestaurants(city);
  const deleteMutation = useDeleteRestaurant();
  const handleSearch = () => setCity(cityInput.trim());

  // const handleEdit = (id: string) => {
  //   // هنا يمكنك فتح مودال التعديل وتمرير بيانات المطعم
  //   editMutation.mutate({ id, updates: {  } });
  // };

  const handleDelete = (id: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المطعم؟")) {
     deleteMutation.mutate(id);
  }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" component="h1">
          بحث عن المطاعم
        </Typography>
       { user && <MutationButton mode="add" />}
      </Box>

      {/* Search Section */}
      <Box display="flex" gap={2} mb={5}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="أدخل اسم المدينة (مثلاً: Ramallah)"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          InputProps={{
            startAdornment: <LocationOnIcon color="action" sx={{ mr: 1 }} />,
          }}
        />
        <Button
          variant="contained"
          size="large"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          sx={{ px: 4, whiteSpace: "nowrap" }}
        >
          بحث
        </Button>
      </Box>

      {/* Loading State */}
      {isLoading && (
        <Box display="flex" flexDirection="column" alignItems="center" py={8}>
          <CircularProgress size={40} />
          <Typography color="textSecondary" mt={2}>
            جاري جلب البيانات...
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Typography color="error" textAlign="center" mt={4}>
          حصل خطأ أثناء جلب البيانات، يرجى المحاولة لاحقاً.
        </Typography>
      )}

      {/* Empty State */}
      {!isLoading && data?.length === 0 && city && (
        <Typography color="textSecondary" textAlign="center" py={8}>
          لم يتم العثور على مطاعم في {city}.
        </Typography>
      )}

      {/* Restaurants Grid */}
      <Grid container spacing={3}>
        {data?.map((r: any) => (
          <Grid item xs={12} sm={6} md={4} key={r.id}>
            <Card variant="outlined" sx={{ height: "100%", borderRadius: 2 }}>
              <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box mb={2}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {r.name}
                  </Typography>
                  <Chip 
                    label={`${r.city}, ${r.country}`} 
                    size="small" 
                    color="primary" 
                    variant="soft" // ملاحظة: variant="soft" يحتاج إعدادات خاصة في MUI أو استخدم "outlined"
                  />
                </Box>

                <Stack direction="row" spacing={1} mt={2}>
                  
                   {user && <MutationButton mode="edit" restaurant={r} />}
                  
                  { user && <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(r.id)}
                  >
                    حذف
                  </Button>}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}