// info-section.tsx
import { Card, CardContent, Typography, Box, TextField, InputAdornment, Grid } from "@mui/material";
import { Store, Globe, MapPin } from "lucide-react";

export function InfoSection({ data, onChange }: any) {
  const handleChange = (field: string, value: any) => {
    onChange({ restaurantInfo: { ...data, [field]: value } });
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, border: '1px solid #e2e8f0' }}>
      <Box sx={{ p: 3, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Store size={20} color="#16a34a" />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>Restaurant Information</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">Basic information about your restaurant</Typography>
      </Box>

      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* Name */}
        <Box>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Restaurant Name</Typography>
          <TextField 
            fullWidth 
            size="small" 
            value={data.name || ''} 
            onChange={(e) => handleChange('name', e.target.value)} 
          />
        </Box>

        {/* Description */}
        <Box>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Description</Typography>
          <TextField 
            fullWidth 
            multiline 
            rows={3} 
            value={data.description || ''} 
            onChange={(e) => handleChange('description', e.target.value)} 
          />
        </Box>

        {/* Location Info */}
        <Grid container spacing={2}>
          <Grid size={{xs:12,sm:6}}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Country</Typography>
            <TextField 
              fullWidth 
              size="small" 
              placeholder="e.g. Jordan"
              value={data.country || ''} 
              InputProps={{ startAdornment: <InputAdornment position="start"><Globe size={16} /></InputAdornment> }}
              onChange={(e) => handleChange('country', e.target.value)} 
            />
          </Grid>
          <Grid size={{xs:12,sm:6}}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>City</Typography>
            <TextField 
              fullWidth 
              size="small" 
              placeholder="e.g. Amman"
              value={data.city || ''} 
              InputProps={{ startAdornment: <InputAdornment position="start"><MapPin size={16} /></InputAdornment> }}
              onChange={(e) => handleChange('city', e.target.value)} 
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
