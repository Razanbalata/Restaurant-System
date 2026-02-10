import { Box, Typography, Stack } from "@mui/material";
import { OrderCard } from "./OrderCardd";

export const OrderItemsList = ({ items }: { items: any[] }) => {
  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: "#374151" }}>
        Order Items
      </Typography>
      <Stack spacing={1.5}>
        {items.map((item) => (
          <OrderCard key={item.id} order={item}/>
        ))}
      </Stack>
    </Box>
  );
};