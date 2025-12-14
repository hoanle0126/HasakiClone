import EmblaCarousel from "@/components/carousel";
import { MuiTheme } from "@/theme";
import { alpha, Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

const topSellData = [
  {
    src: "https://media.hcdn.vn/catalog/category/hsk-cate-sua-rua-mat-c19-250x250_img_250x250_8e0796_fit_center.jpg",
    name: "Sửa rửa mặt",
    sold: "8.921M",
  },
  {
    src: "https://media.hcdn.vn/catalog/category/48_1_img_250x250_8e0796_fit_center.jpg",
    name: "Tẩy trang Mặt",
    sold: "8.921M",
  },
  {
    src: "https://media.hcdn.vn/catalog/category/chong-nang-da-mat-c11_img_250x250_8e0796_fit_center.jpg",
    name: "Chống nắng da mặt",
    sold: "8.921M",
  },
  {
    src: "https://media.hcdn.vn/catalog/category/9_1_img_250x250_8e0796_fit_center.jpg",
    name: "Kem / Gel / Dầu dưỡng",
    sold: "8.921M",
  },
  {
    src: "https://media.hcdn.vn/catalog/category/cover-image-category-serum-tinh-chat-250x250_img_250x250_8e0796_fit_center.jpg",
    name: "Serum / Tinh chất",
    sold: "8.921M",
  },
  {
    src: "https://media.hcdn.vn/catalog/category/mat-na-giay-c31_img_250x250_8e0796_fit_center.jpg",
    name: "Mặt nạ giấy",
    sold: "8.921M",
  },
  {
    src: "https://media.hcdn.vn/catalog/category/1857_1_img_250x250_8e0796_fit_center.jpg",
    name: "Toner / Nước cân bằng da",
    sold: "8.921M",
  },
];

const TopSellSection = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        backgroundColor: "background.paper",
        padding: "16px",
        borderRadius: "16px",
        gap: "8px",
      }}
    >
      <Typography variant="h6" color="primary.main">
        Bán chạy
      </Typography>
      <div className="w-full">
        <EmblaCarousel
          lists={topSellData}
          size={{ xs: 2, sm: 3, md: 4, lg: 6 }}
          spacing="16px"
          options={{
            align: "start",
            loop: true,
          }}
        >
          {(item) => (
            <Box
              sx={{
                border: "1px solid black",
                borderColor: "divider",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                "&:hover": {
                  img: {
                    scale: "120%",
                  },
                },
              }}
            >
              <img src={item.src} alt="" className="duration-300 w-full" />
              <Stack
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                  paddingX: "12px",
                  backgroundColor: alpha(
                    theme.palette.background.paper,
                    0.7
                  ),
                  position: "absolute",
                  zIndex: "50",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                }}
              >
                <Typography variant="captiontext">
                  {item.sold} đã bán
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "100%",
                    }}
                    textAlign="center"
                    textTransform="capitalize"
                  >
                    {item.name}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )}
        </EmblaCarousel>
      </div>
    </Stack>
  );
};

export default TopSellSection;
