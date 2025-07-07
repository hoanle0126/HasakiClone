import CustomerLayout from "@/layouts/ClientLayout/CustomerLayout";
import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        bgcolor: "background.paper",
        width: "100%",
        padding: "16px",
        gap: "12px",
      }}
    >
      <Typography variant="h6">Sổ địa chỉ</Typography>
      <Grid container spacing="20px">
        {[1, 2, 3, 4].map((item, index) => (
          <Grid size={6} key={index}>
            <Stack
              sx={{
                borderWidth: 1,
                borderStyle: "dashed",
                borderColor: "text.secondary",
                padding: "8px",
                gap: "4px",
              }}
            >
              <Stack direction="row" gap="4px">
                <Typography variant="subtitle2">Lê Văn Xuân Hoàn</Typography>
                <Typography variant="body2">-</Typography>
                <Typography variant="body2">0705079830</Typography>
                <div className="flex-1"></div>
                <Typography variant="body2">Chỉnh sửa</Typography>
              </Stack>
              <Typography variant="body2">
                Lô 15 C10 Văn Tiến Dũng, Phường Điện Ngọc, Thị xã Điện Bàn,
                Quảng Nam
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Stack
        sx={{
          flexDirection: "row",
          paddingTop: "20px",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Typography variant="body2">
          Bạn muốn giao hàng đến địa chỉ khác?
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: "20px",
          }}
          onClick={()=>navigate("/customer/address/new")}
        >
          Thêm địa chỉ mới
        </Button>
      </Stack>
    </Stack>
  );
};

export default AddressPage;
