"use client";

import React, { useState } from "react";
import { Box, Stack, Typography, Button, TextField, CircularProgress, IconButton } from "@mui/material";
import { Edit, Trash2, Plus } from "lucide-react";
import { useCategories } from "@/features/(admin)/menu/categories/api/useCategories"; // تأكدي من المسار الصحيح
import { useMe } from "@/features/user/api/use-me";

export default function OwnerCategories({ restaurantId }: { restaurantId: string }) {
  const { useAdminCategories, useAddCategory, useUpdateCategory, useDeleteCategory } = useCategories(restaurantId);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  const categoriesQuery = useAdminCategories
  const addCategory = useAddCategory()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  if (categoriesQuery.isLoading) return <CircularProgress />;
  if (categoriesQuery.isError) return <Typography color="error">فشل جلب التصنيفات</Typography>;

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    addCategory.mutate({name:inputValue});
    setInputValue("");
  };

  const handleUpdate = (id: string) => {
    if (!inputValue.trim()) return;
    updateCategory.mutate({ id, updates: inputValue });
    setEditingId(null);
    setInputValue("");
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="اسم التصنيف"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={editingId ? () => handleUpdate(editingId) : handleAdd}>
          {editingId ? "تعديل" : "إضافة"} <Plus size={16} style={{ marginLeft: 4 }} />
        </Button>
      </Stack>

      <Stack spacing={1}>
        {categoriesQuery.data.map((cat: any) => (
          <Stack
            key={cat.id}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: 1, border: "1px solid #ccc", borderRadius: 2 }}
          >
            <Typography>{cat.name}</Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" onClick={() => { setEditingId(cat.id); setInputValue(cat.name); }}>
                <Edit size={16} />
              </IconButton>
              <IconButton size="small" onClick={() => deleteCategory.mutate(cat.id)}>
                <Trash2 size={16} />
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
