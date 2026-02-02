"use client";
import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Divider,
  Button,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";

import { AIGenerateType, GeneratedMeal } from "../libs/types";
import { AIGenerateTypeSelector } from "./AIGenerateTypeSelector";
import { AIPromptInput } from "./AIPromptInput";
import { GeneratedMenuEditor } from "./MenuItemsEditor";
import { useGenerateMenu } from "../api/useGenerateMenu";
import { useSaveMenu } from "../api/useSaveGeneratedMenu";
import { useCategories } from "../../categories/api/useCategories";
import { CategoryMutationButton } from "../../categories/ui/CategoryMutationBtn"; 
import { GenerateMenuButton } from "./GenerateButton";
import { SaveGeneratedMenuButton } from "./SaveMenuBtn";

type Props = {
  open: boolean;
  onClose: () => void;
  restaurantId: string;
};

export const AIGenerateModal = ({ open, onClose, restaurantId }: Props) => {
  const { useAdminCategories } = useCategories(restaurantId);
  const categoriesQuery = useAdminCategories;

  // 1️⃣ default category بدون useEffect
  const defaultCategory = categoriesQuery.data?.[0]?.name || "";
  const [categoryName, setCategoryName] = useState(defaultCategory);
  const [type, setType] = useState<AIGenerateType>("full");
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState<GeneratedMeal[]>([]);


  // 2️⃣ نحصل على object الكاتيجوري الحالي
  const category = useMemo(() => {
    return categoriesQuery.data?.find((c:any) => c.name === categoryName);
  }, [categoriesQuery.data, categoryName]);

  const handleClose = () => {
  // فرغ كل القيم
  setCategoryName("");
  setPrompt("");
  setType("full");
  setMenu([]);
  onClose(); // تستدعي الـ prop الأصلي
};

  

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Stack spacing={0.5}>
          <Typography variant="h6">🤖 AI Menu Generator</Typography>
          <Typography color="text.secondary" variant="body2">
            Generate & edit meals for your restaurant
          </Typography>
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* اختيار أو إنشاء كاتيجوري */}
          <Stack direction="row" spacing={1} alignItems="center">
            {categoriesQuery.isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Select
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                fullWidth
                size="small"
              >
                {categoriesQuery.data?.map((cat: any) => (
                  <MenuItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            )}

            {/* زر لإضافة كاتيجوري جديد */}
            <CategoryMutationButton restaurantId={restaurantId} mode="add" />
          </Stack>

          {/* نوع التوليد */}
          <AIGenerateTypeSelector value={type} onChange={setType} />

          {/* إدخال الـ prompt */}
          <AIPromptInput type={type} value={prompt} onChange={setPrompt} />

          {/* زر Generate */}
          <GenerateMenuButton
            payload={{
              restaurantName: restaurantId,
              category: categoryName,
              userPrompt: prompt,
              type,
            }}
            onSuccess={(generatedMenu) => setMenu(generatedMenu)}
          />

          {/* عرض الوجبات المولدة وتحريرها */}
          <GeneratedMenuEditor menu={menu} onChange={setMenu} />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        {/* حفظ المنيو مع حماية categoryId */}
        <SaveGeneratedMenuButton
          menu={menu}
          restaurantId={restaurantId}
          categoryId={category?.id || ""} // لو undefined يبقى string فارغ
        />
      </DialogActions>
    </Dialog>
  );
};
