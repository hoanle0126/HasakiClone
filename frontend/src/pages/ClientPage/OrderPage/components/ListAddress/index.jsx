import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { Palette } from "@/Theme/elements/palette";
import AddAddressModal from "./components/AddAddressModal";
import { MuiTheme } from "../../../../../Theme";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../../../Context";
import { useTranslation } from "react-i18next";

const ListAddress = () => {
  const { cart, setCart } = useStateContext();
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const stateCodes = [
    { title: "Alabama", abbr: "AL", tax: 4 },
    { title: "Alaska", abbr: "AK", tax: 0 },
    { title: "Arizona", abbr: "AZ", tax: 5.6 },
    { title: "Arkansas", abbr: "AR", tax: 6.5 },
    { title: "California", abbr: "CA", tax: 7.25 },
    { title: "Colorado", abbr: "CO", tax: 2.9 },
    { title: "Connecticut", abbr: "CT", tax: 6.35 },
    { title: "Delaware", abbr: "DE", tax: 0 },
    { title: "Florida", abbr: "FL", tax: 6 },
    { title: "Georgia", abbr: "GA", tax: 4 },
    { title: "Hawaii", abbr: "HI", tax: 4 },
    { title: "Idaho", abbr: "ID", tax: 6 },
    { title: "Illinois", abbr: "IL", tax: 6.25 },
    { title: "Indiana", abbr: "IN", tax: 7 },
    { title: "Iowa", abbr: "IA", tax: 6 },
    { title: "Kansas", abbr: "KS", tax: 6.5 },
    { title: "Kentucky", abbr: "KY", tax: 6 },
    { title: "Louisiana", abbr: "LA", tax: 4.45 },
    { title: "Maine", abbr: "ME", tax: 5.5 },
    { title: "Maryland", abbr: "MD", tax: 6 },
    { title: "Massachusetts", abbr: "MA", tax: 6.25 },
    { title: "Michigan", abbr: "MI", tax: 6 },
    { title: "Minnesota", abbr: "MN", tax: 6.875 },
    { title: "Mississippi", abbr: "MS", tax: 7 },
    { title: "Missouri", abbr: "MO", tax: 4.225 },
    { title: "Montana", abbr: "MT", tax: 0 },
    { title: "Nebraska", abbr: "NE", tax: 5.5 },
    { title: "Nevada", abbr: "NV", tax: 6.85 },
    { title: "New Hampshire", abbr: "NH", tax: 0 },
    { title: "New Jersey", abbr: "NJ", tax: 6.625 },
    { title: "New Mexico", abbr: "NM", tax: 5.125 },
    { title: "New York", abbr: "NY", tax: 4 },
    { title: "North Carolina", abbr: "NC", tax: 4.75 },
    { title: "North Dakota", abbr: "ND", tax: 5 },
    { title: "Ohio", abbr: "OH", tax: 5.75 },
    { title: "Oklahoma", abbr: "OK", tax: 4.5 },
    { title: "Oregon", abbr: "OR", tax: 0 },
    { title: "Pennsylvania", abbr: "PA", tax: 6 },
    { title: "Rhode Island", abbr: "RI", tax: 7 },
    { title: "South Carolina", abbr: "SC", tax: 6 },
    { title: "South Dakota", abbr: "SD", tax: 4.2 },
    { title: "Tennessee", abbr: "TN", tax: 7 },
    { title: "Texas", abbr: "TX", tax: 6.25 },
    { title: "Utah", abbr: "UT", tax: 4.85 },
    { title: "Vermont", abbr: "VT", tax: 6 },
    { title: "Virginia", abbr: "VA", tax: 4.3 },
    { title: "Washington", abbr: "WA", tax: 6.5 },
    { title: "West Virginia", abbr: "WV", tax: 6 },
    { title: "Wisconsin", abbr: "WI", tax: 5 },
    { title: "Wyoming", abbr: "WY", tax: 4 },
    { title: "District of Columbia", abbr: "DC", tax: 6 },
  ];
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [address, setAddress] = React.useState(cart.address);
  const upSm = useMediaQuery(MuiTheme().breakpoints.up("sm"));

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, ""); // Xóa hết ký tự không phải số
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  React.useEffect(() => {
    setCart({ ...cart, address: address });
  }, [address]);

  return (
    <>
      <AddAddressModal open={open} handleClose={handleClose} />
      <Stack
        gap={"32px"}
        sx={{
          padding: "40px",
          boxShadow: "custom.card",
          borderRadius: "20px",
        }}
      >
        <Typography variant="h4">{t("address")}</Typography>
        <Grid container spacing="12px">
          <Grid size={12}>
            <Stack gap="8px">
              <Typography id="modal-modal-title" variant="subtitle2">
                Email*
              </Typography>
              <TextField
                size="small"
                fullWidth
                color="common"
                value={address.email}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    email: e.target.value,
                  })
                }
              />
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack gap="8px">
              <Typography id="modal-modal-title" variant="subtitle2">
                {t("first_name")}*
              </Typography>
              <TextField
                size="small"
                fullWidth
                color="common"
                value={address.first_name}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    first_name: e.target.value,
                  })
                }
              />
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack gap="8px">
              <Typography id="modal-modal-title" variant="subtitle2">
                {t("last_name")}*
              </Typography>
              <Stack direction="row" alignItems="center" gap="20px">
                <TextField
                  size="small"
                  color="common"
                  value={address.last_name}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      last_name: e.target.value,
                    })
                  }
                  sx={{ flex: 1 }}
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Stack gap="8px">
          <Typography id="modal-modal-title" variant="subtitle2">
            {t("phone")}*
          </Typography>
          <Stack direction="row" alignItems="center" gap="20px">
            <TextField
              size="small"
              color="common"
              value={address.phone}
              onChange={(e) =>
                setAddress({
                  ...address,
                  phone: formatPhoneNumber(e.target.value),
                })
              }
              sx={{ flex: 1 }}
            />
          </Stack>
        </Stack>
        <Stack gap="8px">
          <Typography id="modal-modal-title" variant="subtitle2">
            {t("address")}
          </Typography>
          <TextField
            size="small"
            fullWidth
            color="common"
            value={address.street_address1}
            placeholder="Addresss 1*"
            onChange={(e) =>
              setAddress({
                ...address,
                street_address1: e.target.value,
              })
            }
          />
        </Stack>
        <Stack gap="8px">
          <TextField
            size="small"
            fullWidth
            color="common"
            value={address.street_address2}
            placeholder="Address 2 ( optional)"
            onChange={(e) =>
              setAddress({
                ...address,
                street_address2: e.target.value,
              })
            }
          />
        </Stack>
        <Stack gap="8px">
          <Typography id="modal-modal-title" variant="subtitle2">
            {t("zip")}*
          </Typography>
          <TextField
            size="small"
            fullWidth
            color="common"
            value={address.zip}
            onChange={(e) =>
              setAddress({
                ...address,
                zip: e.target.value,
              })
            }
          />
        </Stack>
        <Stack gap="8px">
          <Typography id="modal-modal-title" variant="subtitle2">
            {t("city")}*
          </Typography>
          <TextField
            size="small"
            fullWidth
            color="common"
            value={address.city}
            onChange={(e) =>
              setAddress({
                ...address,
                city: e.target.value,
              })
            }
          />
        </Stack>
        <Stack gap="8px">
          <Typography id="modal-modal-title" variant="subtitle2">
            {t("state")}
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              value={address.state}
              onChange={(e) =>
                setAddress({
                  ...address,
                  state: e.target.value,
                })
              }
              renderValue={(selected) => selected.abbr}
            >
              {stateCodes.map((stateValue, stateIndex) => (
                <MenuItem key={stateIndex} value={stateValue}>
                  {stateValue.abbr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      {upSm && (
        <Stack direction={"row"} marginTop={"32px"} alignItems={"center"}>
          <Button
            color="common"
            startIcon={
              <Icon icon="eva:arrow-back-fill" width="28" height="28" />
            }
            onClick={() => navigate("/checkout?step=" + 0)}
          >
            Back
          </Button>
          <div className="flex-1"></div>
          <Button
            color="common"
            variant="contained"
            startIcon={<Icon icon="eva:plus-fill" />}
            onClick={() => navigate("/checkout?step=" + 2)}
            disabled={
              !address.first_name ||
              !address.last_name ||
              !address.city ||
              address.phone === 0
            }
          >
            Save & Continue
          </Button>
        </Stack>
      )}
    </>
  );
};

export default ListAddress;
