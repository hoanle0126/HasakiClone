import { MuiTheme } from "@/theme";
import { Icon } from "@iconify/react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { DaMatList } from "./damat";
import { MyPhamList } from "./mypham";

const ClientHeader = () => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (e) => {
      // Nếu lăn theo chiều dọc, chuyển thành cuộn ngang
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);
  const [onDanhMuc, setOnDanhMuc] = React.useState(false);

  return (
    <>
      <AppBar
        sx={{
          boxShadow: "none",
          top: 0,
          left: 0,
        }}
        position="sticky"
      >
        <Stack
          sx={{
            paddingX: "120px",
            backgroundColor: "#084322",
          }}
        >
          <img
            src="https://media.hcdn.vn/hsk/1749726223top14156.jpg"
            width="100%"
            height="50px"
          />
        </Stack>
        <Stack
          direction="row"
          sx={{
            alignItems: "end",
            height: "84px",
            paddingX: "120px",
            gap: "24px",
            paddingBottom: "16px",
          }}
        >
          <img
            src="https://media.hcdn.vn/hsk/icon/logo_site_v2.png?v=2025061316"
            className="h-[42px] w-[180px]"
          />
          <Stack gap="4px" flex={1}>
            <Stack direction="row" gap="12px">
              {[
                "Kem chống nắng",
                "Tẩy trang",
                "Sửa rửa mặt",
                "Tẩy tế bào chết",
                "Kem chống nắng Sunplay",
              ].map((item, index) => (
                <Typography
                  key={index}
                  variant="captiontext"
                  color="background.paper"
                >
                  {item}
                </Typography>
              ))}
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                width: "100%",
                height: "36px",
                backgroundColor: "#fff",
                borderRadius: "36px",
                alignItems: "center",
                paddingRight: "8px",
              }}
            >
              <TextField
                placeholder="Tìm sản phẩm, thương hiệu bạn mong muốn..."
                sx={{
                  flex: 1,
                  "& input::placeholder": {
                    fontSize: "12px",
                  },
                  "& input": {
                    fontSize: "12px",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
              <Icon
                icon="eva:search-fill"
                width="32"
                height="32"
                color={MuiTheme().palette.primary.main}
              />
            </Stack>
          </Stack>
          <Stack direction="row" gap="12px" alignItems="center">
            <Icon icon="solar:user-circle-outline" width="32" height="32" />
            <Stack>
              <Typography variant="captiontext">Đăng nhập / Đăng ký</Typography>
              <Stack direction="row" gap="12px">
                <Typography variant="captiontext">Tài khoản</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" gap="12px" alignItems="center">
            <Icon icon="solar:shop-linear" width="32" height="32" />
            <Stack>
              <Typography variant="captiontext">Hệ thống</Typography>
              <Typography variant="captiontext">cửa hàng</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" gap="12px" alignItems="center">
            <Icon icon="solar:shield-check-bold" width="32" height="32" />
            <Stack>
              <Typography variant="captiontext">Bảo</Typography>
              <Typography variant="captiontext">hành</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" gap="12px" alignItems="center">
            <Icon icon="solar:phone-bold" width="32" height="32" />
            <Stack>
              <Typography variant="captiontext">Hỗ trợ</Typography>
              <Typography variant="captiontext">khách hàng</Typography>
            </Stack>
          </Stack>
          <Stack justifyContent="end" height="100%">
            <Icon
              icon="solar:cart-large-minimalistic-linear"
              width="32"
              height="32"
            />
          </Stack>
        </Stack>
      </AppBar>
      <Stack
        sx={{
          flexDirection: "row",
          backgroundColor: "primary.light",
          paddingX: "120px",
          color: "primary.main",
          gap: "8px",
          alignItems: "center",
          height: "36px",
        }}
      >
        <Button
          direction="row"
          gap="4px"
          alignItems="center"
          height="100%"
          onMouseEnter={() => setOnDanhMuc(true)}
          onMouseLeave={() => setOnDanhMuc(false)}
        >
          <Icon
            icon="solar:hamburger-menu-outline"
            width="28"
            height="28"
            color={MuiTheme().palette.primary.main}
          />
          <Typography
            variant="captiontext"
            textTransform="uppercase"
            color="primary.main"
            fontWeight={600}
          >
            Danh mục |
          </Typography>
        </Button>
        {[
          { title: "Hasaki deals" },
          { title: "hot deals" },
          { title: "thương hiệu" },
          { title: "hàng mới về" },
          { title: "bán chạy" },
          { title: "clinic & spa" },
          { title: "dermahair" },
        ].map((item, index) => (
          <Typography
            key={index}
            textTransform="uppercase"
            variant="captiontext"
            fontWeight={600}
          >
            {item.title}
          </Typography>
        ))}
        <div className="flex-1"></div>
        {[{ title: "Tra cứu đơn hàng" }, { title: "Tải ứng dụng" }].map(
          (item, index) => (
            <Typography key={index} variant="captiontext">
              {item.title} |
            </Typography>
          )
        )}
        <Stack direction="row" gap="4px" alignItems="center">
          <Icon icon="solar:map-point-bold" width="24" height="24" />
          <Typography variant="captiontext" fontWeight={600}>
            Chọn khu vực của bạn
          </Typography>
        </Stack>
      </Stack>
      <Grid
        container
        sx={{
          paddingX: "120px",
          position: "absolute",
          width: "100%",
          zIndex: "10000",
        }}
      >
        {onDanhMuc && (
          <Grid size={2}>
            <Stack
              sx={{
                border: "1px solid black",
                backgroundColor: "background.paper",
              }}
              onMouseEnter={() => setOnDanhMuc(true)}
              onMouseLeave={() => setOnDanhMuc(false)}
            >
              <Typography
                variant="captiontext"
                fontWeight={600}
                padding="8px 12px"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "grey.0",
                  },
                }}
              >
                Sức Khỏe - Làm Đẹp
              </Typography>
              {[
                { title: "Mỹ phẩm High-End" },
                { title: "Chăm sóc da mặt" },
                { title: "Trang điểm" },
                { title: "Chăm sóc tóc và da đầu" },
                { title: "chăm sóc cơ thể" },
                { title: "chăm sóc cá nhân" },
                { title: "nước hoa" },
                { title: "thực phẩm chức năng" },
              ].map((item, index) => (
                <Stack
                  key={index}
                  sx={{
                    padding: "8px 12px",
                    flexDirection: "row",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "secondary.main",
                      color: "grey.0",
                    },
                  }}
                >
                  <Typography variant="captiontext" textTransform="capitalize">
                    {item.title}
                  </Typography>
                  <div className="flex-1"></div>
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    width="20"
                    height="20"
                  />
                </Stack>
              ))}
              <Stack
                sx={{
                  padding: "8px 12px",
                  flexDirection: "row",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "grey.0",
                  },
                }}
              >
                <Typography
                  variant="captiontext"
                  fontWeight={600}
                  textTransform="capitalize"
                >
                  Hasaki clinic & spa
                </Typography>
                <div className="flex-1"></div>
                <Icon
                  icon="solar:alt-arrow-right-linear"
                  width="20"
                  height="20"
                />
              </Stack>
              <Stack
                sx={{
                  padding: "8px 12px",
                  flexDirection: "row",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "secondary.main",
                      color: "grey.0",
                    },
                }}
              >
                <Typography
                  variant="captiontext"
                  fontWeight={600}
                  textTransform="capitalize"
                >
                  Dermahair
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        )}
        {/* <Grid size={6}>
          <Grid
            container
            sx={{
              border: "1px solid black",
              height: "100%",
            }}
          >
            <Grid size={8}>
              <Box
                ref={containerRef}
                sx={{
                  paddingY: "16px",
                  maxHeight: "392px",
                  columnCount: 2,
                  overflowX: "auto",
                  "&::-webkit-scrollbar": {
                    display: "none", // Chrome, Safari
                  },
                }}
              >
                {MyPhamList.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      breakInside: "avoid",
                    }}
                  >
                    <Typography
                      variant="captiontext"
                      padding="2px 12px"
                      display="block"
                      fontWeight={600}
                    >
                      {item.title}
                    </Typography>
                    {item.children &&
                      item.children.map((itemChild, indexChild) => (
                        <Typography
                          key={indexChild}
                          variant="captiontext"
                          padding="2px 12px"
                          textTransform="capitalize"
                          display="block"
                        >
                          {itemChild.title}
                        </Typography>
                      ))}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid size={4}>
              <Stack
                sx={{
                  position: "relative",
                  flexDirection: "column",
                  alignItems: "end",
                  height: "100%",
                }}
              >
                <img
                  src="https://hasaki.vn/img/hsk/banner/menu-category-my-pham-high-end-210x400---02012025.png"
                  alt=""
                  className="absolute -right-[50px] bottom-0  h-full"
                />
              </Stack>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </>
  );
};

export default ClientHeader;
