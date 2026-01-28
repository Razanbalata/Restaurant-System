import { Button } from '@mui/material';
import { DeleteIcon } from 'lucide-react';
import React from 'react';
import { useMenuItems } from '../menu_items/api/useMenuItems';

interface MenuItem {
  id: string;
  category_id: string;
  name?: string; // أضفتها تحسباً لو احتجت عرض الاسم في رسالة تأكيد
}

function DeleteMenuItem({r} : {r: MenuItem}) {

  const {useDeleteMenuItem} = useMenuItems(r.category_id)
  const deleteMenuItem = useDeleteMenuItem()

 function handleDelete(id: string, e: React.MouseEvent){
   e.stopPropagation()
   if (window.confirm("هل أنت متأكد من حذف هذا المطعم؟")) {
      deleteMenuItem.mutate(id);
     }
 }

  return (
   <Button
        variant="outlined"
        color="error"
        fullWidth
        startIcon={<DeleteIcon />}
        onClick={(e) => handleDelete(r.id, e)}
      >
        حذف
      </Button>
  );
}

export default DeleteMenuItem;
