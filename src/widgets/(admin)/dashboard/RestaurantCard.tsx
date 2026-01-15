"use client";

import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

export default function RestaurantCard({ restaurant, onEdit, onDelete }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{restaurant.name}</Typography>
        <Typography variant="body2" color="text.secondary">{restaurant.city}</Typography>
        <Typography variant="body2">{restaurant.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onEdit}>تعديل</Button>
        <Button size="small" color="error" onClick={onDelete}>حذف</Button>
      </CardActions>
    </Card>
  );
}
