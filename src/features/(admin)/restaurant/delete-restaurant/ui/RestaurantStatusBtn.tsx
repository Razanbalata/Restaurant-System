"use client";
import { alpha, Button, CircularProgress } from "@mui/material";
import { Archive, Play } from "lucide-react";  
import React from "react";
import { useRestaurants } from "../../get-restaurants/api/useRestaurants";

interface RestaurantStatusBtnProps {
  r: { id: string; name?: string; is_active: boolean };
}

export function RestaurantStatusBtn({ r }: RestaurantStatusBtnProps) {
  const { useDeleteRestaurant } = useRestaurants();
  const statusMutation = useDeleteRestaurant();

  function handleToggle(e: React.MouseEvent) {
    e.stopPropagation();
    
    const message = r.is_active 
      ? `Are you sure you want to archive "${r.name}"?` 
      : `Do you want to activate "${r.name}"?`;

    if (window.confirm(message)) {
      statusMutation.mutate({ id: r.id, hard: false });
    }
  }

  return (
    <Button
      variant="outlined"
      color={r.is_active ? "warning" : "success"}
      fullWidth
      disabled={statusMutation.isPending}
      startIcon={statusMutation.isPending ? <CircularProgress size={16} color="inherit" /> : (r.is_active ? <Archive size={18} /> : <Play size={18} />)}
      onClick={handleToggle}
      sx={{
        borderRadius: "10px",
        textTransform: "none",
        fontWeight: 600,
        bgcolor: (theme) => r.is_active ? 'transparent' : alpha(theme.palette.success.main, 0.05),
      }}
    >
      {statusMutation.isPending 
        ? "Processing..." 
        : (r.is_active ? "Archive Restaurant" : "Activate Restaurant")
      }
    </Button>
  );
}