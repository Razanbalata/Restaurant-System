"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onChoice: (choice: "manual" | "ai") => void;
};

export const MenuChoiceModal = ({ open, onClose, onChoice }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>كيف تريد إنشاء قائمة الطعام؟</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography>اختر الطريقة المفضلة لإضافة المنيو:</Typography>
          <Button variant="outlined" fullWidth onClick={() => onChoice("manual")}>
            إنشاء يدوي
          </Button>
          <Button variant="contained" fullWidth onClick={() => onChoice("ai")}>
            مساعد الذكاء الاصطناعي
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إلغاء</Button>
      </DialogActions>
    </Dialog>
  );
};
