import { formatCurrency } from "@/Function/formatCurrency";
import { Icon } from "@iconify/react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useStateContext } from "../../../../../Context";

function RenderProduct({ row }) {
  const { language } = useStateContext();

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        gap: "12px",
        paddingY: "8px",
      }}
    >
      <img
        src={row.thumbnail}
        className="h-full object-cover aspect-square"
      />
      <Stack
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Typography variant="subtitle2">
          asdasd
        </Typography>
        <Typography
          variant="body2"
          sx={{
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            wordBreak: "break-word",
            width: "100%",
          }}
        >
          asdsadsadasdsadsadasdsadsadasdsadsadasdsadsadasdsadsadasdsadsadasdsadsadasdsadsad
        </Typography>
        <Button
          size="small"
          startIcon={<Icon icon="solar:trash-bin-minimalistic-linear" />}
        >
          Xóa
        </Button>
      </Stack>
    </Box>
  );
}

function RenderQuantity(props) {
  const { row, rows, setRows } = props;

  function addQuantity() {
    setRows((preCarts) => {
      const updateCarts = preCarts.map((cart) => {
        if (cart.id == row.id) {
          return { ...cart, quantity_cart: cart.quantity_cart + 1 };
        }
        return cart;
      });

      return updateCarts;
    });
  }

  function decQuantity() {
    setRows((preCarts) => {
      const updateCarts = preCarts.map((cart) => {
        if (cart.id == row.id) {
          return { ...cart, quantity_cart: cart.quantity_cart - 1 };
        }
        return cart;
      });

      return updateCarts;
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        gap: "4px",
      }}
    >
      <Stack
        sx={{
          border: "1px solid black",
          flexDirection: "row",
          alignItems: "center",
          gap: "8px",
          padding: "4px",
          borderColor: "divider",
          borderRadius: "8px",
        }}
      >
        <IconButton
          size="small"
          sx={{ borderRadius: "8px" }}
          onClick={() => decQuantity()}
          disabled={row.quantity_cart == 1}
        >
          <Icon icon="eva:minus-fill" width={16} height={16} />
        </IconButton>
        <Typography>{row.quantity_cart}</Typography>
        <IconButton
          size="small"
          sx={{ borderRadius: "8px" }}
          onClick={() => addQuantity()}
          disabled={row.quantity_cart == row.remain}
        >
          <Icon icon="eva:plus-fill" width={16} height={16} />
        </IconButton>
      </Stack>
      <Typography variant="captiontext" color={"text.secondary"}>
        available: {row.remain}
      </Typography>
    </Box>
  );
}

const DataGridHeader = (rows, setRows) => {
  return [
    {
      field: "name",
      headerName: "Product",
      flex: 1,
      renderCell: (params) => <RenderProduct row={params.row} />,
    },
    {
      field: "price",
      headerName: "Price",
      width: 90,
      valueGetter: (value, row) => {
        if (row.sales === null) {
          return formatCurrency(row.price * row.quantity_cart);
        }
        return formatCurrency(row.sales * row.quantity_cart);
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 130,
      renderCell: (params) => (
        <RenderQuantity {...params} rows={rows} setRows={setRows} />
      ),
    },
    {
      field: "total",
      headerName: "Total Price",
      width: 130,
      headerAlign: "right",
      align: "right",
      valueGetter: (value, row) => {
        if (row.sales === null) {
          return formatCurrency(row.price * row.quantity_cart);
        }
        return formatCurrency(row.sales * row.quantity_cart);
      },
    },
  ];
};

export default DataGridHeader;
