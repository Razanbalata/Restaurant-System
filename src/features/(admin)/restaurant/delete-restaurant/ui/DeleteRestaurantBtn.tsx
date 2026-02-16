"use client";
import { Button, CircularProgress } from "@mui/material";
import { Trash2 } from "lucide-react";
import React from "react";
import { useRestaurants } from "../../get-restaurants/api/useRestaurants";
import { useRouter } from "next/navigation";
import { useRestaurant } from "@/app/providers/RestaurantContext";

interface DeleteRestaurantBtnProps {
  r: { id: string; name?: string };
}

function DeleteRestaurantBtn({ r }: DeleteRestaurantBtnProps) {
  const router = useRouter();
  const { useDeleteRestaurant } = useRestaurants();
  const { setSelectedRestaurant } = useRestaurant();
  const deleteMutation = useDeleteRestaurant();

  function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation();

    // رسالة تحذيرية أقوى للحذف النهائي
    if (window.confirm(`PERMANENT DELETE: Are you sure you want to delete "${r.name}"? This cannot be undone!`)) {
      // تمرير الكائن المطلوب للهوك الجديد
      deleteMutation.mutate({ id, hard: true }, {
        onSuccess: () => {
          setSelectedRestaurant(null);
          router.push("/shared/dashboard");
        },
      });
    }
  }

  return (
    <Button
      variant="contained" // جعلناه Contained ليدل على أنه إجراء خطير
      color="error"
      fullWidth
      disabled={deleteMutation.isPending}
      startIcon={deleteMutation.isPending ? <CircularProgress size={16} color="inherit" /> : <Trash2 size={18} />}
      onClick={(e) => handleDelete(r.id, e)}
      sx={{
        borderRadius: "10px",
        textTransform: "none",
        fontWeight: 700,
        boxShadow: "none",
        "&:hover": { bgcolor: "#d32f2f", boxShadow: "none" },
      }}
    >
      {deleteMutation.isPending ? "Deleting..." : "Delete Permanently"}
    </Button>
  );
}

export default DeleteRestaurantBtn;