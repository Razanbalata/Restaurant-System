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

  const defaultCategory = categoriesQuery.data?.[0]?.name || "";
  const [categoryName, setCategoryName] = useState(defaultCategory);
  const [type, setType] = useState<AIGenerateType>("full");
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState<GeneratedMeal[]>([]);


  const category = useMemo(() => {
    return categoriesQuery.data?.find((c:any) => c.name === categoryName);
  }, [categoriesQuery.data, categoryName]);

  const handleClose = () => {
  setCategoryName("");
  setPrompt("");
  setType("full");
  setMenu([]);
  onClose(); 
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

            <CategoryMutationButton restaurantId={restaurantId} mode="add" />
          </Stack>

          <AIGenerateTypeSelector value={type} onChange={setType} />

          <AIPromptInput type={type} value={prompt} onChange={setPrompt} />

          <GenerateMenuButton
            payload={{
              restaurantName: restaurantId,
              category: categoryName,
              userPrompt: prompt,
              type,
            }}
            onSuccess={(generatedMenu) => setMenu(generatedMenu)}
          />

          <GeneratedMenuEditor menu={menu} onChange={setMenu} />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <SaveGeneratedMenuButton
          menu={menu}
          restaurantId={restaurantId}
          categoryId={category?.id || ""} 
          onSuccess={onClose} 
        />
      </DialogActions>
    </Dialog>
  );
};
