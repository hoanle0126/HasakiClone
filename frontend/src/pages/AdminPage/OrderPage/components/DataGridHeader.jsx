import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function RenderOrderId(props) {
  const { row } = props;
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Icon icon="solar:document-bold-duotone" width={24} height={24} />
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {row.orderId || `ORD-${String(row.id).padStart(3, "0")}`}
      </Typography>
    </Box>
  );
}

function RenderCustomer(props) {
  const { row } = props;
  const customerName = row.customerName || "N/A";
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
        sx={{
          bgcolor: "primary.light",
          width: "50px",
          height: "50px",
        }}
      >
        {customerName.charAt(0).toUpperCase()}
      </Avatar>
      <Stack>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {customerName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {row.customerEmail || "N/A"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {row.customerPhone || "N/A"}
        </Typography>
      </Stack>
    </Box>
  );
}

function RenderOrderDate(props) {
  const { row } = props;
  const date = row.orderDate ? new Date(row.orderDate) : new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {formattedDate}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {formattedTime}
      </Typography>
    </Box>
  );
}

function RenderStatus(props) {
  const { row } = props;
  const theme = useTheme();

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const status = row.status || "pending";
  return (
    <Chip
      label={getStatusLabel(status)}
      color={getStatusColor(status)}
      size="small"
      sx={{ fontWeight: 500 }}
    />
  );
}

function RenderAction(props) {
  const { row } = props;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();

  const handleClick = (event) => {
    event.stopPropagation();
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
      <IconButton onClick={handleClick} size="small">
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
          <MenuItem onClick={() => navigate("/admin/orders/" + row.id)}>
            <Icon icon="solar:eye-bold" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              View Details
            </Typography>
          </MenuItem>
          <MenuItem>
            <Icon
              icon="solar:check-read-broken"
              color={theme.palette.primary.main}
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Process Order
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
      field: "orderId",
      headerName: "Order ID",
      width: 180,
      renderCell: RenderOrderId,
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      minWidth: 250,
      renderCell: RenderCustomer,
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      width: 150,
      renderCell: RenderOrderDate,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: RenderStatus,
    },
    {
      field: "action",
      headerName: "",
      width: 80,
      sortable: false,
      disableColumnMenu: true,
      renderCell: RenderAction,
    },
  ];
};

export default DataGridHeader;
