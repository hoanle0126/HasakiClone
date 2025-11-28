import { getDiscountCodeById } from "@/store/discountCodes/action";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: "20px",
  gap: "12px",
};

const DiscountCodeModal = ({ open, handleClose, action = () => {} }) => {
  const dispatch = useDispatch();
  const [code, setCode] = React.useState("");

  React.useEffect(() => {
    setCode("");
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Nhập mã giảm giá
        </Typography>
        <TextField
          fullWidth
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            dispatch(
              getDiscountCodeById({
                id: code,
                onSuccess: (codeData) => {
                  action(codeData);
                  handleClose();
                },
              })
            );
          }}
        >
          Xác nhận
        </Button>
      </Stack>
    </Modal>
  );
};

export default DiscountCodeModal;
