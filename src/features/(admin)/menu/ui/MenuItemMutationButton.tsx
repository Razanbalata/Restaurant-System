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

interface Props {
  mode?: "add" | "edit";
  restaurantId: string;
  categoryId?: string;
  item?: any; // البيانات في حالة التعديل
}

export const MenuItemMutationButton = ({ mode = "add", restaurantId, categoryId, item }: Props) => {
  const [open, setOpen] = useState(false);
  const handleClose = ()=>setOpen(false)


  return (
    <>
      {/* 1. الزر المشغل للمودال */}
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
            bgcolor: "#000", 
            borderRadius: "12px", 
            px: 3,
            "&:hover": { bgcolor: "#222" } 
          }}
        >
          إضافة وجبة
        </Button>
      )}

      {/* 2. النافذة المنبثقة (Modal) */}
      <MealModal open={open} onClose={handleClose} initialData={item}/>
    </>
  );
};