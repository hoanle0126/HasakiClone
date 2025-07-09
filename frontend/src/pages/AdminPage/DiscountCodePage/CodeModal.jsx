import SelectProductModal from "@/components/SelectProductModal";
import { formatCurrency } from "@/Function/formatCurrency";
import { getAllProducts } from "@/store/products/action";
import { Icon } from "@iconify/react";
import {
  Button,
  ButtonBase,
  ButtonGroup,
  Grid,
  Modal,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const CodeModal = ({ open, handleClose }) => {
  const [openProductModal, setOpenProductModal] = React.useState(false);
  const [formCode, setFormCode] = React.useState({
    products: [],
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Stack
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: "12px",
          boxShadow: 24,
          p: "20px",
          gap: "20px",
          height: "600px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Typography variant="h6">Discount Code</Typography>
        <Stack gap="16px">
          <Stack gap="8px">
            <Typography variant="body2">Name</Typography>
            <OutlinedInput size="small" placeholder="Enter name of code" />
          </Stack>
          <Stack gap="8px">
            <Typography variant="body2">Code</Typography>
            <OutlinedInput size="small" placeholder="Enter code" />
          </Stack>
          <Stack gap="8px">
            <Typography variant="body2">Discount</Typography>
            <OutlinedInput
              size="small"
              placeholder="Enter value discount for code"
            />
          </Stack>
          <Stack gap="8px">
            <Typography variant="body2">Product active</Typography>
            <Button
              variant="outlined"
              onClick={() => setOpenProductModal(true)}
            >
              Add Product
            </Button>
            <Grid container spacing="12px">
              {formCode.products.map((item, index) => (
                <Grid size={2} key={index}>
                  <ButtonBase
                    sx={{
                      width: "100%",
                      boxShadow: "custom.card",
                      padding: "4px",
                      gap: "4px",
                      borderRadius: "12px",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                    onClick={() => {
                      const startProducts = formCode.products.slice(0, index);
                      const endProducts = formCode.products.slice(
                        index + 1,
                        formCode.products.length
                      );
                      setFormCode({
                        ...formCode,
                        products: startProducts.concat(endProducts),
                      });
                    }}
                  >
                    <Stack
                      sx={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                      }}
                    >
                      <img src={item.thumbnail} className="size-full" />
                    </Stack>
                    <Typography
                      variant="captiontext"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "start",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="captiontext" color="secondary.main">
                      {formatCurrency(item.price)}
                    </Typography>
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
        <SelectProductModal
          open={openProductModal}
          handleClose={() => setOpenProductModal(false)}
          action={(modalValue) => {
            console.log(modalValue);
            setFormCode({
              ...formCode,
              products: [...formCode.products, modalValue],
            });
          }}
          excluding={formCode.products.map((it) => it.id)}
        />
      </Stack>
    </Modal>
  );
};

export default CodeModal;
