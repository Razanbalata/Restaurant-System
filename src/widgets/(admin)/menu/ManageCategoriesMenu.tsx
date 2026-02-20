"use client";
import { useState } from "react";
import { Settings, Plus, Pencil, Trash2 } from "lucide-react";
import { 
  Box, 
  IconButton, 
  Typography, 
  Menu, 
  Divider, 
  Button, 
  Stack, 
  useTheme, 
  alpha,
  Tooltip
} from "@mui/material";

import { CategoryMutationButton } from "@/features/(admin)/menu/categories/ui/CategoryMutationBtn";
import DeleteCategoryBtn from "@/features/(admin)/menu/categories/ui/DeleteCategoryBtn";

export interface Category {
  id: string;
  name: string;
}

interface ManageCategoriesMenuProps {
  categories: Category[];
  restaurantId?: string;
}

export const ManageCategoriesMenu = ({ categories, restaurantId }: ManageCategoriesMenuProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="Settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            height: 36,
            width: 36,
            borderRadius: "10px",
            transition: "all 0.2s ease-in-out",
            bgcolor: open ? alpha(theme.palette.primary.main, 0.1) : "transparent",
            color: open ? "primary.main" : "text.secondary",
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              color: "primary.main",
            },
          }}
        >
          <Settings size={18} strokeWidth={1.8} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        elevation={0}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            width: 260,
            mt: 1,
            borderRadius: "14px",
            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            bgcolor: alpha(theme.palette.background.paper, 0.8), 
            backdropFilter: "blur(12px)",
            boxShadow: `0 10px 30px -10px ${alpha(theme.palette.common.black, 0.1)}`,
            p: 0,
            overflow: "hidden",
          },
        }}
      >
        {/* Header Section */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1.2 }}
        >
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "text.secondary",
              opacity: 0.8,
            }}
          >
            Categories
          </Typography>
          
          {/* زر إضافة سريع */}
          <Box sx={{ scale: "0.8" }}>
             <CategoryMutationButton mode="add" restaurantId={restaurantId} />
          </Box>
        </Stack>

        <Divider sx={{ mx: 1.5, opacity: 0.5 }} />

        {/* Categories List */}
        <Box sx={{ maxHeight: 240, overflowY: "auto", p: 0.8 }}>
          {categories?.length === 0 && (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                py: 4,
                color: "text.disabled",
                fontSize: "12px",
              }}
            >
              No categories yet
            </Typography>
          )}

          {categories?.map((cat) => (
            <Box
              key={cat.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 1.5,
                py: 1,
                borderRadius: "8px",
                transition: "all 0.15s ease",
                cursor: "default",
                "&:hover": {
                  bgcolor: alpha(theme.palette.action.active, 0.04),
                  "& .action-btns": { opacity: 1 },
                },
              }}
            >
              {/* Dot Indicator */}
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: alpha(theme.palette.primary.main, 0.4),
                  flexShrink: 0,
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  flex: 1,
                  fontSize: "13px",
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {cat.name}
              </Typography>

              {/* Action Buttons (Visible on Hover) */}
              <Stack
                className="action-btns"
                direction="row"
                spacing={0}
                sx={{ opacity: 0, transition: "opacity 0.2s ease" }}
              >
                <CategoryMutationButton mode="edit" category={cat} restaurantId={restaurantId} />
                <DeleteCategoryBtn categoryId={cat.id} restaurantId={restaurantId} />
              </Stack>
            </Box>
          ))}
        </Box>

        {/* Footer Section */}
        {categories?.length > 0 && (
          <>
            <Divider sx={{ mx: 1.5, opacity: 0.5 }} />
            <Box sx={{ px: 2, py: 1 }}>
              <Typography
                sx={{ fontSize: "10px", color: "text.disabled", fontWeight: 600 }}
              >
                {categories.length} sections active
              </Typography>
            </Box>
          </>
        )}
      </Menu>
    </>
  );
};