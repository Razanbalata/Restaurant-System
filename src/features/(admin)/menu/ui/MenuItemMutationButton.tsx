"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import { useUpdateMenuItem } from "../../(admin)/menu/mutation-hooks/useUpdateMenuItem";
import { useAddMenuItem } from "../../(admin)/menu/mutation-hooks/useAddmenu";

export const MenuItemMutationButton = ({ mode = "add", restaurantId, item }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", price: "", description: "" });

  const updateMutation = useUpdateMenuItem(restaurantId);
  const addMutation = useAddMenuItem(restaurantId);

  // 🌟 إعادة تهيئة الفورم عند فتح المودال
  useEffect(() => {
    if (open) {
      if (mode === "edit" && item) {
        setFormData({
          name: item.name || "",
          price: item.price || "",
          description: item.description || "",
        });
      } else {
        setFormData({ name: "", price: "", description: "" }); // الفورم فارغ عند الإضافة
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

    if (mode === "edit") {
      updateMutation.mutate({ id: item.id, updatedData: payload }, { onSuccess: () => setOpen(false) });
    } else {
      addMutation.mutate(payload, { onSuccess: () => setOpen(false) });
    }
  };

  return (
    <>
      {mode === "edit" ? (
        <Button variant="contained" size="small" startIcon={<EditIcon />} onClick={() => setOpen(true)}>
          تعديل
        </Button>
      ) : (
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          إضافة وجبة
        </Button>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>{mode === "edit" ? "تعديل الوجبة" : "إضافة وجبة جديدة"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="اسم الوجبة" fullWidth value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <TextField label="السعر (₪)" type="number" fullWidth value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            <TextField label="الوصف" multiline rows={3} fullWidth value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>إلغاء</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={updateMutation.isPending || addMutation.isPending}>
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
