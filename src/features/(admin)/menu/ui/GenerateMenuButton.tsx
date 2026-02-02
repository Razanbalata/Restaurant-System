"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { AIGenerateModal } from "../generate-menu/ui/AIGeneratePanel"; 

export default function GenerateMenuButton({ restaurantId }: { restaurantId: string }) {
  const [open, setOpen] = useState(false);

  

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AutoAwesomeIcon />}
        onClick={() => setOpen(true)}
      >
        Generate with AI
      </Button>

      <AIGenerateModal
        open={open}
        onClose={() => setOpen(false)}
        restaurantId={restaurantId}
      />
    </>
  );
}
