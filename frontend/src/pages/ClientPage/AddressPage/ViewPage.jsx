/* eslint-disable react-hooks/exhaustive-deps */
import CustomerLayout from "@/layouts/ClientLayout/CustomerLayout";
import { getAllCities } from "@/store/cities/action";
import {
  addNewAddress,
  showAddress,
  updateAddress,
} from "@/store/users/action";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const AddressViewPage = () => {
  const navigate = useNavigate();
  const { addressValue, loading } = useSelector((store) => store.user);
  const { cities } = useSelector((store) => store.cities);
  const [listCities, setListCities] = React.useState({
    districts: [],
    wards: [],
  });
  const [address, setAddress] = React.useState();
  const dispatch = useDispatch();
  const { id } = useParams();

  const getDistrics = (value) => {
    return cities.filter((item) => item.name === value)[0]?.districts;
  };

  const getWards = (value) => {
    return listCities.districts.filter((item) => item.name === value)[0].wards;
  };

  const getValue = async () => {
    await dispatch(getAllCities());
    await dispatch(showAddress(id));
  };

  React.useEffect(() => {
    getValue();
  }, []);

  React.useEffect(() => {
    setAddress(addressValue);
  }, [addressValue, loading]);

  React.useEffect(() => {
    console.log("Address", address);
  }, [address]);

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
              <OutlinedInput
                size="small"
                value={address?.name}
                onChange={(e) =>
                  setAddress({ ...address, name: e.target.value })
                }
              />
              <Typography variant="body2" color="text.secondary">
                Độ dài phải từ 2 -50 kí tự
              </Typography>
            </Stack>
            {/* End Tên */}
            {/* Số điện thoại */}
            <Stack gap="4px">
              <Typography variant="subtitle2">Số điện thoại</Typography>
              <OutlinedInput
                size="small"
                placeholder="Số điện thoại"
                type="number"
                value={address?.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />
            </Stack>
            {/* End số điện thoại */}
          </Stack>
        </Grid>
        <Grid size={6}>
          <Stack gap="20px">
            {/* Tỉnh/ thành phố */}
            <Stack gap="4px">
              <Typography variant="subtitle2">Tỉnh/ Thành phố</Typography>
              <FormControl fullWidth size="small">
                <Select
                  displayEmpty
                  value={String(address?.province)}
                  onChange={(e) => {
                    setAddress({ ...address, province: e.target.value });
                  }}
                >
                  {/* <MenuItem disabled value={""}>
                    Vui lòng chọn tỉnh/ thành phố
                  </MenuItem> */}
                  {cities?.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
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
                  value={String(address?.district)}
                  onChange={(e) => {
                    setAddress({ ...address, district: e.target.value });
                  }}
                >
                  <MenuItem disabled value={""}>
                    Vui lòng chọn quận/ huyện
                  </MenuItem>
                  {address?.districts?.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
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
                  value={String(address?.ward)}
                  onChange={(e) =>
                    setAddress({ ...address, ward: e.target.value })
                  }
                >
                  <MenuItem disabled value={""}>
                    Vui lòng chọn phường/ xã
                  </MenuItem>
                  {address?.wards?.map((item, index) => (
                    <MenuItem value={item.name} key={index}>
                      {item.name}
                    </MenuItem>
                  ))}
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
                value={address?.street_address}
                onChange={(e) =>
                  setAddress({ ...address, street_address: e.target.value })
                }
              />
            </Stack>
            {/* End địa chỉ nhận hàng */}
            {/* Default */}
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{
                "& .default__checkbox": {
                  bgcolor: "#333",
                },
              }}
            >
              <input
                type="checkbox"
                checked={address?.default}
                onChange={(e) => {
                  setAddress({ ...address, default: e.target.checked });
                }}
                className="w-[16px] h-[16px] default__checkbox"
              />
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
                onClick={async () => {
                  await dispatch(updateAddress(address, id));
                  navigate(-1);
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

export default AddressViewPage;
