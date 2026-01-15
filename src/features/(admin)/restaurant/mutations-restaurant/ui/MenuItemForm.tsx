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
} from "@mui/material";

type MenuItemFormProps = {
  open: boolean;
  mode: "add" | "edit";
  restaurantId: number;
  item?: {
    id?: number;
    name?: string;
    price?: number;
    description?: string;
  };
  onClose: () => void;
  onSaved?: () => void; // callback بعد الحفظ
  addMutation?: any; // ستستقبل useAddMenuItem
  updateMutation?: any; // ستستقبل useUpdateMenuItem
};

export const MenuItemForm = ({
  open,
  mode,
  restaurantId,
  item,
  onClose,
  onSaved,
  addMutation,
  updateMutation,
}: MenuItemFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (open) {
      if (mode === "edit" && item) {
        setFormData({
          name: item.name || "",
          price: item.price?.toString() || "",
          description: item.description || "",
        });
      } else {
        setFormData({ name: "", price: "", description: "" });
      }
    }
  }, [open, mode, item]);

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      alert("يرجى تعبئة اسم الوجبة والسعر");
      return;
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      restaurant_id: restaurantId,
    };

    if (mode === "edit" && updateMutation) {
      updateMutation.mutate(
        { id: item?.id, updatedData: payload },
        {
          onSuccess: () => {
            onSaved?.();
            onClose();
          },
        }
      );
    } else if (mode === "add" && addMutation) {
      addMutation.mutate(payload, {
        onSuccess: () => {
          onSaved?.();
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        {mode === "edit" ? "تعديل الوجبة" : "إضافة وجبة جديدة"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="اسم الوجبة"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="السعر (₪)"
            type="number"
            fullWidth
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <TextField
            label="الوصف"
            multiline
            rows={3}
            fullWidth
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>إلغاء</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            addMutation?.isPending || updateMutation?.isPending
          }
        >
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
};
