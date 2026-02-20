"use client";
import React from "react";
import { IconButton, Tooltip, alpha, useTheme } from "@mui/material";
import { Trash2 } from "lucide-react"; 
import { useCategories } from "../api/useCategories";

interface DeleteCategoryBtnProps {
  restaurantId?: string;
  categoryId: string;
}

function DeleteCategoryBtn({ restaurantId, categoryId }: DeleteCategoryBtnProps) {
  const theme = useTheme();
  const { useDeleteCategory } = useCategories(restaurantId);
  const deleteCategory = useDeleteCategory();

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory.mutate(id);
    }
  };

  return (
    <Tooltip title="Delete Category" arrow>
      <IconButton
        size="small"
        onClick={(e) => handleDelete(categoryId, e)}
        sx={{
          width: 28,
          height: 28,
          borderRadius: "6px", 
          color: "text.disabled",
          transition: "all 0.2s ease",
          "&:hover": {
            color: "error.main",
            bgcolor: alpha(theme.palette.error.main, 0.08),
            transform: "scale(1.05)",
          },
        }}
      >
        <Trash2 size={14} strokeWidth={2} />
      </IconButton>
    </Tooltip>
  );
}

export default DeleteCategoryBtn;