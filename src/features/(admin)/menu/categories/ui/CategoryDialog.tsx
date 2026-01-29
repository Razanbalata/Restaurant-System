"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useCategories } from "../api/useCategories";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  restaurantId: string;
  category?: any;
}

function CategoryDialog({ open, onClose, mode, restaurantId, category }: DialogProps) {
  const [name, setName] = useState("");

  const { useAddCategory, useUpdateCategory } = useCategories(restaurantId);
  const addMutation = useAddCategory();
  const updateMutation = useUpdateCategory();

  const isLoading = addMutation.isPending || updateMutation.isPending;

  // Initialize data when dialog opens
  useEffect(() => {
    if (open) {
      setName(mode === "edit" ? category?.name || "" : "");
    }
  }, [open, mode, category]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    if (mode === "edit") {
      updateMutation.mutate(
        { id: category.id, updates: { name } },
        { onSuccess: onClose } // Close dialog on success
      );
    } else {
      addMutation.mutate(
        { name },
        { onSuccess: onClose }
      );
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={() => !isLoading && onClose()} 
      fullWidth 
      maxWidth="xs"
      PaperProps={{ sx: { borderRadius: "16px" } }}
    >
      <DialogTitle fontWeight={800}>
        {mode === "edit" ? "Edit Category" : "Add New Category"}
      </DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          label="Category Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          sx={{ mt: 2, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading || !name.trim()}
          sx={{ borderRadius: "10px", bgcolor: "#000", minWidth: 80 }}
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CategoryDialog;