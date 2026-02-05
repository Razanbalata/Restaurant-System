"use client";

import {
  Box,
} from "@mui/material";
import { HowItWorksSection } from "./HowItWorksSection";
import { Testimonials } from "./Testimonials";
import { Pricing } from "./Pricing"; 
import CTASection from "./CTASection";
import Footer from "./Footer";
import { HeroSection } from "./HeroSection";
import { Features } from "./FeaturesSection";

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Features />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing */}
      <Pricing />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </Box>
  );
}
