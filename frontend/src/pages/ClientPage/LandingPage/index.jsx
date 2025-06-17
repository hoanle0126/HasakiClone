import EmblaCarousel from "@/components/carousel";
import { Box, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";
import BannerSection from "./BannerSection";
import SalesSection from "./SalesSection";
import SubBannerSection from "./SubBannerSection";
import CategoriesSection from "./CategoriesSection";
import BrandSection from "./BrandSection";
import TopSellSection from "./TopSellSection";
import TopSearchSection from "./TopSearchSection";
import ServiceSection from "./ServiceSection";
import ProductSection from "./ProductSection";

const LandingPage = () => {
  return (
    <div>
      <BannerSection />
      <Stack
        sx={{
          backgroundColor: "background.neutral",
          paddingX: "120px",
          gap: "20px",
          paddingY: "20px",
        }}
      >
        <SalesSection />
        <SubBannerSection />
        <CategoriesSection />
        <BrandSection />
        <TopSellSection />
        <TopSearchSection />
        <ServiceSection />
      </Stack>
      <ProductSection />
    </div>
  );
};

export default LandingPage;
