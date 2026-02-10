"use client";
import React from 'react';
import { IconButton, Tooltip, alpha, useTheme } from '@mui/material';
import { Trash2 } from 'lucide-react';
import { useMenuItems } from '../menu_items/api/useMenuItems';

interface MenuItem {
  id: string;
  category_id: string;
  name?: string;
  restaurant_id: string
}

function DeleteMenuItem({ r }: { r: MenuItem }) {
  const theme = useTheme();
  const { useDeleteMenuItem } = useMenuItems(r.category_id);
  const deleteMenuItem = useDeleteMenuItem();

  function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    // نصيحة: استبدل confirm بـ Dialog مخصص لاحقاً لزيادة الفخامة
    if (window.confirm(`Are you sure you want to delete "${r.name || 'this item'}"?`)) {
      deleteMenuItem.mutate({ id, restaurantId: r.restaurant_id,catId:r.category_id });
    }
  }

  return (
    <Tooltip title="Delete Item" arrow>
      <IconButton
        size="small"
        onClick={(e) => handleDelete(r.id, e)}
        sx={{
          width: 34,
          height: 34,
          borderRadius: "10px", // نفس انحناء أزرار التعديل
          color: "text.secondary",
          border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
          bgcolor: alpha(theme.palette.background.paper, 0.5),
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            color: "error.main",
            bgcolor: alpha(theme.palette.error.main, 0.05),
            borderColor: alpha(theme.palette.error.main, 0.2),
            transform: "translateY(-2px)", // رفعة خفيفة عند التمرير
            boxShadow: `0 4px 12px ${alpha(theme.palette.error.main, 0.1)}`,
          },
        }}
      >
        <Trash2 size={16} strokeWidth={2} />
      </IconButton>
    </Tooltip>
  );
}

export default DeleteMenuItem;