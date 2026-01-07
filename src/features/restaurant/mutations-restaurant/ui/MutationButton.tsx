"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RestaurantModal from "../../mutations-restaurant/ui/RestaurantFormModal";

type Props = {
  mode: "add" | "edit";
  restaurant?: any;
};

export default function MutationButton({ mode, restaurant }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        color={mode === "add" ? "primary" : "warning"} 
        sx={{ mb: 2 }} 
        onClick={handleOpen}
        startIcon={mode === "add" ? <AddIcon /> : <EditIcon />}
      >
        {mode === "add" ? "Add Restaurant" : "Edit"}
      </Button>

      <RestaurantModal
        open={open}
        mode={mode}
        restaurant={restaurant}
        onClose={handleClose}
      />
    </>
  );
}