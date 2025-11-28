import {
  getAllCategories,
} from "@/store/categories/action";
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
import CategoriesItem from "./CategoriesItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: "20px",
};

const SelectCategoryModal = ({ open, handleClose, handleSelect }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((store) => store.categories);

  React.useEffect(() => {
    dispatch(getAllCategories());
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
          Select Category
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
          {categories.map((category) => (
            <CategoriesItem
              key={category.id}
              category={category}
              selectItem={(itemSelected) => {
                handleSelect(itemSelected);
                handleClose();
              }}
            />
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default SelectCategoryModal;
