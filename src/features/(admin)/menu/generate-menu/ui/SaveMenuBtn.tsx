"use client";

import { Button } from "@mui/material";
import { useSaveMenu } from "../api/useSaveGeneratedMenu";
import { GeneratedMeal } from "../libs/types";
import { useMenuItems } from "../../menu_items/api/useMenuItems";

type Props = {
  menu: GeneratedMeal[];
  restaurantId: string;
  categoryId: string;
  onSuccess?: () => void;
};

export const SaveGeneratedMenuButton: React.FC<Props> = ({
  menu,
  restaurantId,
  categoryId,
  onSuccess,
}) => {
  const {useAddMenuItem} = useMenuItems(categoryId)
  const addMenuItem = useAddMenuItem()
  const isSaving = addMenuItem.isPending;

  const handleSave = () => {
    if (!menu.length) return;

    addMenuItem.mutate(
      { restaurantId, categoryId, meals: menu },
      { onSuccess: () => onSuccess?.() }
    );
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={handleSave}
      disabled={!menu || menu.length === 0 || isSaving}
    >
      {isSaving ? "Saving..." : "Save Menu"}
    </Button>
  );
};
