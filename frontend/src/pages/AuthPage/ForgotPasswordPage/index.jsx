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
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement forgot password logic
    console.log("Forgot password for:", email);
  };

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
              filter: `brightness(0) saturate(100%) invert(25%) sepia(50%) saturate(1500%) hue-rotate(110deg) brightness(0.8) contrast(1.1)`,
            }}
          />
        </Link>
      </Box>

      {/* Card trung tâm */}
      <Box
        component="form"
        onSubmit={handleSubmit}
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
              <Icon icon="solar:lock-password-bold" width="24" height="24" color="#fff" />
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
              Quên mật khẩu
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#64748B",
                textAlign: "center",
                fontSize: { xs: "12px", md: "13px" },
              }}
            >
              Nhập email của bạn để nhận liên kết đặt lại mật khẩu
            </Typography>
          </Stack>

          <Stack gap="20px" sx={{ width: "100%" }}>
            {/* Email Field */}
            <TextField
              fullWidth
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
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
              Gửi liên kết đặt lại mật khẩu
            </Button>

            {/* Back to login link */}
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                color: "#64748B",
                fontSize: "13px",
                marginTop: "8px",
              }}
            >
              Nhớ mật khẩu?{" "}
              <Link
                to="/dang-nhap"
                style={{
                  color: "#1E293B",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Đăng nhập
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;

