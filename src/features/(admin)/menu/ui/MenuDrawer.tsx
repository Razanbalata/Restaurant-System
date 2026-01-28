"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close, CloudUpload } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useMenuItems } from "../menu_items/api/useMenuItems";
import { useCategories } from "../categories/api/useCategories";
import { useRestaurant } from "@/app/providers/RestaurantContext";

// أضفنا initialData لمعرفة إذا كان هناك تعديل

interface MealItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category_id: string;
  image_url?: string;
}

// 2. تعريف الـ Props للمكون
interface MealModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: MealItem | null;
}

const MealModal = ({ open, onClose, initialData = null }: MealModalProps) => {
  const { selectedRestaurant } = useRestaurant();
  const isEdit = !!initialData; // إذا وجد بيانات أولية، إذن نحن في وضع التعديل

  // 1. حالات الفورم
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    category_id: "", // نستخدم الـ ID بدلاً من الاسم
    image: null as File | null,
  });

  // 2. جلب التصنيفات الحقيقية من السيرفر
  const { useAdminCategories } = useCategories(selectedRestaurant?.id);
  const { data: categoriesData } = useAdminCategories;

  // 3. هوكس الإضافة والتعديل
  const { useAddMenuItem, useUpdateMenuItem } = useMenuItems(
    formData.category_id,
  );
  const addMenuItem = useAddMenuItem();
  const updateMenuItem = useUpdateMenuItem();

  const isLoading = addMenuItem.isPending || updateMenuItem.isPending;

  // 4. تعبئة البيانات عند التعديل أو تصفيرها عند الإضافة
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        name: initialData.name || "",
        price: initialData.price || 0,
        description: initialData.description || "",
        category_id: initialData.category_id || "",
        image: null,
      });
    } else {
      setFormData({
        name: "",
        price: 0,
        description: "",
        category_id: "",
        image: null,
      });
    }
  }, [initialData, open, isEdit]);

  const onSave = () => {
    const payload = { ...formData, restaurant_id: selectedRestaurant?.id };

    if (isEdit) {
      // منطق التعديل
      updateMenuItem.mutate(
        { id: initialData.id, updates: payload },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else {
      // 1. تنظيف البيانات وتحويل الأنواع قبل الإرسال
      const formattedPayload = {
        name: formData.name,
        price: Number(formData.price), // تحويل السعر لرقم
        description: formData.description || undefined,
        image: null, // نرسل null حالياً لأن الـ Type لا يدعم File
      };

      // 2. تمرير الكائن المنظف مباشرة (بدون newItem)
      addMenuItem.mutate(formattedPayload, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: "24px", p: 1 } }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="800">
          {isEdit ? "تعديل الوجبة" : "إضافة وجبة جديدة"}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* قسم رفع الصورة (كما هو في كودك) */}
          <Box
            sx={{
              border: "2px dashed #e0e0e0",
              borderRadius: "16px",
              p: 4,
              textAlign: "center",
              cursor: "pointer",
              "&:hover": { bgcolor: "#fafafa", borderColor: "#FF5B22" },
            }}
          >
            <CloudUpload sx={{ fontSize: 40, color: "#FF5B22", mb: 1 }} />
            <Typography variant="body2" color="textSecondary">
              {formData.image ? "تم اختيار صورة" : "ارفع صورة الوجبة هنا"}
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="اسم الوجبة"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
          />

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              select
              label="التصنيف"
              value={formData.category_id}
              onChange={(e) =>
                setFormData({ ...formData, category_id: e.target.value })
              }
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            >
              {categoriesData?.map((cat: { id: string; name: string }) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="السعر ($)"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
          </Stack>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="وصف الوجبة"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} sx={{ color: "#637381", fontWeight: 700 }}>
          إلغاء
        </Button>
        <Button
          variant="contained"
          onClick={onSave}
          disabled={isLoading}
          sx={{
            bgcolor: "#FF5B22",
            borderRadius: "12px",
            px: 4,
            fontWeight: 700,
            "&:hover": { bgcolor: "#e54a1a" },
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : isEdit ? (
            "حفظ التعديلات"
          ) : (
            "إضافة الوجبة"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MealModal;
