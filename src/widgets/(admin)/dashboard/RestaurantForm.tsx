"use client";

import { Box, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function RestaurantForm({ restaurant, onClose, onSave }) {
  const [name, setName] = useState(restaurant?.name || "");
  const [city, setCity] = useState(restaurant?.city || "");
  const [country,setCountry] = useState(restaurant?.country || "")
  const [description, setDescription] = useState(restaurant?.description || "");

  return (
    <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", bgcolor: "rgba(0,0,0,0.3)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
      <Box sx={{ bgcolor: "background.paper", p: 3, borderRadius: 2, width: 400 }}>
        <Stack spacing={2}>
          <TextField label="اسم المطعم" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="المدينة" value={city} onChange={(e) => setCity(e.target.value)} fullWidth />
            <TextField label="البلد" value={country} onChange={(e) => setCountry(e.target.value)} fullWidth />
          <TextField label="الوصف" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={3} />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={onClose}>إلغاء</Button>
            <Button variant="contained" onClick={() => onSave({ name, city,country, description })}>
              {restaurant ? "تحديث" : "حفظ"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
