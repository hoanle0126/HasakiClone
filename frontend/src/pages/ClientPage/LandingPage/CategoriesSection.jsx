import { Stack, Typography } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";

const CategoriesSection = () => {
  const [listCategoriesRef] = useEmblaCarousel();

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
        Danh mục
      </Typography>
      <section className="embla" ref={listCategoriesRef}>
        <div className="embla__viewport">
          <div className="embla__container">
            {[
              {
                name: "Trang điểm môi",
                thumbnail:
                  "https://media.hcdn.vn/catalog/category/c24-trang-diem-moi_img_120x120_17b03c_fit_center.jpg",
                color: "#F1F1F5",
              },
              {
                name: "Trang điểm môi",
                thumbnail:
                  "https://media.hcdn.vn/catalog/category/c24-trang-diem-moi_img_120x120_17b03c_fit_center.jpg",
                color: "#F1F1F5",
              },
              {
                name: "Trang điểm môi",
                thumbnail:
                  "https://media.hcdn.vn/catalog/category/c24-trang-diem-moi_img_120x120_17b03c_fit_center.jpg",
                color: "#F1F1F5",
              },
              {
                name: "Trang điểm môi",
                thumbnail:
                  "https://media.hcdn.vn/catalog/category/c24-trang-diem-moi_img_120x120_17b03c_fit_center.jpg",
                color: "#F1F1F5",
              },
              {
                name: "Trang điểm môi",
                thumbnail:
                  "https://media.hcdn.vn/catalog/category/c24-trang-diem-moi_img_120x120_17b03c_fit_center.jpg",
                color: "#F1F1F5",
              },
              {
                name: "Trang điểm môi",
                thumbnail:
                  "https://media.hcdn.vn/catalog/category/c24-trang-diem-moi_img_120x120_17b03c_fit_center.jpg",
                color: "#F1F1F5",
              },
              {
                name: "Trang điểm môi",
                thumbnail:
                  "https://media.hcdn.vn/catalog/category/c24-trang-diem-moi_img_120x120_17b03c_fit_center.jpg",
                color: "#F1F1F5",
              },
              {
                name: "Trang điểm môi",
                thumbnail:
                  "https://media.hcdn.vn/catalog/category/c24-trang-diem-moi_img_120x120_17b03c_fit_center.jpg",
                color: "#F1F1F5",
              },
              {
                name: "Trang điểm môi",
                thumbnail:
                  "https://media.hcdn.vn/catalog/category/c24-trang-diem-moi_img_120x120_17b03c_fit_center.jpg",
                color: "#F1F1F5",
              },
              {
                name: "Trang điểm môi",
                thumbnail:
                  "https://media.hcdn.vn/catalog/category/c24-trang-diem-moi_img_120x120_17b03c_fit_center.jpg",
                color: "#F1F1F5",
              },
              {
                name: "Trang điểm môi",
                thumbnail:
                  "https://media.hcdn.vn/catalog/category/c24-trang-diem-moi_img_120x120_17b03c_fit_center.jpg",
                color: "#F1F1F5",
              },
            ].map((item, index) => (
              <Stack
                sx={{
                  flex: "0 0 calc(100%/8)",
                  paddingLeft: "16px",
                }}
                key={index}
              >
                <Stack
                  sx={{
                    padding: "8px",
                    backgroundColor: item.color,
                    borderRadius: "8px",
                    gap: "8px",
                    paddingBottom: "16px",
                  }}
                >
                  <img src={item.thumbnail} alt="" />
                  <Typography textAlign="center" variant="body1">
                    {item.name}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </div>
        </div>
      </section>
    </Stack>
  );
};

export default CategoriesSection;
