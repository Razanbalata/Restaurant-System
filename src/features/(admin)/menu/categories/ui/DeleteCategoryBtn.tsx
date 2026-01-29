import { Button } from "@mui/material";
import React from "react";
import { useCategories } from "../api/useCategories";
import { DeleteIcon } from "lucide-react";

interface DeleteCategoryBtnProps {
  restaurantId: string; // or number depending on your database
  categoryId: string;
}

function DeleteCategoryBtn({restaurantId,categoryId}: DeleteCategoryBtnProps) {

 const {useDeleteCategory}= useCategories(restaurantId)
 const deleteCategory = useDeleteCategory()

  function handleDelete (id: string, e: React.MouseEvent) {
    e.stopPropagation()
   if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory.mutate(id);
     }
  }

  return (
    <Button
      variant="outlined"
      color="error"
      fullWidth
      startIcon={<DeleteIcon />}
      onClick={(e) => handleDelete(categoryId, e)}
    >
      Delete
    </Button>
  );
}

export default DeleteCategoryBtn;
