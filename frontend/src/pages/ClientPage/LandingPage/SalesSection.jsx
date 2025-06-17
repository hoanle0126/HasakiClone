import { Box, Stack, Typography } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";

const SalesSection = () => {
  const [listSalesRef] = useEmblaCarousel();

  return (
    <Stack
      sx={{
        backgroundColor: "secondary.main",
        borderRadius: "12px",
        padding: "16px",
        gap: "12px",
      }}
    >
      <Typography variant="captiontext" color="grey.0" className="px-[8px]">
        Deals đã hết hạn
      </Typography>
      <section className="embla">
        <div className="embla__viewport" ref={listSalesRef}>
          <div className="embla__container">
            {[
              {
                name: "Sửa rửa mặt CareVe sạch sâu cho da thường đến da dầu",
                price: "475.000",
                thumbnail:
                  "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_8nKWafg44EnaoHMA_img_220x220_0dff4c_fit_center.png",
                sales: "324.000",
                quantity: "100",
                stock: "58",
              },
              {
                name: "Sửa rửa mặt CareVe sạch sâu cho da thường đến da dầu",
                price: "475.000",
                thumbnail:
                  "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_8nKWafg44EnaoHMA_img_220x220_0dff4c_fit_center.png",
                sales: "324.000",
                quantity: "100",
                stock: "58",
              },
              {
                name: "Sửa rửa mặt CareVe sạch sâu cho da thường đến da dầu",
                price: "475.000",
                thumbnail:
                  "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_8nKWafg44EnaoHMA_img_220x220_0dff4c_fit_center.png",
                sales: "324.000",
                quantity: "100",
                stock: "58",
              },
              {
                name: "Sửa rửa mặt CareVe sạch sâu cho da thường đến da dầu",
                price: "475.000",
                thumbnail:
                  "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_8nKWafg44EnaoHMA_img_220x220_0dff4c_fit_center.png",
                sales: "324.000",
                quantity: "100",
                stock: "58",
              },
              {
                name: "Sửa rửa mặt CareVe sạch sâu cho da thường đến da dầu",
                price: "475.000",
                thumbnail:
                  "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_8nKWafg44EnaoHMA_img_220x220_0dff4c_fit_center.png",
                sales: "324.000",
                quantity: "100",
                stock: "58",
              },
              {
                name: "Sửa rửa mặt CareVe sạch sâu cho da thường đến da dầu",
                price: "475.000",
                thumbnail:
                  "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_8nKWafg44EnaoHMA_img_220x220_0dff4c_fit_center.png",
                sales: "324.000",
                quantity: "100",
                stock: "58",
              },
              {
                name: "Sửa rửa mặt CareVe sạch sâu cho da thường đến da dầu",
                price: "475.000",
                thumbnail:
                  "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_8nKWafg44EnaoHMA_img_220x220_0dff4c_fit_center.png",
                sales: "324.000",
                quantity: "100",
                stock: "58",
              },
              {
                name: "Sửa rửa mặt CareVe sạch sâu cho da thường đến da dầu",
                price: "475.000",
                thumbnail:
                  "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_8nKWafg44EnaoHMA_img_220x220_0dff4c_fit_center.png",
                sales: "324.000",
                quantity: "100",
                stock: "58",
              },
              {
                name: "Sửa rửa mặt CareVe sạch sâu cho da thường đến da dầu",
                price: "475.000",
                thumbnail:
                  "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_8nKWafg44EnaoHMA_img_220x220_0dff4c_fit_center.png",
                sales: "324.000",
                quantity: "100",
                stock: "58",
              },
            ].map((item, index) => (
              <Box
                sx={{
                  paddingLeft: "16px",
                  flex: "0 0 calc(100% / 5)",
                }}
                key={index}
              >
                <Stack
                  sx={{
                    backgroundColor: "background.paper",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="aspect-square w-full"
                  />
                  <Stack
                    sx={{
                      padding: "8px",
                      width: "100%",
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="subtitle1"
                        className="break-all"
                        color="secondary.main"
                      >
                        {item.sales}đ
                      </Typography>
                      <Typography variant="body2" color="text.disabled">
                        {item.price}đ
                      </Typography>
                    </Stack>
                    <Typography variant="body2" textTransform="capitalize">
                      {item.name}
                    </Typography>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      bgcolor="secondary.light"
                      borderRadius={"20px"}
                      position="relative"
                      overflow="hidden"
                      marginTop="8px"
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          height: "100%",
                          width:
                            Number((item.stock / item.quantity) * 100) + "%",
                          backgroundColor: "secondary.main",
                          top: 0,
                          left: 0,
                          zIndex: 0,
                          borderRadius: "20px",
                        }}
                      ></Box>
                      <Typography
                        variant="captiontext"
                        color="grey.0"
                        zIndex={1}
                      >
                        {Number((item.stock / item.quantity) * 100).toFixed(0)}%
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </div>
        </div>
      </section>
    </Stack>
  );
};

export default SalesSection;
