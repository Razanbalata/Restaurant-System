import { Card, CardContent, Typography, Box, TextField, InputAdornment, Switch, Grid } from "@mui/material";
import { Clock, DollarSign } from "lucide-react";

export function OperationalSection({ data, onChange }: any) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, border: '1px solid #e2e8f0' }}>
      <Box sx={{ p: 3, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Clock size={20} color="#16a34a" />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>Operational Settings</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">Delivery and operational preferences</Typography>
      </Box>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          p: 2, borderRadius: 2, border: '1px solid #f1f5f9' 
        }}>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Restaurant Status</Typography>
            <Typography variant="caption" color="text.secondary">Toggle to open or close your restaurant</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: data.isOpen ? 'success.main' : 'error.main' }}>
              {data.isOpen ? "Open" : "Closed"}
            </Typography>
            <Switch checked={data.isOpen} onChange={(e) => onChange({ isOpen: e.target.checked })} />
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid size={{xs:6}}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Delivery Fee</Typography>
            <TextField 
              fullWidth size="small" type="number"
              value={data.deliveryFee}
              InputProps={{
                startAdornment: <InputAdornment position="start"><DollarSign size={16} /></InputAdornment>,
              }}
              onChange={(e) => onChange({ deliveryFee: e.target.value })} 
            />
          </Grid>
          <Grid size={{xs:6}}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Minimum Order</Typography>
            <TextField 
              fullWidth size="small" type="number"
              value={data.minOrder}
              InputProps={{
                startAdornment: <InputAdornment position="start"><DollarSign size={16} /></InputAdornment>,
              }}
              onChange={(e) => onChange({ minOrder: e.target.value })} 
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}