import { MuiTheme } from "@/theme";
import { alpha, Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const TopSearchSection = () => {

  return (
    <Stack
      sx={{
        gap: "8px",
      }}
    >
      <Typography variant="h6" color="primary.main">
        Top Tìm kiếm
      </Typography>
      <Grid container spacing="20px">
        {[
          {
            name: "Kem chống nắng",
            thumbnail:
              "https://hasaki.vn/img/category/cate-chong-nang-da-mat.jpg",
            images: [
              "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-253900006-1695973833_img_105x105_c13de2_fit_center.jpg",
              "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-kem-chong-nang-l-oreal-paris-x20-thoang-da-mong-nhe-50ml-1738898716_img_105x105_c13de2_fit_center.jpg",
            ],
            quantity: "408",
          },
          {
            name: "Kem chống nắng",
            thumbnail:
              "https://hasaki.vn/img/category/cate-chong-nang-da-mat.jpg",
            images: [
              "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-253900006-1695973833_img_105x105_c13de2_fit_center.jpg",
              "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-kem-chong-nang-l-oreal-paris-x20-thoang-da-mong-nhe-50ml-1738898716_img_105x105_c13de2_fit_center.jpg",
            ],
            quantity: "408",
          },
          {
            name: "Kem chống nắng",
            thumbnail:
              "https://hasaki.vn/img/category/cate-chong-nang-da-mat.jpg",
            images: [
              "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-253900006-1695973833_img_105x105_c13de2_fit_center.jpg",
              "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-kem-chong-nang-l-oreal-paris-x20-thoang-da-mong-nhe-50ml-1738898716_img_105x105_c13de2_fit_center.jpg",
            ],
            quantity: "408",
          },
          {
            name: "Kem chống nắng",
            thumbnail:
              "https://hasaki.vn/img/category/cate-chong-nang-da-mat.jpg",
            images: [
              "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-253900006-1695973833_img_105x105_c13de2_fit_center.jpg",
              "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-kem-chong-nang-l-oreal-paris-x20-thoang-da-mong-nhe-50ml-1738898716_img_105x105_c13de2_fit_center.jpg",
            ],
            quantity: "408",
          },
        ].map((item, index) => (
          <Grid size={3} key={index}>
            <Stack
              sx={{
                width: "100%",
                flexDirection: "row",
                backgroundColor: "background.paper",
                borderRadius: "16px",
                boxShadow: "custom.card",
                overflow: "hidden",
                height: "210px",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <img
                  src={item.thumbnail}
                  alt=""
                  className="aspect-square size-full"
                />
                <Stack
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    paddingLeft:"12px",
                    paddingY:"4px",
                    zIndex: 100,
                    width: "100%",
                    backgroundColor: alpha(
                      MuiTheme().palette.background.paper,
                      0.9
                    ),
                  }}
                >
                  <Typography variant="body2">{item.name}</Typography>
                  <Typography variant="captiontext" color="text.secondary">
                    {item.quantity} sản phẩm
                  </Typography>
                </Stack>
              </Box>
              <Stack
                sx={{
                  height: "100%",
                  flex: 1,
                  img: {
                    borderLeft: "1px solid black",
                    borderColor: "divider",
                    "&:first-child": {
                      borderBottomWidth: "1px",
                    },
                  },
                }}
              >
                {item.images.map((img, idx) => (
                  <img key={idx} src={img} alt="" className="flex-1" />
                ))}
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default TopSearchSection;
