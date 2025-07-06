import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const AddAddressModal = ({ open, handleClose }) => {
  const [address, setAddress] = React.useState({
    first_name: "",
    last_name: "",
    phone: 0,
    street_address: "",
    city: "",
    state: "",
    zip: "",
    default: true,
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          boxShadow: "custom.card",
          border: "1px solid black",
          borderColor: "divider",
          padding: "20px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4">Add new address</Typography>
          <Icon
            icon="eva:close-fill"
            width="24"
            height="24"
            className="cursor-pointer"
            onClick={handleClose}
          />
        </Stack>
        <Stack
          sx={{
            gap: "12px",
          }}
        >
          <Grid container spacing="12px">
            <Grid size={4}>
              <Stack gap="8px">
                <Typography id="modal-modal-title" variant="subtitle2">
                  First name
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
            <Grid size={8}>
              <Stack gap="8px">
                <Typography id="modal-modal-title" variant="subtitle2">
                  Last name
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

                  <Button
                    color="common"
                    onClick={() =>
                      setAddress({
                        ...address,
                        first_name: "A",
                        last_name: "Le Van",
                      })
                    }
                  >
                    User main info
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Stack gap="8px">
            <Typography id="modal-modal-title" variant="subtitle2">
              Phone number
            </Typography>
            <Stack direction="row" alignItems="center" gap="20px">
              <TextField
                size="small"
                color="common"
                value={address.phone}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    phone: e.target.value,
                  })
                }
                sx={{ flex: 1 }}
              />
              <Button
                color="common"
                onClick={() =>
                  setAddress({
                    ...address,
                    phone: "012345678",
                  })
                }
              >
                User main info
              </Button>
            </Stack>
          </Stack>
          <Stack gap="8px">
            <Typography id="modal-modal-title" variant="subtitle2">
              Street Address
            </Typography>
            <TextField
              size="small"
              fullWidth
              color="common"
              value={address.street_address}
              onChange={(e) =>
                setAddress({
                  ...address,
                  street_address: e.target.value,
                })
              }
            />
          </Stack>
          <Stack gap="8px">
            <Typography id="modal-modal-title" variant="subtitle2">
              City
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
              State/ Province
            </Typography>
            <TextField
              size="small"
              fullWidth
              color="common"
              value={address.state}
              onChange={(e) =>
                setAddress({
                  ...address,
                  state: e.target.value,
                })
              }
            />
          </Stack>
          <Stack gap="8px">
            <Typography id="modal-modal-title" variant="subtitle2">
              Zip/Postal Code
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
          <FormControlLabel
            control={
              <Checkbox
                checked={address.default}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    default: e.target.checked,
                  })
                }
                color="common"
              />
            }
            label="Set default"
          />
        </Stack>
        <Button type="submit" size="large" variant="contained" color="common">
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddAddressModal;
