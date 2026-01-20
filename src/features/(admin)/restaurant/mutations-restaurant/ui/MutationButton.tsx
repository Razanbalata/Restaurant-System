"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RestaurantForm from "@/widgets/(admin)/restaurants/RestaurantForm";

type Props = {
  mode: "add" | "edit";
  restaurant?: any;
};

export default function MutationButton({ mode, restaurant }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button
        variant="contained"
        color={mode === "add" ? "primary" : "warning"} 
        onClick={handleOpen}
        startIcon={mode === "add" ? <AddIcon /> : <EditIcon />}
      >
        {mode === "add" ? "Add Restaurant" : "Edit"}
      </Button>

       {open && <RestaurantForm restaurant={restaurant} onClose={handleClose}/>}

    </Box>
  );
}