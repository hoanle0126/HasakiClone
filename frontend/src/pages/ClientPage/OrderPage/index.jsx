import styled from "@emotion/styled";
import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Stack,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  Typography,
  Grid,
  Breadcrumbs,
  useMediaQuery,
  TextField,
} from "@mui/material";
import React from "react";
import { MuiTheme } from "@/Theme";
import { Icon } from "@iconify/react";
import CardDataGrid from "./components/CardDataGrid";
import ListAddress from "./components/ListAddress";
import PaymentStep from "./components/PaymentStep";
import { formatCurrency } from "@/Function/formatCurrency";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SuccessModal from "./components/SuccessModal";
import { useStateContext } from "@/Context";
import formatPhoneNumber from "@/Function/formatPhoneNumber";
import { axiosClient } from "@/axios/axiosClient";
import CustomTabPanel from "@/components/tabPanel";
import { useTranslation } from "react-i18next";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.dark,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.dark,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.background.neutral,
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.background.neutral,
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: theme.palette.primary.dark,
  }),
  "& .QontoStepIcon-completedIcon": {
    color: theme.palette.primary.dark,
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <div className="QontoStepIcon-circle" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const steps = ["Cart", "Billing & address", "Payment"];

export const sumPrice = (products) => {
  return products?.reduce(
    (total, item) => total + item.price * item.quantity_cart,
    0
  );
};

export const sumPriceSales = (products) => {
  return products?.reduce((total, item) => {
    return total + item.sales * item.quantity_cart;
  }, 0);
};

export const sumMass = (products) => {
  return products?.reduce(
    (total, item) => total + item.mass * item.quantity_cart,
    0
  );
};

export const getShippingPrice = (products) => {
  const totalMass = products?.reduce(
    (total, item) => total + item.mass * item.quantity_cart,
    0
  );
  if (totalMass < 6) {
    return 7.5;
  } else if (totalMass > 9) {
    return 25.5;
  } else {
    return 15.5;
  }
};

const OrderClientPage = () => {
  const { search } = window.location; // Lấy query string hiện tại
  const searchParams = new URLSearchParams(search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderState = useSelector((store) => store.orders);
  const { cart, setCart } = useStateContext();
  const [successModal, setSuccessModal] = React.useState(false);
  const [payments, setPayments] = React.useState(null);
  const [card, setCard] = React.useState(null);
  const upSm = useMediaQuery(MuiTheme().breakpoints.up("sm"));
  const { t } = useTranslation();

  React.useEffect(() => {
    const loadSquare = async () => {
      if (!window.Square) {
        console.error("Square SDK chưa được tải.");
        return;
      }

      try {
        const paymentsInstance = window.Square.payments(
          import.meta.env.VITE_SQUARE_APPLICATION_ID,
          import.meta.env.VITE_SQUARE_LOCATION_ID
        );

        setPayments(paymentsInstance);

        const cardInstance = await paymentsInstance.card();
        await cardInstance.attach("#card-container");
        setCard(cardInstance);
      } catch (error) {
        console.error("Square Payments failed to load", error);
      }
    };

    loadSquare();
  }, []);

  const handlePayment = async (paymentAmount) => {
    // if (!card) return;
    // try {
    //   const result = await card.tokenize();
    //   if (result.status === "OK") {
    //     const paymentData = {
    //       token: result.token,
    //       amount: paymentAmount, // đơn vị: cent
    //       currency: "USD",
    //       name: cart.address.first_name + " " + cart.address.last_name,
    //       email: cart.address.email,
    //       phone: cart.address.phone,
    //       products: cart.products,
    //       sub_total: sumPrice(cart.products),
    //       tax:
    //         ((sumPriceSales(cart.products) + getShippingPrice(cart?.products)) *
    //           cart.address.state.tax) /
    //         100,
    //       tax_percent: cart.address.state.tax,
    //       discount: sumPrice(cart.products) - sumPriceSales(cart.products),
    //       total:
    //         sumPriceSales(cart.products) +
    //         getShippingPrice(cart?.products) +
    //         ((sumPriceSales(cart.products) + getShippingPrice(cart?.products)) *
    //           cart.address.state.tax) /
    //           100,
    //       address: {
    //         address_line_1: cart.address.street_address1,
    //         address_line_2: cart.address?.street_address2,
    //         locality: cart.address.city,
    //         state: cart.address.state.title,
    //         postal_code: cart.address.zip,
    //         country: "US",
    //       },
    //     };
    //     const response = await axios.post(
    //       `${import.meta.env.VITE_BACKEND_URL}/api/payments`,
    //       paymentData,
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     // ✅ Nếu thanh toán thành công
    //     if (response.data.status === "success") {
    //       dispatch(addNewOrder(cart));
    //       setSuccessModal(true);
    //     }
    //   } else {
    //     toast.error("Payment failed! Please check your account and try again!");
    //   }
    // } catch (error) {
    //   console.error("Payment failed", error.response);
    //   toast.error("Payment failed! Please check your account and try again!");
    // }
  };

  const applyCode = async (id) => {
    try {
      const response = await axiosClient.get("/codes/" + id);
      console.log(response.data);
      if (response.data) {
        setCart({
          ...cart,
          code: {
            code: "",
            value: response.data.value,
          },
        });
      } else {
        // toast.error("Wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack
      sx={{
        minHeight: "100vh",
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
          </Stack>
        </Grid>
      </Grid>
      <SuccessModal open={successModal} />
    </Stack>
  );
};

export default OrderClientPage;
