import { MuiTheme } from "@/Theme";
import { Icon } from "@iconify/react";
import {
  Box,
  ButtonBase,
  Stack,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React from "react";
import { useStateContext } from "../../../../../Context";
import { useTranslation } from "react-i18next";

const PaymentStep = () => {
  const { cart, setCart } = useStateContext();
  const { t } = useTranslation();

  return (
    <Stack gap={"32px"}>
      <Box
        sx={{
          borderRadius: "16px",
          boxShadow: "custom.card",
          padding: "24px",
          backgroundColor:
            MuiTheme().palette.mode === "dark" && "background.default",
        }}
      >
        <Typography variant="h5" color="text.primary">
          {t("payment")}
        </Typography>
        <Stack marginTop={"24px"} gap={"16px"}>
          {[
            {
              title: "Pay with Card",
              title_display: t("pay_with_card"),
              description: "You will pay directly on the web",
              description_display: t("pay_with_card_des"),
              icon: "logos:paypal",
            },
            {
              title: "Cash",
              title_display: t("cash"),
              description: "Pay with cash when your order is delivered.",
              description_display: t("cash_des"),
              icon: "tabler:cash",
            },
          ].map((it, index) => (
            <React.Fragment key={index}>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  padding: "20px",
                  borderRadius: "8px",
                  display: "flex",
                  gap: "16px",
                  cursor: "pointer",
                  outline:
                    cart?.payment?.title === it.title && "2px solid black",
                }}
                onClick={() => setCart({ ...cart, payment: it })}
              >
                <Stack gap={"8px"}>
                  <Typography variant="subtitle1" color="text.primary">
                    {it.title_display}
                  </Typography>
                  <Typography variant="body2" color={"text.secondary"}>
                    {it.description_display}
                  </Typography>
                </Stack>
                <div className="flex-1"></div>
                <Icon
                  icon={it.icon}
                  width="28"
                  height="28"
                  color={MuiTheme().palette.text.primary}
                />
              </Box>
              {it.title !== "Cash" && (
                <Stack
                  sx={{
                    padding: "20px",
                    border: "1px solid black",
                    borderColor: "divider",
                    borderRadius: "12px",
                    gap: "20px",
                    display: cart?.payment?.title !== it.title && "none",
                  }}
                >
                  <Stack direction="row" gap="20px" alignItems="center">
                    <Icon
                      icon="solar:card-2-bold-duotone"
                      width="24"
                      height="24"
                      color={MuiTheme().palette.text.secondary}
                    />
                    <Typography variant="h6">Card</Typography>
                  </Stack>
                  <Stack gap="20px">
                    <div id="card-container"></div>
                  </Stack>
                </Stack>
              )}
            </React.Fragment>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default PaymentStep;
