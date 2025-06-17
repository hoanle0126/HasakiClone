import { Box, Grid, Stack, Typography } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";

const BrandSection = () => {
  const [listImageRef] = useEmblaCarousel();

  return (
    <Stack
      sx={{
        backgroundColor: "background.paper",
        padding: "16px",
        borderRadius: "16px",
        gap: "8px",
      }}
    >
      <Typography variant="h6" color="primary.main">Thương hiệu</Typography>
      <Grid container spacing="16px">
        <Grid size={4}>
          <section className="embla">
            <div className="embla__viewport " ref={listImageRef}>
              <div className="embla__container">
                {[
                  {
                    src: "https://media.hcdn.vn/hsk/1749788764popbio1306_img_410x410_8c5088_fit_center.jpg",
                  },
                  {
                    src: "https://media.hcdn.vn/hsk/1749788863popbulsan1306_img_410x410_8c5088_fit_center.jpg",
                  },
                ].map((item, index) => (
                  <Box
                    sx={{
                      flex: "0 0 100%",
                      paddingLeft: 0,
                      borderRadius: "16px",
                      overflow: "hidden",
                    }}
                    key={index}
                  >
                    <img className="size-full" key={index} src={item.src} />
                  </Box>
                ))}
              </div>
            </div>
          </section>
        </Grid>
        <Grid size={8}>
          <Grid container spacing="16px">
            {[
              {
                src: "https://media.hcdn.vn//hsk/brandL-oreal-cover-brand-500x500-190920241726736320_img_190x190_30c310_fit_center.jpg",
                brandSrc: "https://media.hcdn.vn/brand/1625111472loreal.jpg",
              },
              {
                src: "https://media.hcdn.vn//hsk/brandcocoon-image-cover-500x5001712401401_img_190x190_30c310_fit_center.jpg",
                brandSrc: "https://media.hcdn.vn/brand/1593168007the-coc.jpg",
              },
              {
                src: "https://media.hcdn.vn//hsk/brandDove-image-cover-500x500---200120251737360064_img_190x190_30c310_fit_center.jpg",
                brandSrc: "https://media.hcdn.vn//hsk/branddove-logo1736734394.jpg",
              },
              {
                src: "https://media.hcdn.vn//hsk/brandBioderma-cover-brand-500x500---220420251745305521_img_190x190_30c310_fit_center.jpg",
                brandSrc: "https://media.hcdn.vn//hsk/brandbiodermai-logo-400x2001745296534.jpg",
              },
              {
                src: "https://media.hcdn.vn//hsk/brandLRP-image-cover-500x500---070520251746606519_img_190x190_30c310_fit_center.png",
                brandSrc: "https://media.hcdn.vn//hsk/brandLa-roche-posay-logo1690281599.jpg",
              },
              {
                src: "https://media.hcdn.vn//hsk/brandbrandbrandvaseline-cover-brand-test-beta-500x500---14042025174461143417446154571749699948_img_190x190_30c310_fit_center.jpg",
                brandSrc: "https://media.hcdn.vn//hsk/brandbrandvaseline-logo1702365539-test-beta1749699948.jpg",
              },
              {
                src: "https://media.hcdn.vn//hsk/brandCerave-cover-brand-500x500---090420251744168429_img_190x190_30c310_fit_center.jpg",
                brandSrc: "https://media.hcdn.vn/brand/1661313898ce.jpg",
              },
              {
                src: "https://media.hcdn.vn//hsk/brandNarisCosmeticsimage-cover500x5001715596352_img_190x190_30c310_fit_center.jpg",
                brandSrc: "https://media.hcdn.vn//hsk/brandnaris-cosmetics-logo1716963318.jpg",
              },
            ].map((item, index) => (
              <Grid size={3} key={index}>
                <Box
                  sx={{
                    width: "100%",
                    position: "relative",
                    boxShadow: "custom.card",
                    borderRadius: "16px",
                    overflow: "hidden",
                    "&:hover": {
                      boxShadow: "none",
                      border:"1px solid black",
                      borderColor:"grey.0",
                      "& .sub__img": {
                        border: "1px solid black",
                        borderColor: "secondary.main",
                      },
                    },
                  }}
                >
                  <img src={item.src} className="w-full" />
                  <img
                    src={item.brandSrc}
                    className="sub__img absolute z-[100] bottom-[8px] left-[50%] -translate-x-[50%] w-[110px] h-[55px] rounded-[16px]"
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default BrandSection;
