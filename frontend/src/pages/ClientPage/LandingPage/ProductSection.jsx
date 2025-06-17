import { MuiTheme } from "@/theme";
import { Icon } from "@iconify/react";
import {
  alpha,
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";

const ProductSection = () => {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Stack>
      <Stack
        direction="row"
        gap="12px"
        bgcolor="background.neutral"
        paddingX="120px"
      >
        {[
          {
            icon: "https://media.hcdn.vn/hsk/icon/v4/for_you.png",
            title: "Gợi ý cho bạn",
            value: 0,
          },
          {
            icon: "https://media.hcdn.vn/hsk/icon/v4/nowfree.png",
            title: "Giao 2h",
            value: 1,
          },
        ].map((item, index) => (
          <Stack
            onClick={() => setTabValue(item.value)}
            key={index}
            alignItems="center"
            gap="4px"
            padding="12px 40px"
            bgcolor={tabValue === item.value && "background.paper"}
            sx={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              border: "1px solid black",
              borderColor: tabValue === item.value ? "divider" : "transparent",
              borderBottomWidth: "2px",
              borderBottomColor:
                tabValue === item.value ? "secondary.main" : "transparent",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "background.paper",
                borderBottomColor: "secondary.main",
              },
            }}
          >
            <img src={item.icon} alt="" className="size-[50px]" />
            <Typography variant="body1">{item.title}</Typography>
          </Stack>
        ))}
      </Stack>
      <Stack
        sx={{
          borderTop: "1px solid black",
          borderTopColor: "divider",
          paddingX: "120px",
          paddingY: "16px",
        }}
      >
        <Grid container spacing="16px">
          {[
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
            {
              name: "sửa rửa mặt ceraVe sạch foaming cleanser",
              present: "Tặng sửa rửa mặt seraVe sạch sâu",
              sales: 35,
              price: 475000,
              brand: "CeraVe",
              rating: 4.9,
              reviews: 98,
              quantity: 10000,
              remain: 9300,
              sold: 1804,
              service:
                "Bill Cerave 349K Tặng Gối tốt nghiệp trị giá 200K (SL có hạn)",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_BdS1vbQTVzkxc2iN_img_220x220_0dff4c_fit_center.png",
            },
          ].map((item, index) => (
            <Grid size={2} key={index}>
              <Stack
                sx={{
                  borderWidth: "1px",
                  borderColor: "divider",
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <img src={item.thumbnail} alt="" />
                  <Stack
                    sx={{
                      width: "60%",
                      position: "absolute",
                      bottom: 0,
                      backgroundColor: "background.neutral",
                      padding: "4px 8px",
                      color: "secondary.main",
                      left: "8px",
                    }}
                  >
                    <Typography variant="captiontext">
                      {item.present}
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      position: "absolute",
                      top: 0,
                      backgroundColor: alpha(
                        MuiTheme().palette.secondary.main,
                        0.7
                      ),
                      padding: "4px 8px",
                      color: "grey.0",
                      right: 0,
                      borderBottomLeftRadius: "12px",
                    }}
                  >
                    <Typography variant="captiontext">{item.sales}%</Typography>
                  </Stack>
                </Box>
                <Stack
                  sx={{
                    padding: "8px",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1" color="secondary.main">
                      {Number(
                        item.price - (item.price * item.sales) / 100
                      ).toLocaleString("vi-VN")}
                      đ
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.disabled"
                      sx={{
                        textDecoration: "line-through",
                      }}
                    >
                      {item.price.toLocaleString("vi-VN")}đ
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2" color="primary.main">
                    {item.brand}
                  </Typography>
                  <Typography variant="body2" textTransform="capitalize">
                    {item.name}
                  </Typography>
                  <Stack direction="row" gap="8px" alignItems="center">
                    <Stack
                      direction="row"
                      color="grey.0"
                      alignItems="center"
                      gap="4px"
                      bgcolor="secondary.main"
                      justifyContent="start"
                      padding="2px 4px"
                      borderRadius="4px"
                    >
                      <Typography variant="captiontext">
                        {" "}
                        {item.rating}
                      </Typography>
                      <Icon icon="solar:star-bold" width="10" height="10" />
                    </Stack>
                    <Typography variant="captiontext">
                      ({item.reviews})
                    </Typography>
                    <div className="flex-1"></div>
                    <Stack direction="row" alignItems="center" gap="4px">
                      <Icon
                        icon="solar:cart-large-4-linear"
                        width="16"
                        height="16"
                      />
                      <Typography variant="captiontext">{item.sold}</Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" gap="12px" alignItems="center">
                    <LinearProgress
                      value={98}
                      variant="determinate"
                      color="secondary"
                      sx={{
                        borderRadius: "20px",
                        marginTop: "4px",
                        height: "8px",
                        flex: 1,
                      }}
                    />
                    <Typography variant="body2" color="secondary.main">
                      {(item.remain / item.quantity) * 100}%
                    </Typography>
                  </Stack>
                  <Typography
                    variant="captiontext"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "100%",
                      color: "secondary.main",
                      padding: "2px 8px",
                      borderRadius: "8px",
                      borderStyle: "dashed",
                      borderWidth: 1,
                    }}
                  >
                    {item.service}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Stack alignItems="center" marginTop="20px">
          <Button
            variant="outlined"
            size="large"
            sx={{
              textTransform: "capitalize",
              padding: "8px 40px",
              borderRadius: "20px",
              fontWeight: 600,
            }}
          >
            Xem Thêm
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductSection;
