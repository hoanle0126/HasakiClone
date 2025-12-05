import React from "react";
import BannerSection from "./BannerSection";
import SalesSection from "./SalesSection";
import { Box, Stack } from "@mui/material";
import SubBannerSection from "./SubBannerSection";
import CategoriesSection from "./CategoriesSection";
import BrandSection from "./BrandSection";
import TopSellSection from "./TopSellSection";
import ServiceSection from "./ServiceSection";
import TopSearchSection from "./TopSearchSection";
import ProductSection from "./ProductSection";
import socket from "@/socket";

const LandingPage = () => {
  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    socket.on("ping-from-server", (data) => {
      console.log("Server ping:", data);
    });

    socket.on("message", (msg) => {
      console.log("New message from socket:", msg);
    });

    return () => {
      socket.off("connect");
      socket.off("ping-from-server");
    };
  }, []);
  return (
    <div>
      {/* <BannerSection /> */}
      <Stack
        sx={{
          paddingX: "120px",
          paddingY: "20px",
          gap: "20px",
          backgroundColor: "background.neutral",
        }}
      >
        <SubBannerSection />
        <CategoriesSection />
        <BrandSection />
        <TopSellSection />
      </Stack>
      <ProductSection />
    </div>
  );
};

export default LandingPage;
