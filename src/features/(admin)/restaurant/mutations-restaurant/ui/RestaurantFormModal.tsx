"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";

import { useAddRestaurant } from "../api(delete)/useAddRestaurant";
import { useUpdateRestaurant } from "../api(delete)/useUpdateRestaurant";
import { MenuChoiceModal } from "./MenuChoiceModal"; 
import { MenuItemForm } from "./MenuItemForm"; 
import { useAddMenuItem } from "@/features/(admin)/menu/mutation-hooks(delete)/useAddmenu";
import AIMenuModal from "@/features/menu/ui/AIMenuModal";

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
  const router = useRouter();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  // 🆕 states خاصة بالمنيو
  const [menuChoiceOpen, setMenuChoiceOpen] = useState(false);
  const [manualMenuModalOpen, setManualMenuModalOpen] = useState(false);
  const [createdRestaurantId, setCreatedRestaurantId] = useState<number | null>(
    null
  );
  const [aiMenuModalOpen, setAiMenuModalOpen] = useState(false);

  const addMutation = useAddRestaurant();
  const editMutation = useUpdateRestaurant();

  const addMenuMutation = useAddMenuItem(createdRestaurantId ? createdRestaurantId.toString() : "");

  // تعبئة البيانات عند الفتح
  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && restaurant) {
      setName(restaurant.name || "");
      setCity(restaurant.city || "");
    } else {
      setName("");
      setCity("");
    }
  }, [open, mode, restaurant]);

  const handleSave = () => {
    if (!name.trim() || !city.trim()) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    // ➕ إضافة مطعم
    if (mode === "add") {
      addMutation.mutate(
        {
          name,
          city,
          country: "Palestine",
        },
        {
          onSuccess: (data: any) => {
            // نحفظ ID المطعم الجديد
            setCreatedRestaurantId(data.id);

            // نفتح مودال اختيار المنيو
            setMenuChoiceOpen(true);
          },
        }
      );
    }

    // ✏️ تعديل مطعم
    if (mode === "edit" && restaurant) {
      editMutation.mutate(
        {
          id: restaurant.id,
          updates: { name, city },
        },
        { onSuccess: () => onClose() }
      );
    }
  };

  return (
    <>
      {/* مودال المطعم */}
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
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={addMutation.isPending || editMutation.isPending}
          >
            {mode === "add" ? "إضافة" : "حفظ التعديلات"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* مودال اختيار طريقة إنشاء المنيو */}
      {menuChoiceOpen && (
        <MenuChoiceModal
          open={menuChoiceOpen}
          onClose={() => setMenuChoiceOpen(false)}
          onChoice={(choice) => {
            setMenuChoiceOpen(false);

            if (!createdRestaurantId) return;

            if (choice === "manual") {
              setManualMenuModalOpen(true); // فتح الفورم اليدوي
            }

            if (choice === "ai") {
              // لاحقًا مودال AI
              alert("ستظهر المساعدة بالذكاء الاصطناعي هنا");
              setAiMenuModalOpen(true);
            }
          }}
        />
      )}

      {/* مودال إضافة/تعديل وجبة يدوي */}
      {manualMenuModalOpen && createdRestaurantId && (
        <MenuItemForm
          open={manualMenuModalOpen}
          mode="add"
          restaurantId={createdRestaurantId}
          onClose={() => setManualMenuModalOpen(false)}
          addMutation={addMenuMutation}
        />
      )}
 
      {/* مودال مساعد الذكاء الاصطناعي - قيد التطوير */}
      {aiMenuModalOpen && createdRestaurantId && (
        <AIMenuModal
          open={aiMenuModalOpen}
          onClose={() => setAiMenuModalOpen(false)}
          restaurantId={createdRestaurantId.toString()}
          restaurantName={name}
          category=""
        />
      )}

    </>
  );
}
