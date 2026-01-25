
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@mui/material";
import { useMe } from "@/features/user/api/use-me";
import HeroSection from "@/widgets/(customer)/homePage/HeroSection"; 
import RoleSelectionSection from "@/widgets/(customer)/homePage/RoleSelectionSection"; 
import HowItWorksSection from "@/widgets/(customer)/homePage/HowItWorksSection"; 
import CTASection from "@/widgets/(customer)/homePage/CTASection"; 
import { LandingPageSkeleton } from "@/shared/ui/Skeletons/LandingPageSkeleton";

export default function LandingPage() {
  const router = useRouter();
  const { data: user, isLoading } = useMe();

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  if (isLoading) {
    return <LandingPageSkeleton />;
  }

  return (
    <Container maxWidth={false} disableGutters>
      <HeroSection />
      <RoleSelectionSection />
      <HowItWorksSection />
      <CTASection />
    </Container>
  );
}
