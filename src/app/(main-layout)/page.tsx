
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@mui/material";
import { useMe } from "@/features/user/api/use-me";
import { LandingPageSkeleton } from "@/shared/ui/Skeletons/LandingPageSkeleton";
import HomePage from "@/widgets/homePage/Home"; 
export default function LandingPage() {
  const router = useRouter();
  const { data: user, isLoading } = useMe();

  useEffect(() => {
    if (user) router.replace("/shared/dashboard");
  }, [user, router]);

  if (isLoading) {
    return <LandingPageSkeleton />;
  }

  return (
    <Container maxWidth={false} disableGutters>
      <HomePage/>
    </Container>
  );
}
