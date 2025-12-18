import { Icon } from "@iconify/react";
import { Box, Button, Stack, Typography, useTheme, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import DataGridHeader from "./components/DataGridHeader";
import DataGridToolbar from "./components/DataGridToolbar";
import AdminDefaultLayout from "@/layouts/AdminLayout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "@/store/orders/action";
import socket from "@/socket";

const hiddenFields = ["id", "__check__", "action"];

const getTogglableColumns = (columns) => {
  return columns
    .filter((column) => !hiddenFields.includes(column.field))
    .map((column) => column.field);
};

// Transform order data from backend to DataGrid format
const transformOrderData = (orders) => {
  return orders.map((order) => ({
    id: order.id,
    orderId: `ORD-${String(order.id).padStart(3, "0")}`,
    customerName: order.user
      ? `${order.user.first_name || ""} ${order.user.last_name || ""}`.trim()
      : "N/A",
    customerEmail: order.user?.email || "N/A",
    customerPhone: order.address?.phone || "N/A",
    orderDate: order.created_at,
    status: order.payments?.status || (order.payments?.type === "online" ? "processing" : "pending"),
    products: order.products || [],
    // Keep original data for use in detail panel
    _original: order,
  }));
};

const OrderPage = () => {
  const navigate = React.useRef(null);
  const [filterButtonEl, setFilterButtonEl] = React.useState(null);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [expandedRows, setExpandedRows] = React.useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  const [notification, setNotification] = React.useState({
    open: false,
    message: "",
    severity: "info",
  });
  const dispatch = useDispatch();
  const { orders, loading, meta } = useSelector((store) => store.orders);
  const theme = useTheme();

  const handleRefresh = React.useCallback(() => {
    dispatch(
      getAllOrders({
        paginate: paginationModel.pageSize,
        page: paginationModel.page + 1,
      })
    );
  }, [dispatch, paginationModel.page, paginationModel.pageSize]);

  React.useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  // Socket.io integration for real-time order updates
  React.useEffect(() => {
    // Listen for new order notifications
    const handleNewOrder = (data) => {
      console.log("📦 New order received:", data);
      
      // Show notification
      setNotification({
        open: true,
        message: data.message || `New order #${data.order?.id || data.order?.orderId || 'N/A'} received!`,
        severity: "success",
      });

      // Refresh orders list - if on first page, refresh to show new order
      // Otherwise, just refresh current page
      if (paginationModel.page === 0) {
        // If on first page, refresh to show new order at top
        handleRefresh();
      } else {
        // If on other pages, option to refresh or show notification only
        // For now, we'll refresh anyway
        handleRefresh();
      }
    };

    // Listen for order updates (general)
    const handleOrdersUpdated = (data) => {
      console.log("📋 Orders list updated:", data);
      
      // Refresh the orders list
      handleRefresh();
    };

    // Socket connection setup
    socket.on("connect", () => {
      console.log("✅ Connected to socket server:", socket.id);
    });

    // Listen for socket events
    socket.on("new_order", handleNewOrder);
    socket.on("orders_updated", handleOrdersUpdated);

    // Cleanup on unmount
    return () => {
      socket.off("new_order", handleNewOrder);
      socket.off("orders_updated", handleOrdersUpdated);
      socket.off("connect");
    };
  }, [handleRefresh, paginationModel.page]);

  // Handle notification close
  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const getDetailPanelContent = React.useCallback(({ row }) => {
    const products = row.products || [];
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Product List - Order {row.orderId}
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Quantity</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Unit Price</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={product.thumbnail}
                        sx={{ width: 50, height: 50, borderRadius: 2 }}
                        variant="rounded"
                      >
                        {product.name?.charAt(0) || "P"}
                      </Avatar>
                      <Typography variant="body2">{product.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">{product.quantity || 0}</TableCell>
                  <TableCell align="right">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price || 0)}
                  </TableCell>
                  <TableCell align="right">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format((product.price || 0) * (product.quantity || 0))}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right" sx={{ fontWeight: 600 }}>
                  Total:
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    products.reduce(
                      (sum, product) => sum + (product.price || 0) * (product.quantity || 0),
                      0
                    )
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }, []);

  const getDetailPanelHeight = React.useCallback(() => {
    return 400;
  }, []);

  return (
    <AdminDefaultLayout
      title={"Order Management"}
      action={
        <Button
          variant="contained"
          color="common"
          startIcon={<Icon icon="eva:refresh-fill" />}
          onClick={handleRefresh}
        >
          {"Refresh"}
        </Button>
      }
    >
      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
          icon={<Icon icon="solar:bell-bing-bold-duotone" />}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <DataGrid
        loading={loading}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(it) => {
          setRowSelectionModel(it);
        }}
        rows={transformOrderData(orders)}
        getRowId={(row) => row.id}
        initialState={{
          sorting: {
            sortModel: [{ field: "orderDate", sort: "desc" }],
          },
        }}
        rowHeight={80}
        columns={DataGridHeader()}
        getDetailPanelContent={getDetailPanelContent}
        getDetailPanelHeight={getDetailPanelHeight}
        detailPanelExpandedRowIds={expandedRows}
        onDetailPanelExpandedRowIdsChange={setExpandedRows}
        rowCount={meta?.total ?? orders?.length ?? 0}
        paginationMode="server"
        sx={{
          borderRadius: "12px",
          boxShadow: "custom.card",
          border: "none",
          backgroundColor:
            theme.palette.mode === "dark" && "background.default",
          "& .MuiDataGrid-columnHeader": {
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 600,
              color: "text.secondary",
            },
          },
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 25, 50]}
        slots={{
          toolbar: DataGridToolbar,
          columnSortedAscendingIcon: () => (
            <Icon icon="solar:alt-arrow-up-bold-duotone" />
          ),
          columnSortedDescendingIcon: () => (
            <Icon icon="solar:alt-arrow-down-bold-duotone" />
          ),
        }}
        slotProps={{
          panel: {
            anchorEl: filterButtonEl,
            placement: "bottom-end",
          },
          toolbar: {
            setFilterButtonEl,
            rowSelectionModel,
          },
          basePopper: {
            sx: {
              "& .MuiDataGrid-paper": {
                divShadow: "custom.z1",
                paddingY: "8px",
                borderRadius: "8px",
                border: "1px solid",
                borderColor: "divider",
                "& .MuiDataGrid-filterForm": {
                  gap: "8px",
                  alignItems: "center",
                },
                "& .MuiDataGrid-columnsManagementHeader": {
                  padding: "12px 16px",
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    paddingY: "4px",
                    borderColor: "error.main",
                    "&:focus": {},
                  },
                },
                "& .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                  {
                    "&:focus": {
                      boxShadow: "none",
                    },
                  },
              },
            },
          },
          columnsManagement: {
            getTogglableColumns,
            autoFocusSearchField: true,
          },
          filterPanel: {
            filterFormProps: {
              columnInputProps: {
                variant: "outlined",
                size: "small",
                color: "custom",
              },
              operatorInputProps: {
                variant: "outlined",
                size: "small",
                color: "custom",
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: "outlined",
                  size: "small",
                  color: "custom",
                },
              },
            },
          },
        }}
      />
    </AdminDefaultLayout>
  );
};

export default OrderPage;
