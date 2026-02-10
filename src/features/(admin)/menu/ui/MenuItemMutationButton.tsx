"use client";

import { useState } from "react";
import { 
  Button, 
  IconButton, 
  Tooltip, 
  alpha, 
  useTheme 
} from "@mui/material";
import { Plus, Pencil } from "lucide-react"; // أيقونات Lucide أرشق

import MealModal from "./MenuDrawer";

interface Props {
  mode?: "add" | "edit";
  restaurantId: string;
  categoryId?: string;
  item?: any;
}

export const MenuItemMutationButton = ({ mode = "add", item }: Props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme(); // استخدام ثيم MUI للوصول للألوان والـ alpha

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation(); // منع تفعيل أي حدث على الكارد عند الضغط على التعديل
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {mode === "edit" ? (
        <Tooltip title="Edit Item" arrow>
          <IconButton 
            onClick={handleOpen} 
            size="small" 
            sx={{ 
              width: 34,
              height: 34,
              borderRadius: "10px",
              color: "primary.main",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              bgcolor: alpha(theme.palette.primary.main, 0.02),
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              '&:hover': { 
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                borderColor: theme.palette.primary.main,
                transform: "translateY(-2px)",
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.12)}`,
              } 
            }}
          >
            <Pencil size={16} strokeWidth={2.2} />
          </IconButton>
        </Tooltip>
      ) : (
        <Button 
          variant="contained" 
          disableElevation
          startIcon={<Plus size={18} strokeWidth={2.5} />} 
          onClick={() => setOpen(true)}
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white',
            borderRadius: "12px", 
            px: 3,
            py: 1,
            fontWeight: 700,
            textTransform: 'none', // لمنع تحويل النص لـ Capital بالكامل
            transition: 'all 0.2s',
            "&:hover": { 
                bgcolor: 'primary.dark',
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
            } 
          }}
        >
          Add Meal
        </Button>
      )}

      {/* المودال */}
      <MealModal open={open} onClose={handleClose} initialData={item} />
    </>
  );
};