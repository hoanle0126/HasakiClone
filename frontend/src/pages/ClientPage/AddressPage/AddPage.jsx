import CustomerLayout from "@/layouts/ClientLayout/CustomerLayout";
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddressAddPage = () => {
  const navigate = useNavigate();
  const [city, setCity] = React.useState(-1);

  return (
    <Stack
      sx={{
        bgcolor: "background.paper",
        width: "100%",
        padding: "16px",
        gap: "12px",
      }}
    >
      <Typography variant="h6">Thêm địa chỉ mới</Typography>
      <Grid container spacing="40px">
        <Grid size={6}>
          <Stack gap="20px">
            {/* Tên */}
            <Stack gap="4px">
              <Typography variant="subtitle2">Tên</Typography>
              <OutlinedInput size="small" />
              <Typography variant="body2" color="text.secondary">
                Độ dài phải từ 2 -50 kí tự
              </Typography>
            </Stack>
            {/* End Tên */}
            {/* Họ */}
            <Stack gap="4px">
              <Typography variant="subtitle2">Họ</Typography>
              <OutlinedInput size="small" />
              <Typography variant="body2" color="text.secondary">
                Độ dài phải từ 2 -50 kí tự
              </Typography>
            </Stack>
            {/* End Họ */}
            {/* Số điện thoại */}
            <Stack gap="4px">
              <Typography variant="subtitle2">Số điện thoại</Typography>
              <OutlinedInput
                size="small"
                placeholder="Số điện thoại"
                type="number"
              />
            </Stack>
            {/* End số điện thoại */}
          </Stack>
        </Grid>
        <Grid size={6}>
          <Stack gap="20px">
            {/* Tỉnh/ thành phố */}
            <Stack gap="4px">
              <Typography variant="subtitle2">Tỉnh/ thành phố</Typography>
              <FormControl fullWidth size="small">
                <Select
                  displayEmpty
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <MenuItem disabled value={-1}>
                    Vui lòng chọn tỉnh/ thành phố
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            {/* End Tỉnh/ thành phố */}
            {/* Quận/ huyện */}
            <Stack gap="4px">
              <Typography variant="subtitle2">Quận/ huyện</Typography>
              <FormControl fullWidth size="small">
                <Select
                  displayEmpty
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <MenuItem disabled value={-1}>
                    Vui lòng chọn quận/ huyện
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            {/* End Quận/ huyện */}
            {/* Phường/ xã */}
            <Stack gap="4px">
              <Typography variant="subtitle2">Phường/ xã</Typography>
              <FormControl fullWidth size="small">
                <Select
                  displayEmpty
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <MenuItem disabled value={-1}>
                    Vui lòng chọn phường/ xã
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            {/* End Phường/ xã */}
            {/* Địa chỉ nhận hàng */}
            <Stack gap="4px">
              <Typography variant="subtitle2">Địa chỉ nhận hàng</Typography>
              <OutlinedInput
                size="small"
                placeholder="Số nhà + Tên đường"
                disabled
              />
            </Stack>
            {/* End địa chỉ nhận hàng */}
            {/* Default */}
            <Stack direction="row" alignItems="center" gap="4px">
              <Checkbox sx={{ padding: 0 }} size="small" />
              <Typography variant="body2">Đặt làm địa chỉ mặt định</Typography>
            </Stack>
            {/* End default */}
            {/* Action */}
            <Stack
              direction="row"
              alignItems="center"
              gap="12px"
              justifyContent="center"
            >
              <Button
                variant="outlined"
                color="common"
                onClick={() => navigate(-1)}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                }}
              >
                Cập nhật
              </Button>
            </Stack>
            {/* End Action */}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AddressAddPage;
