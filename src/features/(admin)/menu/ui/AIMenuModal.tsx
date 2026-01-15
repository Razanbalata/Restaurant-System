"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useGenerateAndSaveMenu } from "../get-menu/useGenerateMenu"; 
import { useAddMenuItem } from "../../(admin)/menu/mutation-hooks/useAddmenu";

type Props = {
  open: boolean;
  onClose: () => void;
  restaurantId: string;
  restaurantName: string;
  category?: string;
};

export default function AIMenuModal({
  open,
  onClose,
  restaurantId,
  restaurantName,
  category,
}: Props) {
  const [prompt, setPrompt] = useState(
    `قم بتوليد قائمة طعام لمطعم فلسطيني اسمه "${restaurantName}" وتخصصه "${category || "عام"}". أريد 8 وجبات بأسعار واقعية بالشيكل (ILS) مع روابط صور عشوائية.`
  );
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generateMenu = useGenerateAndSaveMenu(restaurantId);
  const addMenuItem = useAddMenuItem(restaurantId);

  const handleGenerate = () => {
    setLoading(true);
    generateMenu.mutate(
      { name: restaurantName, category: prompt }, // نرسل البرومبت هنا
      {
        onSuccess: (data: any) => {
          setMenuItems(data.menu || []);
          setLoading(false);
        },
        onError: (err: any) => {
          alert(err.message);
          setLoading(false);
        },
      }
    );
  };

  const handleSave = async () => {
    for (const item of menuItems) {
      await addMenuItem.mutateAsync(item);
    }
    onClose();
  };

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...menuItems];
    updated[index] = { ...updated[index], [field]: value };
    setMenuItems(updated);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>AI Menu Chat</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          {/* 🌟 الشات / البرومبت */}
          {menuItems.length === 0 && (
            <>
              <Typography fontWeight="bold">
                البرومبت:
              </Typography>
              <TextField
                multiline
                minRows={3}
                fullWidth
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? "جارٍ توليد المنيو..." : "Generate Menu"}
              </Button>
            </>
          )}

          {/* 🌟 عرض الرد من الـ AI */}
          {menuItems.length > 0 && (
            <Stack spacing={2}>
              <Typography fontWeight="bold">المنيو المولد:</Typography>
              {menuItems.map((item, idx) => (
                <Stack key={idx} spacing={1}>
                  <TextField
                    label="اسم الوجبة"
                    value={item.name}
                    onChange={(e) =>
                      handleChange(idx, "name", e.target.value)
                    }
                  />
                  <TextField
                    label="السعر (₪)"
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleChange(idx, "price", Number(e.target.value))
                    }
                  />
                  <TextField
                    label="الوصف"
                    multiline
                    rows={2}
                    value={item.description}
                    onChange={(e) =>
                      handleChange(idx, "description", e.target.value)
                    }
                  />
                  <TextField
                    label="رابط الصورة"
                    value={item.image_url || ""}
                    onChange={(e) =>
                      handleChange(idx, "image_url", e.target.value)
                    }
                  />
                </Stack>
              ))}
            </Stack>
          )}

          {loading && (
            <Box textAlign="center" mt={2}>
              <CircularProgress />
              <Typography>جاري توليد المنيو...</Typography>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>إلغاء</Button>
        {menuItems.length > 0 && (
          <Button variant="contained" onClick={handleSave}>
            حفظ المنيو
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
