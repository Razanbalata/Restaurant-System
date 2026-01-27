"use client";
import React from "react";
import { Stack, IconButton, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useCart } from "@/features/(customer)/cart/api/useCart";

interface Props {
  itemId: string;
}

export function CartItemControls({ itemId }: Props) {
  const { items, updateQty, removeItem } = useCart();
const item = items.find((i) => i.menuItemId === itemId);
  if (!item) return null;

const increase = () => updateQty(item.menuItemId, item.quantity + 1);
const decrease = () => updateQty(item.menuItemId, item.quantity - 1);


  const remove = () => removeItem(item.menuItemId);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton onClick={decrease} disabled={item.quantity <= 1} size="small">
        <RemoveRoundedIcon />
      </IconButton>
      <Typography>{item.quantity}</Typography>
      <IconButton onClick={increase} size="small">
        <AddRoundedIcon />
      </IconButton>
      <IconButton onClick={remove} size="small" color="error">
        <DeleteOutlineRoundedIcon />
      </IconButton>
    </Stack>
  );
}
