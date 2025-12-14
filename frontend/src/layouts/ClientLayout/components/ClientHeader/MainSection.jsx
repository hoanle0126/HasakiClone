import { logout } from "@/store/users/action";
import { getCategoryById } from "@/store/categories/action";
import { MuiTheme } from "@/theme";
import { Icon } from "@iconify/react";
import {
  AppBar,
  Badge,
  Button,
  ButtonBase,
  Drawer,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MainSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openUserEl, setOpenUserEl] = React.useState(null);
  const [openMobileMenu, setOpenMobileMenu] = React.useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const theme = useTheme();

  React.useEffect(() => {
    if (user.email) {
      setOpenUserEl(null);
    }
  }, [user]);

  React.useEffect(() => {
    setOpenUserEl(null);
    setOpenMobileMenu(false);
  }, [location.pathname]);

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        top: 0,
        left: 0,
      }}
      position="sticky"
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "end",
          height: "84px",
          paddingX: { xs: "20px", sm: "40px", md: "80px", lg: "120px" },
          gap: "24px",
          paddingBottom: "16px",
        }}
      >
        <Link to="/">
          <img
            src="https://media.hcdn.vn/hsk/icon/logo_site_v2.png?v=2025061316"
            className="h-[42px] w-[180px]"
          />
        </Link>
        {/* Mobile Menu Button */}
        <IconButton
          sx={{
            display: { xs: "flex", sm: "none" },
            color: "background.paper",
            marginLeft: "auto",
          }}
          onClick={() => setOpenMobileMenu(true)}
        >
          <Icon icon="solar:hamburger-menu-outline" width="32" height="32" />
        </IconButton>
        <Stack 
          gap="4px" 
          flex={1}
          sx={{
            display: { xs: "none", sm: "flex" },
          }}
        >
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
              color={theme.palette.primary.main}
            />
          </Stack>
        </Stack>
        {/* Đăng nhập / Đăng ký */}
        <Stack
          direction="row"
          gap="12px"
          alignItems="center"
          onClick={(e) =>
            user.email
              ? setOpenUserEl(e.currentTarget)
              : navigate("/dang-nhap")
          }
          sx={{
            display: { xs: "none", sm: "flex" },
            cursor: "pointer",
          }}
        >
          <Icon icon="solar:user-circle-outline" width="32" height="32" />
          {user.first_name ? (
            <Stack>
              <Typography variant="captiontext">
                Chào {user.first_name}
              </Typography>
              <Stack direction="row" alignItems="center">
                <Typography variant="captiontext">Tài khoản</Typography>
                <Icon icon="solar:alt-arrow-down-bold" width="18" height="18" />
              </Stack>
            </Stack>
          ) : (
            <Stack>
              <Typography variant="captiontext">Đăng nhập / Đăng ký</Typography>
              <Stack direction="row" alignItems="center">
                <Typography variant="captiontext">Tài khoản</Typography>
                <Icon icon="solar:alt-arrow-down-bold" width="18" height="18" />
              </Stack>
            </Stack>
          )}
        </Stack>
        {/* Hỗ trợ */}
        <Link
          to="/lien-lac"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Stack 
            direction="row" 
            gap="12px" 
            alignItems="center"
            sx={{
              display: { xs: "none", sm: "flex" },
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            <Icon icon="solar:phone-bold" width="32" height="32" />
            <Stack>
              <Typography variant="captiontext">Hỗ trợ</Typography>
              <Typography variant="captiontext">khách hàng</Typography>
            </Stack>
          </Stack>
        </Link>
        {/* Giỏ hàng */}
        <Stack 
          justifyContent="end" 
          height="100%"
          sx={{
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Link to="/checkout/cart">
            <Badge badgeContent={user.cart?.length || 0} color="error">
              <Icon
                icon="solar:cart-large-minimalistic-linear"
                width="32"
                height="32"
              />
            </Badge>
          </Link>
        </Stack>
      </Stack>
      <Popover
        open={Boolean(openUserEl)}
        anchorEl={openUserEl}
        onClose={() => setOpenUserEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack
          sx={{
            padding: "12px",
            minWidth: 240,
            gap: "8px",
            "& .MuiStack-root": {
              cursor: "pointer",
              "&:hover": {
                color: "text.secondary",
              },
            },
          }}
        >
          <Link to="/customer/account/index">
            <Stack direction="row" alignItems="center" gap="8px">
              <Icon icon="solar:user-circle-linear" width={20} height={20} />
              <Typography variant="body2">Tài khoản của bạn</Typography>
            </Stack>
          </Link>
          <Link to="/customer/order/history">
            <Stack direction="row" alignItems="center" gap="8px">
              <Icon icon="solar:reorder-outline" width={20} height={20} />
              <Typography variant="body2">Quản lí đơn hàng</Typography>
            </Stack>
          </Link>
          <Link to="/customer/wishlist/index">
            <Stack direction="row" alignItems="center" gap="8px">
              <Icon icon="solar:heart-linear" width={20} height={20} />
              <Typography variant="body2">Sản phẩm yêu thích</Typography>
            </Stack>
          </Link>
          <Link to="/customer/address/index">
            <Stack direction="row" alignItems="center" gap="8px">
              <Icon icon="solar:map-point-linear" width={20} height={20} />
              <Typography variant="body2">Địa chỉ giao hàng</Typography>
            </Stack>
          </Link>
          <Stack
            direction="row"
            alignItems="center"
            gap="8px"
            onClick={() =>
              dispatch(
                logout({
                  onSuccess: () => {
                    setOpenUserEl(null);
                  },
                })
              )
            }
          >
            <Icon icon="solar:logout-2-linear" width={20} height={20} />
            <Typography variant="body2">Thoát</Typography>
          </Stack>
        </Stack>
      </Popover>
      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={openMobileMenu}
        onClose={() => setOpenMobileMenu(false)}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        <Stack
          sx={{
            width: 280,
            padding: "20px",
            gap: "16px",
            height: "100%",
          }}
        >
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={() => setOpenMobileMenu(false)}>
              <Icon icon="solar:close-circle-outline" width="24" height="24" />
            </IconButton>
          </Stack>
          <Divider />
          
          {/* Search Bar */}
          <Stack
            sx={{
              flexDirection: "row",
              width: "100%",
              height: "36px",
              backgroundColor: "#f5f5f5",
              borderRadius: "36px",
              alignItems: "center",
              paddingRight: "8px",
            }}
          >
            <TextField
              placeholder="Tìm sản phẩm..."
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
              width="24"
              height="24"
              color={theme.palette.primary.main}
            />
          </Stack>
          
          <Divider />
          
          {/* User Section */}
          <Stack
            gap="12px"
            onClick={() => {
              setOpenMobileMenu(false);
              if (user.email) {
                setOpenUserEl(document.body);
              } else {
                navigate("/dang-nhap");
              }
            }}
            sx={{
              cursor: "pointer",
              padding: "12px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <Stack direction="row" gap="12px" alignItems="center">
              <Icon icon="solar:user-circle-outline" width="32" height="32" />
              {user.first_name ? (
                <Stack>
                  <Typography variant="body2">
                    Chào {user.first_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Tài khoản
                  </Typography>
                </Stack>
              ) : (
                <Stack>
                  <Typography variant="body2">Đăng nhập / Đăng ký</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Tài khoản
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
          
          <Divider />
          
          {/* Cart */}
          <Link to="/checkout/cart" onClick={() => setOpenMobileMenu(false)}>
            <Stack
              direction="row"
              gap="12px"
              alignItems="center"
              sx={{
                padding: "12px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <Badge badgeContent={user.cart?.length || 0} color="error">
                <Icon
                  icon="solar:cart-large-minimalistic-linear"
                  width="32"
                  height="32"
                />
              </Badge>
              <Typography variant="body2">Giỏ hàng</Typography>
            </Stack>
          </Link>
          
          <Divider />
          
          {/* Sức Khỏe - Làm Đẹp */}
          <Stack
            direction="row"
            gap="12px"
            alignItems="center"
            onClick={() => {
              setOpenMobileMenu(false);
              dispatch(
                getCategoryById({
                  id: "suc-khoe-lam-dep",
                  onSuccess: () => {
                    navigate("/danh-muc/suc-khoe-lam-dep");
                  },
                })
              );
            }}
            sx={{
              cursor: "pointer",
              padding: "12px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <Icon icon="solar:health-outline" width="32" height="32" />
            <Typography variant="body2">Sức Khỏe - Làm Đẹp</Typography>
          </Stack>
          
          <Divider />
          
          {/* Support */}
          <Link
            to="/lien-lac"
            onClick={() => setOpenMobileMenu(false)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Stack
              direction="row"
              gap="12px"
              alignItems="center"
              sx={{
                padding: "12px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <Icon icon="solar:phone-bold" width="32" height="32" />
              <Stack>
                <Typography variant="body2">Hỗ trợ</Typography>
                <Typography variant="caption" color="text.secondary">
                  khách hàng
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </Stack>
      </Drawer>
    </AppBar>
  );
};

export default MainSection;
