"use client";
import { Stack, TextField, Typography, InputAdornment } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { DeliveryDining } from "@mui/icons-material";

export function DeliveryForm({ formData, setFormData }: any) {
  return (
    <Stack spacing={3}>
      <Typography variant="h6" fontWeight="900" sx={{ mb: 1 }}>
        Delivery Details <DeliveryDining/>
      </Typography>
      
      <TextField
        label="Delivery Address"
        fullWidth
        required
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        InputProps={{
          startAdornment: <InputAdornment position="start"><LocationOnOutlinedIcon color="primary" /></InputAdornment>,
        }}
        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
      />

      <TextField
        label="Phone Number"
        fullWidth
        required
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        InputProps={{
          startAdornment: <InputAdornment position="start"><PhoneOutlinedIcon color="primary" /></InputAdornment>,
        }}
        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
      />

      <TextField
        label="Notes for the driver"
        fullWidth
        multiline
        rows={3}
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        InputProps={{
          startAdornment: <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}><ChatBubbleOutlineIcon color="primary" /></InputAdornment>,
        }}
        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
      />
    </Stack>
  );
}