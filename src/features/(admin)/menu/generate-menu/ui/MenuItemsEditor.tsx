"use client";

import React, { useReducer, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { GeneratedMeal } from "../libs/types";
import { menuReducer } from "../api/useMenuReducer"; 

type Props = {
  menu: GeneratedMeal[];        // من الـ AI
  onChange?: (menu: GeneratedMeal[]) => void; // للـ parent
};

export const GeneratedMenuEditor: React.FC<Props> = ({
  menu,
  onChange,
}) => {
  const [state, dispatch] = useReducer(menuReducer, { items: [] });
  const lastSyncedFromProp = useRef<GeneratedMeal[] | null>(null);

  // ⬅️ كل مرة ييجي menu جديد من الـ AI
  useEffect(() => {
    if (menu === lastSyncedFromProp.current) return;
    dispatch({ type: "SET_MENU", payload: menu });
    lastSyncedFromProp.current = menu;
  }, [menu]);

  // ⬅️ نرجع التعديلات للأب
  useEffect(() => {
    // if the latest state.items was just synced from parent prop, don't emit back
    if (lastSyncedFromProp.current === state.items) return;
    lastSyncedFromProp.current = state.items;
    onChange?.(state.items);
  }, [state.items, onChange]);

  if (!state.items.length) {
    return (
      <Typography color="text.secondary">
        No generated meals yet.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      <Typography fontWeight={700}>🍽 Generated Meals</Typography>

      {state.items.map((item, idx) => (
        <Card key={idx} variant="outlined">
          <CardContent>
            <Stack spacing={1.5}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight={600}>
                  Meal {idx + 1}
                </Typography>

                <IconButton
                  color="error"
                  onClick={() =>
                    dispatch({ type: "REMOVE_ITEM", index: idx })
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>

              <Divider />

              <TextField
                label="Name"
                value={item.name}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_ITEM",
                    index: idx,
                    field: "name",
                    value: e.target.value,
                  })
                }
                fullWidth
              />

              <TextField
                label="Price (₪)"
                type="number"
                value={item.price}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_ITEM",
                    index: idx,
                    field: "price",
                    value: Number(e.target.value),
                  })
                }
                fullWidth
              />

              <TextField
                label="Description"
                value={item.description || ""}
                multiline
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_ITEM",
                    index: idx,
                    field: "description",
                    value: e.target.value,
                  })
                }
                fullWidth
              />

              <TextField
                label="Image URL"
                value={item.image_url || ""}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_ITEM",
                    index: idx,
                    field: "image_url",
                    value: e.target.value,
                  })
                }
                fullWidth
              />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
