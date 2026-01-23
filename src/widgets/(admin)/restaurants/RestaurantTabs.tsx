"use client";
import { Tabs, Tab } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export const RestaurantTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "info";

  const handleChange = (_: any, value: string) => {
    router.push(`?tab=${value}`);
  };

  return (
    <Tabs value={tab} onChange={handleChange} sx={{ mb: 4 }}>
      <Tab value="info" label="معلومات المطعم" />
      <Tab value="menu" label="المنيو" />
    </Tabs>
  );
};
