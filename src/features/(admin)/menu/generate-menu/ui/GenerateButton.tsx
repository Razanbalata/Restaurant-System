"use client";

import { Button } from "@mui/material";
import { useGenerateMenu } from "../api/useGenerateMenu";
import { GenerateMenuPayload, GeneratedMeal } from "../libs/types";

type Props = {
  payload: GenerateMenuPayload;
  onSuccess: (menu: GeneratedMeal[]) => void;
};

export const GenerateMenuButton = ({ payload, onSuccess }: Props) => {
  const { mutate, isPending } = useGenerateMenu();

const handleClick = () => {
    mutate(payload, {
      onSuccess: (data) => {
        const cleanedMenu = data.menu.map((item: any) => ({
          ...item,
          price: typeof item.price === "string" 
            ? parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0 
            : item.price,
        }));

        onSuccess(cleanedMenu); 
      },
    });
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      disabled={isPending}
      fullWidth
    >
      {isPending ? "Generating..." : "Generate with AI"}
    </Button>
  );
};
