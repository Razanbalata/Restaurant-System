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
import { useState, useEffect, useRef } from "react";
import { useMenuItems } from "../menu_items/api/useMenuItems";
import { useCategories } from "../categories/api/useCategories";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { CategoryMutationButton } from "../categories/ui/CategoryMutationBtn";

interface MealItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category_id: string;
  image_url?: string;
}

interface MealModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: MealItem | null;
}

const MealModal = ({ open, onClose, initialData = null }: MealModalProps) => {
  const { selectedRestaurant } = useRestaurant();
  const isEdit = !!initialData;
  const fileInputRef = useRef<HTMLInputElement>(null); // مرجع لزر اختيار الملف المخفي

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    category_id: "",
    image_url: "",
  });

  // حالة لحفظ الملف الفعلي المختار لرفعه لاحقاً للسيرفر
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { useAdminCategories } = useCategories(selectedRestaurant?.id);
  const { data: categoriesData } = useAdminCategories;

  const { useAddMenuItem, useUpdateMenuItem } = useMenuItems(formData.category_id);
  const addMenuItem = useAddMenuItem();
  const updateMenuItem = useUpdateMenuItem();

  const isLoading = addMenuItem.isPending || updateMenuItem.isPending;

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        name: initialData.name || "",
        price: initialData.price || 0,
        description: initialData.description || "",
        category_id: initialData.category_id || "",
        image_url: initialData.image_url || "",
      });
    } else {
      setFormData({
        name: "",
        price: 0,
        description: "",
        category_id: "",
        image_url: "",
      });
      setSelectedFile(null);
    }
  }, [initialData, open, isEdit]);

  // دالة معالجة اختيار الصورة
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // إنشاء رابط للمعاينة الفورية
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image_url: previewUrl });
    }
  };

  const onSave = async () => {
    // ملاحظة: هنا يجب إضافة كود رفع selectedFile إلى Supabase Storage 
    // إذا نجح الرفع، نستبدل formData.image_url بالرابط الحقيقي الراجع من السيرفر.
    
    const payload = { 
      ...formData, 
      price: Number(formData.price),
      category_id: String(formData.category_id),
      restaurant_id: selectedRestaurant?.id 
    };

    if (isEdit) {
      updateMenuItem.mutate(
        { id: String(initialData?.id), updates: payload },
        { onSuccess: () => onClose() }
      );
    } else {
      addMenuItem.mutate(
        { 
          meals: [payload], 
          restaurantId: String(selectedRestaurant?.id), 
          categoryId: String(formData.category_id) 
        },
        { onSuccess: () => onClose() }
      );
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
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight="800">
          {isEdit ? "Edit Meal" : "Add New Meal"}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          
          {/* حقل اختيار الصورة المخفي */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />

          {/* صندوق رفع الصورة البصري */}
          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              border: "2px dashed #e0e0e0",
              borderRadius: "16px",
              height: 180,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&:hover": { bgcolor: "#fafafa", borderColor: "#FF5B22" },
            }}
          >
            {formData.image_url ? (
              <>
                <Box
                  component="img"
                  src={formData.image_url}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "0.3s",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <Typography color="white" fontWeight="700">Change Image</Typography>
                </Box>
              </>
            ) : (
              <>
                <CloudUpload sx={{ fontSize: 40, color: "#FF5B22", mb: 1 }} />
                <Typography variant="body2" color="textSecondary" fontWeight="600">
                  Click to upload meal image
                </Typography>
              </>
            )}
          </Box>

          <TextField
            fullWidth
            label="Meal Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
          />

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              select
              label="Category"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            >
              {categoriesData?.map((cat: { id: string; name: string }) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
              <CategoryMutationButton restaurantId={selectedRestaurant?.id} mode="add" />
            </TextField>

            <TextField
              fullWidth
              label="Price ($)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
          </Stack>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Meal Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} sx={{ color: "#637381", fontWeight: 700 }}>
          Cancel
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
          {isLoading ? <CircularProgress size={24} color="inherit" /> : isEdit ? "Save Changes" : "Add Meal"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MealModal;