"use client";
import { useRestaurants } from "@/features/restaurant/get-restaurants/api/useRestaurants";
import { CategoriesSection } from "@/widgets/homePage/CategoriesSection";
import { HeroSection } from "@/widgets/homePage/HeroSection";
import { RestaurantList } from "@/widgets/homePage/RestaurantGrid";
import { Box, Container, Typography } from "@mui/material";
import { useRef, useState } from "react";

export default function HomePage() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    setCity(cityInput);
    // بعد ما نحدث المدينة، ننزل لنتائج المطاعم
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // الهوك تبعك (useRestaurants) بياخد الـ city والـ category
  const { data: restaurants, isLoading } = useRestaurants(city);

  return (
    <>
      <HeroSection
        city={cityInput}
        setCity={setCityInput}
        onSearch={handleSearch}
      />
      <CategoriesSection onCategorySelect={(cat) => setCategory(cat)} />
      <Box
        ref={resultsRef}
        sx={{
          scrollMarginTop: "100px", // مسافة عشان ما يلزق بالنافبار فوق
          minHeight: "50vh", // عشان نضمن مساحة للنزول
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" mb={3}>
            المطاعم المتاحة
          </Typography>

          {/* قائمة المطاعم */}
          <RestaurantList restaurants={restaurants} isLoading={isLoading} />

          {/* الباجينيشن */}
          {/* <PaginationSection /> */}
        </Container>
      </Box>
    </>
  );
}
