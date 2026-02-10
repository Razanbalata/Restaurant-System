import { Card, CardContent, Typography, Box, TextField, InputAdornment, Grid } from "@mui/material";
import { Store, Phone, Mail, MapPin } from "lucide-react";

export function InfoSection({ data, onChange }: any) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, border: '1px solid #e2e8f0' }}>
      <Box sx={{ p: 3, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Store size={20} color="#16a34a" /> {/* يمكنك تغيير اللون حسب ثيمك */}
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>Restaurant Information</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">Basic information about your restaurant</Typography>
      </Box>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Box>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Restaurant Name</Typography>
          <TextField 
            fullWidth size="small" 
            value={data.name} 
            onChange={(e) => onChange({ name: e.target.value })} 
          />
        </Box>
        <Box>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Description</Typography>
          <TextField 
            fullWidth multiline rows={3} 
            value={data.description} 
            onChange={(e) => onChange({ description: e.target.value })} 
          />
        </Box>
        <Grid container spacing={2}>
          <Grid size={{xs:6}}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Phone</Typography>
            <TextField 
              fullWidth size="small" 
              value={data.phone}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Phone size={16} /></InputAdornment>,
              }}
              onChange={(e) => onChange({ phone: e.target.value })} 
            />
          </Grid>
          <Grid size={{xs:6}}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Email</Typography>
            <TextField 
              fullWidth size="small" 
              value={data.email}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Mail size={16} /></InputAdornment>,
              }}
              onChange={(e) => onChange({ email: e.target.value })} 
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}