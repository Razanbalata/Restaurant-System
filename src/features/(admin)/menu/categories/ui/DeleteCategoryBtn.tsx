import { Button } from "@mui/material";
import React from "react";
import { useCategories } from "../api/useCategories";
import { DeleteIcon } from "lucide-react";

function DeleteCategoryBtn({restaurantId,categoryId}) {

 const {useDeleteCategory}= useCategories(restaurantId)
 const deleteCategory = useDeleteCategory()

  function handleDelete (id: string, e: React.MouseEvent) {
    e.stopPropagation()
   if (window.confirm("هل أنت متأكد من حذف هذا المطعم؟")) {
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
      حذف
    </Button>
  );
}

export default DeleteCategoryBtn;
