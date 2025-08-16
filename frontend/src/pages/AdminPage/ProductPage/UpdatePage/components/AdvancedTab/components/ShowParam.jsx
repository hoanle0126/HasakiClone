import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Modal,
  Popover,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ParamModal } from "./ParamModal";
import { ElementModal } from "./ElementModal";

export const ShowParam = ({ parameter, setParameter }) => {
  const [open, setOpen] = React.useState("");
  const [openModal, setOpenModal] = React.useState({
    key: "",
    open: false,
  });
  const [updateModal, setUpdateModal] = React.useState({
    key: "",
    open: false,
  });
  const [openElementModal, setOpenElementModal] = React.useState({
    key: "",
    open: false,
    title: "",
    value: ["asdasd", "asd"],
  });
  const [updateElementModal, setUpdateElementModal] = React.useState({
    key: "",
    open: false,
    title: "",
    value: [""],
  });
  const [editRow, setEditRow] = React.useState(-1);
  const inputRef = React.useRef();
  const [listParam, setListParam] = React.useState([]);

  React.useEffect(() => {
    setListParam(
      Object.entries(parameter).map(([label, value]) => ({
        label,
        value,
      }))
    );
  }, [parameter]);

  return (
    <Stack component="div" sx={{ gap: "8px" }}>
      <Table>
        {listParam.map((value, key) => (
          <React.Fragment key={key}>
            <TableRow>
              <TableCell>
                {editRow == key ? (
                  <input
                    className="focus:outline-none"
                    ref={inputRef}
                    value={value.label}
                    onChange={(e) => {
                      let startList = listParam.slice(0, key);
                      let endList = listParam.slice(key + 1, listParam.length);
                      let currentValue = { ...value, label: e.target.value };
                      setListParam(
                        startList.concat(currentValue).concat(endList)
                      );
                    }}
                  />
                ) : (
                  value.label
                )}
              </TableCell>
              <TableCell>
                {editRow == key ? (
                  <input
                    className="focus:outline-none"
                    value={value.value}
                    onChange={(e) => {
                      let startList = listParam.slice(0, key);
                      let endList = listParam.slice(key + 1, listParam.length);
                      let currentValue = { ...value, value: e.target.value };
                      setListParam(
                        startList.concat(currentValue).concat(endList)
                      );
                    }}
                  />
                ) : (
                  value.value
                )}
              </TableCell>
              <TableCell width={200}>
                <Stack direction="row" alignItems="center" gap="8px">
                  {editRow == key ? (
                    <IconButton
                      size="small"
                      onClick={async () => {
                        await setEditRow(-1);
                      }}
                    >
                      <Icon icon="eva:save-fill" />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="small"
                      onClick={async () => {
                        await setEditRow(key);
                        inputRef.current.focus();
                      }}
                    >
                      <Icon icon="solar:pen-2-bold" />
                    </IconButton>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => {
                      let newList = [...listParam];
                      newList.splice(key, 1);
                      setListParam(newList);
                    }}
                  >
                    <Icon icon="solar:trash-bin-minimalistic-bold" />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </Table>
      <Button
        variant="outlined"
        color="common"
        size="large"
        onClick={() =>
          setOpenModal({
            open: true,
          })
        }
      >
        Add new parameter
      </Button>
      <ParamModal
        open={openModal.open}
        onClose={() =>
          setOpenModal({
            open: false,
          })
        }
        paramKey={openModal.key}
        action={(param) => {
          setParameter({ ...parameter, [param.title]: param.value });
        }}
      />
      <ParamModal
        open={updateModal.open}
        onClose={() =>
          setUpdateModal({
            open: false,
          })
        }
        paramKey={updateModal.key}
        action={(param) => {
          let obj = { ...parameter };
          let updateObj = {};
          for (let [k, v] of Object.entries(obj)) {
            if (k === updateModal.key) {
              updateObj[param.title] = v;
            } else {
              updateObj[k] = v;
            }
          }

          setParameter(updateObj);
        }}
      />
      <ElementModal
        open={openElementModal.open}
        onClose={() =>
          setOpenElementModal({
            open: false,
          })
        }
        elementValue={openElementModal.value}
        elementTitle={openElementModal.title}
        action={(param) => {
          let obj = parameter[openElementModal.key];
          obj = { ...obj, [param.title]: param.value };
          setParameter({
            ...parameter,
            [openElementModal.key]: obj,
          });
        }}
      />
      <ElementModal
        open={updateElementModal.open}
        onClose={() =>
          setUpdateElementModal({
            open: false,
          })
        }
        elementValue={updateElementModal.value}
        elementTitle={updateElementModal.title}
        action={(param) => {
          // Tạo bản sao của parameter để không thay đổi trực tiếp
          let obj = { ...parameter };

          // Lấy object cha dựa trên key từ updateElementModal
          let parentObj = obj[updateElementModal.key];
          if (!parentObj) return; // Kiểm tra nếu parentObj không tồn tại

          // Tạo một object mới để giữ thứ tự
          let updatedParentObj = {};

          // Lặp qua các key-value trong parentObj
          for (let [k, v] of Object.entries(parentObj)) {
            if (k === updateElementModal.title) {
              // Thay thế key bằng param.title và giá trị bằng param.value
              updatedParentObj[param.title] = param.value;
            } else {
              // Giữ nguyên các key-value khác
              updatedParentObj[k] = v;
            }
          }

          // Gán lại updatedParentObj vào obj
          obj[updateElementModal.key] = updatedParentObj;

          // Cập nhật state
          setParameter(obj);
        }}
      />
    </Stack>
  );
};
