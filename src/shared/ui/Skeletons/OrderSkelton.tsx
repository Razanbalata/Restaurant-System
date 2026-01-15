import { Container, Skeleton, Typography } from '@mui/material';
import React from 'react';

function OrderSkelton() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight="900" mb={3} textAlign="right">جاري تحميل طلباتك...</Typography>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rectangular" height={160} sx={{ borderRadius: 4, mb: 3 }} />
        ))}
      </Container>
  );
}

export default OrderSkelton;
