import { Icon } from "@iconify/react";
import { Box, Breadcrumbs, Button, Stack, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import DataGridHeader from "./components/DataGridHeader";
import DataGridToolbar from "./components/DataGridToolbar";
import { useNavigate } from "react-router-dom";
import { MuiTheme } from "@/theme";
import AdminDefaultLayout from "@/layouts/AdminLayout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/store/products/action";
import socket from "@/socket";
import { Snackbar, Alert } from "@mui/material";

const hiddenFields = ["id", "__check__", "name", "action"];

const getTogglableColumns = (columns) => {
  return columns
    .filter((column) => !hiddenFields.includes(column.field))
    .map((column) => column.field);
};

const ProductPage = () => {
  const navigate = useNavigate();
  const [filterButtonEl, setFilterButtonEl] = React.useState(null);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0,
  });
  const dispatch = useDispatch();
  const { products, loading, meta } = useSelector((store) => store.products);
  const [notification, setNotification] = React.useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleRefresh = React.useCallback(() => {
    dispatch(
      getAllProducts({
        paginate: paginationModel.pageSize,
        page: paginationModel.page + 1,
      })
    );
  }, [dispatch, paginationModel.page, paginationModel.pageSize]);

  React.useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  // Socket.io integration for real-time product updates
  React.useEffect(() => {
    const handleProductsUpdated = (data) => {
      console.log("🛍️ Products updated:", data);

      // Show notification
      const actionMessages = {
        created: `Product "${data.product?.name || 'N/A'}" has been created`,
        updated: `Product "${data.product?.name || 'N/A'}" has been updated`,
        deleted: `Product "${data.product?.name || 'N/A'}" has been deleted`,
      };

      setNotification({
        open: true,
        message: actionMessages[data.action] || "Products list updated",
        severity: data.action === "deleted" ? "warning" : "success",
      });

      // Refresh products list
      if (paginationModel.page === 0) {
        handleRefresh();
      } else {
        handleRefresh();
      }
    };

    socket.on("products_updated", handleProductsUpdated);

    return () => {
      socket.off("products_updated", handleProductsUpdated);
    };
  }, [dispatch, paginationModel.page, paginationModel.pageSize, handleRefresh]);

  // Handle notification close
  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const theme = useTheme();

  return (
    <AdminDefaultLayout
      title={"Products"}
      action={
        <Button
          variant="contained"
          color="common"
          onClick={() => navigate("create")}
          startIcon={<Icon icon="eva:plus-fill" />}
        >
          Create product
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
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(it) => {
          setRowSelectionModel(it);
        }}
        rows={products}
        initialState={{
          sorting: {
            sortModel: [{ field: "created_at", sort: "desc" }],
          },
        }}
        rowHeight={100}
        columns={DataGridHeader({ onDeleted: handleRefresh })}
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
        rowCount={meta?.total ?? products?.length ?? 0}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 15]}
        slots={{
          toolbar: DataGridToolbar,
          columnSortedAscendingIcon: () => (
            <Icon icon="solar:alt-arrow-up-bold-duotone" />
          ),
          columnSortedDescendingIcon: () => (
            <Icon icon="solar:alt-arrow-down-bold-duotone" />
          ),
        }}
        loading={loading}
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

export default ProductPage;
