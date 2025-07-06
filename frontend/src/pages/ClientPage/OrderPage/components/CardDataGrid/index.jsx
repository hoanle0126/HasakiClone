import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext } from "react";
import DataGridHeader from "./DataGridHeader";
import DataGridToolbar from "./DataGridToolbar";
import { MuiTheme } from "@/Theme";
import { typography } from "@/Theme/elements/typography";
import { Icon } from "@iconify/react";
import { useStateContext } from "../../../../../Context";
import { useNavigate } from "react-router-dom";

const CardDataGrid = () => {
  const { cart, setCart } = useStateContext();
  const navigate = useNavigate();
  const [products, setProducts] = React.useState(cart.products);
  const downSm = useMediaQuery(MuiTheme().breakpoints.down("sm"));

  React.useEffect(() => {
    setCart({ ...cart, products: products });
  }, [products]);

  return (
    <>
      <Box>
        <DataGrid
          rows={cart.products}
          columns={DataGridHeader(products, setProducts)
          }
          hideFooter
          rowHeight={120}
          disableColumnSorting
          disableColumnMenu
          disableColumnResize
          slots={{
            toolbar: DataGridToolbar,
          }}
          sx={{
            border:"none",
            outline: "none",
            backgroundColor: "background.paper",
            "--unstable_DataGrid-headWeight": 500,
            "--DataGrid-containerBackground":
              MuiTheme().palette.background.neutral,
            "& .MuiDataGrid-row": {
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&.Mui-selected": {
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
            },
            "& .MuiDataGrid-columnHeader": {
              cursor: "default",
              color: "text.secondary",
              backgroundColor:"background.neutral",
              "&:focus": {
                outline: "none",
              },
            },
            "&  .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Box>
    </>
  );
};

export default CardDataGrid;
