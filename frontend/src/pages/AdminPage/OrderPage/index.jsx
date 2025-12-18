import { Icon } from "@iconify/react";
import { Box, Button, Stack, Typography, useTheme, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import DataGridHeader from "./components/DataGridHeader";
import DataGridToolbar from "./components/DataGridToolbar";
import AdminDefaultLayout from "@/layouts/AdminLayout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "@/store/orders/action";

const hiddenFields = ["id", "__check__", "action"];

const getTogglableColumns = (columns) => {
  return columns
    .filter((column) => !hiddenFields.includes(column.field))
    .map((column) => column.field);
};

// Transform order data từ backend sang format cho DataGrid
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
    // Giữ nguyên data gốc để dùng trong detail panel
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

  const getDetailPanelContent = React.useCallback(({ row }) => {
    const products = row.products || [];
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Danh sách sản phẩm - Đơn hàng {row.orderId}
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Sản phẩm</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Số lượng</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Đơn giá</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Thành tiền</TableCell>
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
                  Tổng cộng:
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
