"use client";

import { Box } from "@mui/material";
import CustomerNavbar from "@/widgets/(customer)/navbar/CustomerNavbar"; 

export default function CustomerLayout ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Navbar فقط للزبون */}
        <CustomerNavbar />

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
    </>
  );
};
