import { Button } from "@mui/material";
import { DeleteIcon } from "lucide-react";
import React from "react";
import { useRestaurants } from "../../get-restaurants/api/useRestaurants";

interface Restaurant {
  id: string;
  name?: string;
}

interface DeleteRestaurantBtnProps {
  r: Restaurant;
}

function DeleteRestaurantBtn({r}:DeleteRestaurantBtnProps) {

 const {useDeleteRestaurant} = useRestaurants()

 const deleteMutation = useDeleteRestaurant()

 function handleDelete(id: string, e: React.MouseEvent){
      e.stopPropagation(); // Prevent opening details when clicking delete
     if (window.confirm("Are you sure you want to delete this restaurant?")) {
      deleteMutation.mutate(id);
     }
 }

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        fullWidth
        startIcon={<DeleteIcon />}
        onClick={(e) => handleDelete(r.id, e)}
      >
        Delete
      </Button>
    </>
  );
}

export default DeleteRestaurantBtn;
