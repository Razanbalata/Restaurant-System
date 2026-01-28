"use client";
import {
  Box,
  InputBase,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchData } from "@/shared/config/useSearchData";

export const SearchBar = () => {
  const theme = useTheme();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false); // حالة ظهور القائمة
  const ref = useRef<HTMLDivElement>(null);
  const { user, admin, customer } = useSearchData();

  const data = user?.role === "restaurant_owner" ? admin : customer;
  console.log(data);
 const results = useMemo(() => {
    if (!query || !data) return []; // تأكد أن data موجودة أولاً

    const q = query.toLowerCase();

// نستخدم (data as any) لإخبار المحرك أننا نعرف ما نفعله وأن الحقول قد تكون موجودة أو لا
const restaurants = Array.isArray((data as any)?.restaurants) ? (data as any).restaurants : [];
const menuItems = Array.isArray((data as any)?.menuItems) ? (data as any).menuItems : [];
const orders = Array.isArray((data as any)?.orders) ? (data as any).orders : [];
const categories = Array.isArray((data as any)?.categories) ? (data as any).categories : [];


   const allItems = [
  ...restaurants.map((r: any) => ({ type: "مطعم", name: r.name, id: r.id })),
  ...menuItems.map((m: any) => ({ type: "وجبة", name: m.name, id: m.id })),
  ...orders.map((o: any) => ({ type: "طلب", name: `طلب #${o.id}`, id: o.id })),
  ...categories.map((c: any) => ({ type: "تصنيف", name: c.name, id: c.id })),
];

    return allItems.filter((item) => item.name?.toLowerCase().includes(q));
  }, [query, data]);

  // ✅ لإغلاق القائمة عند الضغط خارج المكون
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box ref={ref} sx={{ width: "100%", maxWidth: 600, mx: "auto", position: "relative" }}>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          borderRadius: 2,
          bgcolor: theme.palette.background.paper,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <InputBase
          placeholder="ابحث عن مطعم، وجبة، طلب أو تصنيف..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true); // تفتح القائمة عند الكتابة
          }}
          fullWidth
          sx={{ fontSize: "0.95rem" }}
        />
      </Paper>

      {open && query && (
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 0.5,
            borderRadius: 2,
            maxHeight: 400,
            overflowY: "auto",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 10,
          }}
        >
          <List disablePadding>
            {results.map((item) => (
              <ListItemButton
                key={`${item.type}-${item.id}`}
                sx={{
                  px: 3,
                  py: 1.5,
                  "&:hover": { bgcolor: theme.palette.action.hover },
                }}
              >
                <ListItemText
                  primary={item.name}
                  secondary={item.type}
                  primaryTypographyProps={{ fontWeight: 700 }}
                  secondaryTypographyProps={{
                    fontSize: "0.75rem",
                    color: theme.palette.text.secondary,
                  }}
                />
              </ListItemButton>
            ))}

            {results.length === 0 && (
              <Box sx={{ px: 3, py: 2 }}>
                <Typography color="text.secondary" textAlign="center">
                  لا توجد نتائج مطابقة
                </Typography>
              </Box>
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
};
