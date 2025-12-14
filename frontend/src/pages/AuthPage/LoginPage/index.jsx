import { Icon } from "@iconify/react";
import {
  Button,
  ButtonBase,
  Stack,
  Typography,
  Box,
  InputAdornment,
  TextField,
  useTheme,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/users/action";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { authLoading, authError, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, ${theme.palette.primary.lighter} 30%, ${theme.palette.primary.light} 60%, ${theme.palette.primary.main} 100%)`,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: "20px", md: "40px" },
        "&::before": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        },
      }}
    >
      {/* Logo ở góc trên bên trái */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "20px", md: "40px" },
          left: { xs: "20px", md: "40px" },
          zIndex: 10,
        }}
      >
        <Link to="/">
          <Box
            component="img"
            src="https://media.hcdn.vn/hsk/icon/logo_site_v2.png?v=2025061316"
            alt="Hasaki Logo"
            sx={{
              height: "42px",
              width: "180px",
              // Convert logo to primary color (#326e51)
              filter: `brightness(0) saturate(100%) invert(25%) sepia(50%) saturate(1500%) hue-rotate(110deg) brightness(0.8) contrast(1.1)`,
            }}
          />
        </Link>
      </Box>

      {/* Card trung tâm */}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            login({
              user: form,
              onSuccess: () => {
                navigate("/");
              },
            })
          );
        }}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: "450px", md: "500px" },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: { xs: "32px 24px", md: "40px" },
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            maxHeight: "calc(100vh - 80px)",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "3px",
            },
          }}
        >
          {/* Icon ở trên cùng */}
          <Stack alignItems="center" marginBottom="20px">
            <Box
              sx={{
                width: "48px",
                height: "48px",
                backgroundColor: "#1E293B",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              <Icon icon="solar:arrow-right-bold" width="24" height="24" color="#fff" />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1E293B",
                marginBottom: "6px",
                fontSize: { xs: "22px", md: "28px" },
              }}
            >
              Đăng nhập với email
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#64748B",
                textAlign: "center",
                fontSize: { xs: "12px", md: "13px" },
              }}
            >
              Tạo tài khoản mới để mang từ ngữ, dữ liệu và nhóm của bạn lại với nhau. Miễn phí.
            </Typography>
          </Stack>

          <Stack gap="16px" sx={{ width: "100%" }}>
            {/* Email Field */}
            <TextField
              fullWidth
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.2)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1E293B",
                  },
                },
                "& input": {
                  padding: "12px 16px",
                  fontSize: "14px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="solar:letter-linear" width="20" height="20" color="#64748B" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.2)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1E293B",
                  },
                },
                "& input": {
                  padding: "12px 16px",
                  fontSize: "14px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="solar:lock-bold" width="20" height="20" color="#64748B" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <ButtonBase
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ padding: "4px" }}
                    >
                      <Icon
                        icon={showPassword ? "solar:eye-closed-linear" : "solar:eye-linear"}
                        width="20"
                        height="20"
                        color="#64748B"
                      />
                    </ButtonBase>
                  </InputAdornment>
                ),
              }}
            />

            {/* Forgot password */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link
                to="/quen-mat-khau"
                style={{
                  textDecoration: "none",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748B",
                    cursor: "pointer",
                    fontSize: "13px",
                    "&:hover": {
                      color: "#1E293B",
                    },
                  }}
                >
                  Quên mật khẩu?
                </Typography>
              </Link>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading={authLoading}
              sx={{
                backgroundColor: "#1E293B",
                color: "#fff",
                borderRadius: "12px",
                padding: "12px",
                fontSize: "15px",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#0F172A",
                },
              }}
            >
              Đăng nhập
            </Button>

            {authError && (
              <Typography
                variant="body2"
                color="error"
                textAlign="center"
                sx={{ fontSize: "13px" }}
              >
                {authError}
              </Typography>
            )}

            {/* Separator */}
            <Divider
              sx={{
                marginY: "8px",
                "&::before, &::after": {
                  borderColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#64748B",
                  fontSize: "13px",
                  paddingX: "16px",
                }}
              >
                Hoặc đăng nhập với
              </Typography>
            </Divider>

            {/* Social Login Buttons */}
            <Stack direction="row" gap="12px">
              <ButtonBase
                sx={{
                  flex: 1,
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "12px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  style={{ width: "20px", height: "20px" }}
                />
              </ButtonBase>
              <ButtonBase
                sx={{
                  flex: 1,
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "12px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <Icon icon="logos:facebook" width="24" height="24" />
              </ButtonBase>
            </Stack>

            {/* Sign up link */}
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                color: "#64748B",
                fontSize: "13px",
                marginTop: "8px",
              }}
            >
              Bạn chưa có tài khoản?{" "}
              <Link
                to="/dang-ky"
                style={{
                  color: "#1E293B",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Đăng ký ngay
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;

