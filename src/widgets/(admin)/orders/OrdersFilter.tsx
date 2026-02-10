// src/widgets/(admin)/orders/OrdersFilters.tsx
"use client";

import { TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import { Search, Filter } from "lucide-react";

type Props = {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export function OrdersFilters({ search, status, onSearchChange, onStatusChange }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { sm: "center" },
        gap: 2,
        mb: 2,
      }}
    >
      {/* Search */}
      <TextField
        placeholder="Search by customer or order ID..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        sx={{ flex: 1, maxWidth: 360 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={16} />
            </InputAdornment>
          ),
        }}
      />

      {/* Status Filter */}
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel id="status-filter-label">Filter by status</InputLabel>
        <Select
          labelId="status-filter-label"
          value={status}
          label="Filter by status"
          onChange={(e) => onStatusChange(e.target.value)}
          startAdornment={<Filter size={16} />}
        >
          <MenuItem value="all">All Orders</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="preparing">Preparing</MenuItem>
          <MenuItem value="ready">Ready</MenuItem>
          <MenuItem value="out_for_delivery">On the Way</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
