"use client";
import React from "react";
import { Stack, Switch, Typography, alpha, useTheme, Tooltip } from "@mui/material";
import { useMenuItems } from "../menu_items/api/useMenuItems";

interface MenuItem {
  id: string;
  category_id: string;
  restaurant_id: string;
  is_active: boolean;
  name?: string;
}

function ToggleMenuItem({ item }: { item: MenuItem }) {
  const theme = useTheme();
  const { useUpdateMenuItem } = useMenuItems(item.category_id);
  const updateMenuItem = useUpdateMenuItem();

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    updateMenuItem.mutate({
      id: item.id,
      updates: { is_active: !item.is_active, restaurant_id: item.restaurant_id },
    });
  };

  return (
    <Tooltip title={item.is_active ? "Set as Sold Out" : "Set as Available"} arrow>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Switch
          size="small"
          checked={item.is_active}
          onChange={handleToggle}
          color="primary"
          sx={{
            "& .Mui-checked": {
              color: theme.palette.success.main,
            },
          }}
        />
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{
            color: item.is_active ? "success.main" : "text.disabled",
            textTransform: "uppercase",
            fontSize: "0.65rem",
          }}
        >
          {item.is_active ? "Available" : "Sold Out"}
        </Typography>
      </Stack>
    </Tooltip>
  );
}

export default ToggleMenuItem;
