"use client";
import { useState } from "react";
import { Button, IconButton, useTheme, alpha, Tooltip } from "@mui/material";
import { Plus, PencilLine } from "lucide-react"; 
import CategoryDialog from "./CategoryDialog";

interface Props {
  mode?: "add" | "edit";
  restaurantId?: string;
  category?: any;
}

export const CategoryMutationButton = ({ mode = "add", restaurantId, category }: Props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      {mode === "edit" ? (
        <Tooltip title="Edit Category">
          <IconButton 
            size="small" 
            onClick={() => setOpen(true)} 
            sx={{ 
              color: "text.secondary", 
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2, 
              p: 0.8,
              transition: "all 0.2s",
              '&:hover': { 
                color: "primary.main",
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderColor: theme.palette.primary.light
              } 
            }}
          >
            <PencilLine size={16} />
          </IconButton>
        </Tooltip>
      ) : (
        <Button 
          variant="outlined" 
          size="small" 
          startIcon={<Plus size={18} />} 
          onClick={() => setOpen(true)}
          sx={{ 
            borderRadius: 2.5, 
            fontWeight: 600,
            textTransform: 'none', 
            px: 2,
            py: 0.8,
            borderColor: theme.palette.divider,
            color: 'text.primary',
            bgcolor: 'background.paper',
            '&:hover': {
              borderColor: theme.palette.primary.main,
              bgcolor: alpha(theme.palette.primary.main, 0.02),
              boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.08)}`
            }
          }}
        >
          Add Category
        </Button>
      )}

      <CategoryDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        mode={mode} 
        restaurantId={restaurantId} 
        category={category} 
      />
    </>
  );
};