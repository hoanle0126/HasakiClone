import { register, verifyEmail } from "@/store/users/action";
import { Icon } from "@iconify/react";
import {
  Button,
  ButtonBase,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  Typography,
  Box,
  TextField,
  InputAdornment,
  useTheme,
  Divider,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Helper data cho Tháng và Năm (Ngày sẽ được tạo động)
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i);

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { authLoading, authError, user } = useSelector((state) => state.user);
  const [getVerificationCode, setGetVerificationCode] = React.useState(false);

  const [registerForm, setRegisterForm] = React.useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    gender: "male",
    verificationCode: "",
    birth: {
      day: "",
      month: "",
      year: "",
    },
    acceptTerms: false,
  });

  React.useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user, navigate]);

  // 1. Tính toán số ngày dựa trên Tháng và Năm đã chọn
  const daysInMonth = useMemo(() => {
    const { month, year } = registerForm.birth;
    if (!month) return 31;
    return new Date(year || CURRENT_YEAR, month, 0).getDate();
  }, [registerForm.birth]);

  // Tạo mảng ngày để render option
  const listDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 2. Tự động reset ngày nếu ngày đã chọn vượt quá số ngày của tháng mới
  useEffect(() => {
    const { day } = registerForm.birth;
    if (day && day > daysInMonth) {
      setRegisterForm((prev) => ({
        ...prev,
        birth: { ...prev.birth, day: "" },
      }));
    }
  }, [daysInMonth, registerForm.birth]);

  const handleChangeBirth = (field, value) => {
    setRegisterForm({
      ...registerForm,
      birth: {
        ...registerForm.birth,
        [field]: value,
      },
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const birthDateString = `${registerForm.birth.year}-${registerForm.birth.month}-${registerForm.birth.day}`;

    const payload = {
      ...registerForm,
      birth: birthDateString,
    };

    await dispatch(
      register({
        user: payload,
        onSuccess: () => {
          navigate("/");
        },
      })
    );
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
        onSubmit={handleRegister}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: "500px", md: "550px" },
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
              <Icon icon="solar:user-plus-bold" width="24" height="24" color="#fff" />
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
              Đăng ký tài khoản
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
              placeholder="Email hoặc số điện thoại"
              value={registerForm.email}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, email: e.target.value })
              }
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

            {/* Verification Code Field */}
            <Stack direction="row" gap="8px" sx={{ alignItems: "stretch" }}>
              <TextField
                placeholder="Mã xác nhận 6 chữ số"
                type="number"
                value={registerForm.verificationCode}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    verificationCode: e.target.value,
                  })
                }
                disabled={registerForm.email === ""}
                sx={{
                  flex: 1,
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
              />
              <Button
                disabled={registerForm.email === ""}
                variant="contained"
                onClick={() => {
                  dispatch(verifyEmail(registerForm));
                  setGetVerificationCode(true);
                }}
                sx={{
                  borderRadius: "12px",
                  paddingX: "24px",
                  backgroundColor: "#1E293B",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  "&:hover": {
                    backgroundColor: "#0F172A",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(0, 0, 0, 0.12)",
                  },
                }}
              >
                Lấy mã
              </Button>
              <Snackbar
                message="Mã xác nhận đã được gửi đến email của bạn"
                open={getVerificationCode}
                onClose={() => setGetVerificationCode(false)}
                autoHideDuration={3000}
              />
            </Stack>

            {/* Password Field */}
            <TextField
              fullWidth
              type="password"
              placeholder="Mật khẩu từ 6 - 32 ký tự"
              value={registerForm.password}
              onChange={(e) =>
                setRegisterForm({
                  ...registerForm,
                  password: e.target.value,
                })
              }
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
              }}
            />

            {/* Last Name Field */}
            <TextField
              fullWidth
              placeholder="Họ"
              value={registerForm.last_name}
              onChange={(e) =>
                setRegisterForm({
                  ...registerForm,
                  last_name: e.target.value,
                })
              }
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
                    <Icon icon="solar:user-bold" width="20" height="20" color="#64748B" />
                  </InputAdornment>
                ),
              }}
            />

            {/* First Name Field */}
            <TextField
              fullWidth
              placeholder="Tên"
              value={registerForm.first_name}
              onChange={(e) =>
                setRegisterForm({
                  ...registerForm,
                  first_name: e.target.value,
                })
              }
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
                    <Icon icon="solar:user-bold" width="20" height="20" color="#64748B" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Gender Radio */}
            <FormControl>
              <RadioGroup
                row
                value={registerForm.gender}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    gender: e.target.value,
                  })
                }
                sx={{ 
                  gap: "16px", 
                  justifyContent: "flex-start",
                  paddingLeft: "16px",
                }}
              >
                <FormControlLabel
                  value="Nam"
                  control={<Radio size="small" sx={{ padding: 0 }} />}
                  label={<Typography variant="body2">Nam</Typography>}
                  sx={{ gap: "8px" }}
                />
                <FormControlLabel
                  value="Nữ"
                  control={<Radio size="small" sx={{ padding: 0 }} />}
                  label={<Typography variant="body2">Nữ</Typography>}
                  sx={{ gap: "8px" }}
                />
              </RadioGroup>
            </FormControl>

            {/* Birth Date Selects */}
            <Stack
              direction="row"
              gap="8px"
              sx={{
                "& select": {
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  fontSize: "14px",
                  outline: "none",
                  "&:hover": {
                    borderColor: "rgba(0, 0, 0, 0.2)",
                  },
                  "&:focus": {
                    borderColor: "#1E293B",
                  },
                },
              }}
            >
              <select
                value={registerForm.birth.year}
                onChange={(e) => handleChangeBirth("year", e.target.value)}
              >
                <option value="">Năm</option>
                {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                value={registerForm.birth.month}
                onChange={(e) => handleChangeBirth("month", e.target.value)}
              >
                <option value="">Tháng</option>
                {MONTHS.map((month) => (
                  <option
                    key={month}
                    value={month < 10 ? `0${month}` : month}
                  >
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={registerForm.birth.day}
                onChange={(e) => handleChangeBirth("day", e.target.value)}
              >
                <option value="">Ngày</option>
                {listDays.map((day) => (
                  <option key={day} value={day < 10 ? `0${day}` : day}>
                    {day}
                  </option>
                ))}
              </select>
            </Stack>

            {/* Accept Terms */}
            <Stack
              direction="row"
              alignItems="start"
              gap="8px"
            >
              <Checkbox
                checked={registerForm.acceptTerms}
                onChange={(e) => {
                  setRegisterForm({
                    ...registerForm,
                    acceptTerms: e.target.checked,
                  });
                }}
                size="small"
                sx={{ padding: 0 }}
              />
              <Typography variant="caption" sx={{ fontSize: "12px", color: "#64748B" }}>
                Tôi đã đọc và đồng ý với{" "}
                <a href="#" style={{ color: "#1E293B", textDecoration: "underline" }}>
                  Điều kiện giao dịch chung
                </a>{" "}
                và{" "}
                <a href="#" style={{ color: "#1E293B", textDecoration: "underline" }}>
                  Chính sách bảo mật thông tin
                </a>{" "}
                của Hasaki
              </Typography>
            </Stack>

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
              Đăng ký
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
                Hoặc đăng ký với
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

            {/* Sign in link */}
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                color: "#64748B",
                fontSize: "13px",
                marginTop: "8px",
              }}
            >
              Bạn đã có tài khoản?{" "}
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

export default RegisterPage;

