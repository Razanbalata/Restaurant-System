"use client";

import { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Stack, 
  IconButton, 
  Typography, 
  Box,
  CircularProgress
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useMenuItems } from "../menu_items/api/useMenuItems";
import MealModal from "./MenuDrawer";
import { useTheme } from "next-themes";
import { th } from "zod/v4/locales";

interface Props {
  mode?: "add" | "edit";
  restaurantId: string;
  categoryId?: string;
  item?: any; // Data in case of editing
  useAi?: boolean;
}

export const MenuItemMutationButton = ({ mode = "add",item ,useAi}: Props) => {
  const [open, setOpen] = useState(false);
  const handleClose = ()=>setOpen(false)
  const theme = useTheme();

console.log(theme)
  return (
    <>
      {/* 1. The button that triggers the modal */}
      {mode === "edit" ? (
        <IconButton 
          onClick={() => setOpen(true)} 
          size="small" 
          sx={{ bgcolor: '#f5f5f5', '&:hover': { bgcolor: '#e0e0e0' } }}
        >
          <EditIcon fontSize="small" color="primary" />
        </IconButton>
      ) : (
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setOpen(true)}
          sx={{ 
            bgcolor: theme.theme, 
            borderRadius: "12px", 
            px: 3,
            "&:hover": { bgcolor:theme.theme } 
          }}
        >
          Add Meal
        </Button>
      )}

      {/* 2. The modal popup window */}
      <MealModal open={open} onClose={handleClose} initialData={item}/>
    </>
  );
};