"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useUpdateRestaurant } from "../api/useUpdateRestaurant";
import { useRestaurants } from "../../get-restaurants/api/useRestaurants";
import { useAddRestaurant } from "../api/useAddRestaurant";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  restaurant?: any;
};

export default function RestaurantModal({
  open,
  onClose,
  mode,
  restaurant,
}: Props) {
  console.log(restaurant);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const editMutation = useUpdateRestaurant();
  const addMutation = useAddRestaurant();

  // 2. مراقبة التغيرات (هنا يكمن السر)
  useEffect(() => {
    if (open) {
      if (mode === "edit" && restaurant) {
        // إذا كنا في وضع التعديل، نضع البيانات الموجودة
        setName(restaurant.name || "");
        setCity(restaurant.city || "");
      } else {
        // إذا كنا في وضع الإضافة، نفرغ الحقول
        setName("");
        setCity("");
      }
    }
  }, [open, mode, restaurant]);

  const handleSave = () => {
    // التأكد من أن المستخدم أدخل البيانات الأساسية
    if (!name.trim() || !city.trim()) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    if (mode === "add") {
      // نمرر الكائن الذي يتوقعه السيرفر (اسم المطعم والمدينة)
      addMutation.mutate(
        {
          name: name,
          city: city,
          country: "Palestine", // مثال إذا كان الحقل ثابتاً أو مخفياً
        },
        {
          onSuccess: () => {
            onClose(); // إغلاق المودال عند النجاح
            console.log("تمت إضافة المطعم بنجاح", name, city);
          },
        }
      );
    } else {
      // في التعديل، نحتاج المعرف (id) والبيانات الجديدة
      editMutation.mutate(
        {
          id: restaurant.id,
          updates: {
            // 💡 يجب وضع البيانات داخل كائن اسمه updates
            name: name,
            city: city,
          },
        },
        {
          onSuccess: () => {
            console.log("تم تحديث المطعم بنجاح", name, city);
            onClose(); // إغلاق المودال عند النجاح
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === "add" ? "إضافة مطعم جديد" : "تعديل بيانات المطعم"}
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="اسم المطعم"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="المدينة"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          إلغاء
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {mode === "add" ? "إضافة" : "حفظ التعديلات"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
