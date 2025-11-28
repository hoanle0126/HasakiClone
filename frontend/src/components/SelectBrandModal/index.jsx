import { getAllBrands } from "@/store/brands/action";
import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: "20px",
};

const SelectBrandModal = ({ open, handleClose, handleSelect }) => {
  const dispatch = useDispatch();
  const { brands } = useSelector((store) => store.brands);

  React.useEffect(() => {
    dispatch(getAllBrands({ onSuccess: () => {} }));
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Select Brand
        </Typography>
        <List
          sx={{
            maxHeight: 440,
            width: 360,
            bgcolor: "background.paper",
            overflow: "auto",
          }}
          component="nav"
        >
          {brands.map((brand) => (
            <ListItemButton
              key={brand.id}
              onClick={() => {
                handleSelect(brand);
                handleClose();
              }}
            >
              <ListItemIcon>
                <Avatar
                  src={brand.thumbnail}
                  variant="square"
                  sx={{
                    w: "32px",
                    h: "32px",
                    border: "1px solid black",
                    borderColor: "divider",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={brand.name} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default SelectBrandModal;
