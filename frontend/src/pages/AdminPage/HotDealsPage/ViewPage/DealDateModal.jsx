import ImageThumbnail from "@/components/ImageThumbnail";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import ProductModal from "./ProductModal";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/store/products/action";
import SelectProductModal from "@/components/SelectProductModal";

const DealDateModal = ({ open, handleClose, action, deal }) => {
  const [openProductModal, setOpenProductModal] = React.useState(false);
  const [dealModel, setDealModel] = React.useState({
    products: [],
  });

  React.useEffect(() => {
    console.log("Deal ", dealModel);
  }, [dealModel]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          gap: "28px",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Category
        </Typography>
        <Stack
          alignItems="start"
          justifyContent="start"
          gap="20px"
          width="100%"
        >
          <Stack gap="12px" width="100%">
            <Typography variant="subtitle1">Time</Typography>
            <DateTimePicker
              value={dayjs(dealModel?.time)}
              onChange={(e) => {
                console.log(e.toISOString());
                setDealModel({ ...dealModel, time: e.toISOString() });
              }}
              sx={{ width: "100%" }}
            />
          </Stack>
          <Stack gap="12px" width="100%">
            <Typography variant="subtitle1">Product</Typography>
            {dealModel?.products?.map((item, index) => (
              <Stack key={index}>
                <Stack direction="row" gap="20px" alignItems="center">
                  <img
                    src={item.thumbnail}
                    className="size-[80px] outline"
                  />
                  <Stack
                    justifyContent="center"
                    paddingY="8px"
                    alignItems="start"
                    width="100%"
                  >
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <div className="flex-1"></div>
                    <Typography variant="body1">
                      {item.price.formatCurrency()}
                    </Typography>
                  </Stack>
                  <IconButton
                    onClick={() =>
                      setDealModel({
                        ...dealModel,
                        products: dealModel?.products?.filter(
                          (it) => it != item
                        ),
                      })
                    }
                  >
                    <Icon
                      icon="solar:trash-bin-minimalistic-linear"
                      width="24"
                      height="24"
                    />
                  </IconButton>
                </Stack>
              </Stack>
            ))}
            <Button onClick={() => setOpenProductModal(!openProductModal)}>
              Add Product
            </Button>
            <SelectProductModal
              open={openProductModal}
              handleClose={() => setOpenProductModal(false)}
              action={(modalValue) => {
                setDealModel({
                  ...dealModel,
                  products: modalValue,
                });
              }}
            />
          </Stack>
        </Stack>
        <Button
          variant="contained"
          onClick={() => {
            action(dealModel);
            setDealModel({});
            handleClose();
          }}
        >
          Save
        </Button>
      </Stack>
    </Modal>
  );
};

export default DealDateModal;
