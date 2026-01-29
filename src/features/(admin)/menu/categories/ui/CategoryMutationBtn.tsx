"use client";
import { useState } from "react";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CategoryDialog from "./CategoryDialog";

interface Props {
  mode?: "add" | "edit";
  restaurantId: string;
  category?: any;
}

export const CategoryMutationButton = ({ mode = "add", restaurantId, category }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {mode === "edit" ? (
        <IconButton size="small" onClick={() => setOpen(true)} sx={{ color: "primary.main" }}>
          <EditIcon fontSize="small" />
        </IconButton>
      ) : (
        <Button 
          variant="outlined" 
          size="small" 
          startIcon={<AddIcon />} 
          onClick={() => setOpen(true)}
          sx={{ borderRadius: "8px", fontWeight: 700 }}
        >
          New Category
        </Button>
      )}

      {/* Pass props to dialog to know what to do */}
      <CategoryDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        mode={mode} 
        restaurantId={restaurantId} 
        category={category} 
      />
    </>
  );
};