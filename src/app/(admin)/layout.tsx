"use client";

import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import { Sidebar } from "@/widgets/(admin)/dashboard/Sidebar";
import TopNav from "@/widgets/(admin)/dashboard/TopNav";
import { RestaurantProvider } from "../providers/RestaurantContext";

const SIDEBAR_WIDTH = 260;
const SIDEBAR_COLLAPSED = 80;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      <RestaurantProvider>
        {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          // ml: sidebarOpen ? `${SIDEBAR_WIDTH}px` : `${SIDEBAR_COLLAPSED}px`,
          transition: "margin-left 0.3s ease",
        }}
      >
        <TopNav onMenuClick={() => setSidebarOpen((prev) => !prev)} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: { xs: 2, md: 4 },
            bgcolor: "background.default",
          }}
        >
          {children}
        </Box>
      </Box>
      </RestaurantProvider>
    </Box>
  );
}
