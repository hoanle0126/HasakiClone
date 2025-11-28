import { register, verifyEmail } from "@/store/users/action";
import { Icon } from "@iconify/react";
import {
  Button,
  ButtonBase,
  Checkbox,
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Helper data cho Tháng và Năm (Ngày sẽ được tạo động)
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i);

const RegisterPage = ({ open, handleClose, navigate }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [registerForm, setRegisterForm] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "male",
    verificationCode: "",
    birth: {
      day: "",
      month: "",
      year: "",
    },
  });

  // 1. Tính toán số ngày dựa trên Tháng và Năm đã chọn
  const daysInMonth = useMemo(() => {
    const { month, year } = registerForm.birth;
    // Nếu chưa chọn tháng/năm thì mặc định hiển thị 31 ngày
    if (!month) return 31;

    // new Date(year, month, 0) sẽ trả về ngày cuối cùng của tháng đó
    // (JavaScript tính tháng từ 0-11, nhưng tham số thứ 3 là ngày 0 nghĩa là lùi lại 1 ngày của tháng kế tiếp)
    return new Date(year || CURRENT_YEAR, month, 0).getDate();
  }, [registerForm.birth.month, registerForm.birth.year]);

  // Tạo mảng ngày để render option
  const listDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 2. Tự động reset ngày nếu ngày đã chọn vượt quá số ngày của tháng mới (VD: 31/01 -> sang tháng 2 chỉ có 28 ngày)
  useEffect(() => {
    const { day } = registerForm.birth;
    if (day && day > daysInMonth) {
      setRegisterForm((prev) => ({
        ...prev,
        birth: { ...prev.birth, day: "" },
      }));
    }
  }, [daysInMonth, registerForm.birth.day]);

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

    // Validate cơ bản
    if (
      !registerForm.birth.day ||
      !registerForm.birth.month ||
      !registerForm.birth.year
    ) {
      alert("Vui lòng chọn đầy đủ ngày tháng năm sinh");
      return;
    }

    // Format lại thành YYYY-MM-DD để gửi lên server (MySQL chuẩn DATE)
    // Hoặc DD-MM-YYYY tùy theo backend bạn đã sửa
    const birthDateString = `${registerForm.birth.year}-${registerForm.birth.month}-${registerForm.birth.day}`;

    const payload = {
      ...registerForm,
      birth: birthDateString,
    };

    await dispatch(register({ user: payload, onSuccess: handleClose }));
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        "& .MuiPaper-root.MuiPaper-elevation": {
          borderRadius: 0,
          width: 400,
          position: "relative",
          a: { color: "info.main" },
        },
      }}
    >
      <ButtonBase
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bgcolor: "text.secondary",
          color: "background.paper",
          padding: "4px",
        }}
      >
        <Icon icon="eva:close-fill" width="24" height="24" />
      </ButtonBase>

      <Stack sx={{ width: "100%" }}>
        <Stack
          onSubmit={handleRegister}
          component="form"
          sx={{
            padding: "20px",
            borderBottomWidth: 1,
            borderColor: "divider",
            gap: "12px",
          }}
        >
          <Typography variant="body2">Đăng ký tài khoản</Typography>
          <Stack gap="12px" sx={{ width: "100%" }}>
            {/* Input Email */}
            <Stack
              sx={{
                borderWidth: 1,
                borderColor: "divider",
                padding: "4px 12px",
                flexDirection: "row",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <input
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
                className="focus:outline-none text-[13px] placeholder:text-[13px] flex-1"
                placeholder="Nhập email hoặc số điện thoại"
              />
              <Icon icon="solar:letter-linear" width="16" height="16" />
            </Stack>
            {/* Mã xác nhận */}
            <Stack
              sx={{
                borderWidth: 1,
                borderColor: "divider",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
              }}
            >
              <input
                className="focus:outline-none text-[13px] placeholder:text-[13px] flex-1 px-[12px]"
                placeholder="Nhập mã xác nhận 6 chữ số"
                type="number"
                value={registerForm.verificationCode}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    verificationCode: e.target.value,
                  })
                }
                disabled={registerForm.email == ""}
              />
              <Button
                disabled={registerForm.email == ""}
                variant="contained"
                onClick={() => {
                  dispatch(verifyEmail(registerForm));
                }}
              >
                Lấy mã
              </Button>
            </Stack>
            {/* Mã xác nhận */}
            {/* Input Password */}
            <Stack
              sx={{
                borderWidth: 1,
                borderColor: "divider",
                padding: "4px 12px",
                flexDirection: "row",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <input
                type="password"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
                className="focus:outline-none text-[13px] placeholder:text-[13px] flex-1"
                placeholder="Nhập mật khẩu từ 6 - 32 ký tự"
              />
              <Icon icon="solar:lock-bold" width="16" height="16" />
            </Stack>

            {/* Input Họ */}
            <Stack
              sx={{
                borderWidth: 1,
                borderColor: "divider",
                padding: "4px 12px",
                flexDirection: "row",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <input
                value={registerForm.lastName}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    lastName: e.target.value,
                  })
                }
                className="focus:outline-none text-[13px] placeholder:text-[13px] flex-1"
                placeholder="Nhập họ"
              />
              <Icon icon="solar:user-bold" width="16" height="16" />
            </Stack>

            {/* Input Tên */}
            <Stack
              sx={{
                borderWidth: 1,
                borderColor: "divider",
                padding: "4px 12px",
                flexDirection: "row",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <input
                value={registerForm.firstName}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    firstName: e.target.value,
                  })
                }
                className="focus:outline-none text-[13px] placeholder:text-[13px] flex-1"
                placeholder="Nhập tên"
              />
              <Icon icon="solar:user-bold" width="16" height="16" />
            </Stack>

            {/* Radio Giới tính */}
            <FormControl sx={{ paddingX: "12px" }}>
              <RadioGroup
                row
                value={registerForm.gender}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, gender: e.target.value })
                }
                sx={{ gap: "12px" }}
              >
                <FormControlLabel
                  value="Nam"
                  control={<Radio size="small" sx={{ padding: 0 }} />}
                  label={<Typography variant="body2">Nam</Typography>}
                  sx={{ gap: "4px" }}
                />
                <FormControlLabel
                  value="Nữ"
                  control={<Radio size="small" sx={{ padding: 0 }} />}
                  label={<Typography variant="body2">Nữ</Typography>}
                  sx={{ gap: "4px" }}
                />
              </RadioGroup>
            </FormControl>

            {/* --- FORM NGÀY SINH (Năm - Tháng - Ngày) --- */}
            <Stack
              sx={{
                select: {
                  borderColor: "divider",
                  flex: 1,
                  fontSize: 13,
                  padding: "4px 8px",
                  borderWidth: "1px",
                  backgroundColor: "white",
                  outline: "none",
                },
                flexDirection: "row",
                gap: "12px",
              }}
            >
              {/* 1. Chọn Năm */}
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

              {/* 2. Chọn Tháng */}
              <select
                value={registerForm.birth.month}
                onChange={(e) => handleChangeBirth("month", e.target.value)}
              >
                <option value="">Tháng</option>
                {MONTHS.map((month) => (
                  <option key={month} value={month < 10 ? `0${month}` : month}>
                    {month}
                  </option>
                ))}
              </select>

              {/* 3. Chọn Ngày (Render dựa trên listDays đã tính toán) */}
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
            {/* --- END FORM NGÀY SINH --- */}

            <Stack
              sx={{
                flexDirection: "row",
                width: "100%",
                alignItems: "start",
                gap: "4px",
              }}
            >
              <Checkbox size="small" sx={{ padding: 0 }} defaultChecked />
              <Typography variant="caption" sx={{ fontSize: "12px" }}>
                Tôi đã đọc và đồng ý với{" "}
                <a href="#">Điều kiện giao dịch chung</a> và{" "}
                <a href="#">Chính sách bảo mật thông tin</a> của Hasaki
              </Typography>
            </Stack>

            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ borderRadius: "99px" }}
              loading={loading}
            >
              Đăng ký
            </Button>
          </Stack>
        </Stack>

        {/* Footer */}
        <Stack
          sx={{
            borderTopWidth: 1,
            padding: "12px 16px",
            paddingBottom: "16px",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              span: {
                color: "primary.main",
                textTransform: "uppercase",
                cursor: "pointer",
              },
            }}
          >
            Bạn đã có tài khoản?{" "}
            <span onClick={() => navigate("dang-nhap")}>Đăng nhập</span>
          </Typography>
          <Typography variant="body2" mt={1}>
            Hoặc đăng nhập với
          </Typography>
          <Stack direction="row" gap="12px" paddingTop="4px">
            <ButtonBase sx={{ flex: 1 }}>
              <img
                src="https://hasaki.vn/images/graphics/img_login_fb_2.jpg"
                className="w-full"
                alt="fb"
              />
            </ButtonBase>
            <ButtonBase sx={{ flex: 1 }}>
              <img
                src="https://hasaki.vn/images/graphics/img_login_gg_2.jpg"
                className="w-full"
                alt="gg"
              />
            </ButtonBase>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default RegisterPage;
