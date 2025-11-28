import { formatDate } from "@/Function/formatDate";
import { formatTime } from "@/Function/formatTime";
import { deleteBrand } from "@/store/brands/action";
import { MuiTheme } from "@/theme";
import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  IconButton,
  LinearProgress,
  MenuItem,
  MenuList,
  Popover,
  Popper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function RenderDateTime(props) {
  const { value } = props;

  return (
    <Stack
      sx={{
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Typography variant="body2">{formatDate(value)}</Typography>
      <Typography variant="captiontext" color={"text.secondary"}>
        {formatTime(value)}
      </Typography>
    </Stack>
  );
}

function RenderProduct(props) {
  const { row } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Avatar
        src={row.thumbnail}
        sx={{
          bgcolor: "primary.light",
          width: "70px",
          height: "70px",
          borderRadius: "16px",
        }}
        variant="rounded"
      >
        C
      </Avatar>
      <Stack>
        <Typography variant="subtitle2">{row.name}</Typography>
      </Stack>
    </Box>
  );
}

function RenderAction(props) {
  const { row } = props;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        height: "100%",
      }}
    >
      <IconButton onClick={handleClick}>
        <Icon
          icon="eva:more-vertical-fill"
          color={theme.palette.text.primary}
        />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList>
          <MenuItem onClick={() => navigate("/admin/brands/" + row.url)}>
            <Icon icon="solar:eye-bold" />
            View
          </MenuItem>
          <MenuItem>
            <Icon
              icon="solar:trash-bin-trash-bold"
              color={theme.palette.error.main}
            />
            <Typography
              variant="body2"
              color={"error"}
              onClick={() => {
                dispatch(deleteBrand(row.url));
              }}
            >
              Delete
            </Typography>
          </MenuItem>
        </MenuList>
      </Popover>
    </Box>
  );
}

const DataGridHeader = () => {
  return [
    {
      field: "name",
      headerName: "Categories",
      flex: 1,
      renderCell: RenderProduct,
    },
    {
      field: "updated_at",
      headerName: "Updated at",
      width: 200,
      renderCell: RenderDateTime,
    },
    {
      field: "created_at",
      headerName: "Created at",
      width: 200,
      renderCell: RenderDateTime,
    },
    {
      field: "action",
      headerName: "",
      sortable: false, // Disable sorting
      disableColumnMenu: true,
      renderCell: RenderAction,
    },
  ];
};

export default DataGridHeader;
