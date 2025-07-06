import {
  Box,
  Stack,
  Typography,
  Grid,
  Breadcrumbs,
  Button,
} from "@mui/material";
import React from "react";
import { MuiTheme } from "@/Theme";
import { Icon } from "@iconify/react";
import CardDataGrid from "./components/CardDataGrid";
import ListAddress from "./components/ListAddress";
import PaymentStep from "./components/PaymentStep";
import { Link } from "react-router-dom";
import CustomTabPanel from "@/components/tabPanel";
import { formatCurrency } from "@/Function/formatCurrency";
import { useSelector } from "react-redux";

export const sumPrice = (products) => {
  return products?.reduce(
    (total, item) => total + item.total_price * item.quantity_cart,
    0
  );
};

const CheckoutPage = () => {
  const { search } = window.location; // Lấy query string hiện tại
  const searchParams = new URLSearchParams(search);
  const { user } = useSelector((store) => store.user);

  return (
    <Stack
      sx={{
        paddingBottom: "90px",
      }}
    >
      <Stack
        sx={{
          paddingX: "120px",
          gap: "4px",
          paddingTop: "8px",
          paddingBottom: "12px",
        }}
      >
        <Breadcrumbs
          separator={
            <Icon icon="solar:alt-arrow-right-linear" width="14" height="14" />
          }
          aria-label="breadcrumb"
          sx={{
            fontStyle: MuiTheme().typography.body2,
          }}
        >
          <Link underline="hover" color="inherit" href="/">
            Trang chủ
          </Link>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            Giỏ hàng
          </Typography>
        </Breadcrumbs>
        <Stack direction="row" gap="8px">
          <Typography variant="h6">Giỏ Hàng</Typography>
          <Typography color="text.secondary" variant="h6" fontWeight={500}>
            (12 Sản phẩm)
          </Typography>
        </Stack>
      </Stack>
      <Grid container paddingX={"120px"} spacing={"32px"}>
        <Grid size={9}>
          <Box>
            {[<CardDataGrid />, <ListAddress />, <PaymentStep />].map(
              (value, index) => (
                <CustomTabPanel
                  tab={searchParams.get("step") || 0}
                  index={index}
                  key={index}
                >
                  {value}
                </CustomTabPanel>
              )
            )}
          </Box>
        </Grid>
        <Grid size={3}>
          <Stack
            sx={{
              borderTop: "2px solid black",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                padding: "8px 12px",
                borderBottomWidth: 1,
                borderColor: "divider",
              }}
            >
              Hóa đơn của bạn
            </Typography>
            <Stack
              sx={{
                gap: "4px",
                padding: "16px 12px",
                borderBottomWidth: 1,
                borderColor: "divider",
              }}
            >
              <Stack
                direction="row"
                width="100%"
                justifyContent="space-between"
              >
                <Typography variant="body2">Tạm tính:</Typography>
                <Typography variant="body2">
                  {formatCurrency(sumPrice(user.cart))}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                width="100%"
                justifyContent="space-between"
              >
                <Typography variant="body2">Giảm giá:</Typography>
                <Typography variant="body2">{formatCurrency(0)}</Typography>
              </Stack>
            </Stack>
            <Stack
              sx={{
                gap: "4px",
                padding: "8px 12px",
              }}
            >
              <Stack
                direction="row"
                width="100%"
                justifyContent="space-between"
              >
                <Typography variant="body2">Tạm tính:</Typography>
                <Typography variant="body2">
                  {formatCurrency(sumPrice(user.cart))}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                (Đã bao gồm VAT)
              </Typography>
            </Stack>
            <Button color="secondary" variant="contained" size="large">
              Tiến hành đặt hàng
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CheckoutPage;
