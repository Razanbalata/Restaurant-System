import { Card, CardContent, Typography, Box, Switch } from "@mui/material";
import { Bell } from "lucide-react";

export function NotificationsSection({ data, onChange }: any) {
  const items = [
    { id: "emailNotifications", label: "Email Notifications", desc: "Receive order updates via email" },
    { id: "smsNotifications", label: "SMS Notifications", desc: "Receive order updates via SMS" },
    { id: "orderAlerts", label: "Order Alerts", desc: "Get alerted for new orders" },
  ];

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, border: '1px solid #e2e8f0' }}>
      <Box sx={{ p: 3, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Bell size={20} color="#16a34a" />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>Notifications</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">Configure how you receive notifications</Typography>
      </Box>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {items.map((item) => (
          <Box key={item.id} sx={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            p: 1.5, borderRadius: 2, border: '1px solid #f8fafc' 
          }}>
            <Box>
              <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>{item.label}</Typography>
              <Typography variant="caption" color="text.secondary">{item.desc}</Typography>
            </Box>
            <Switch 
              checked={data[item.id]} 
              onChange={(e) => onChange({ [item.id]: e.target.checked })} 
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}