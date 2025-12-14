import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { axiosClient } from "@/axios/axiosClient";

const ContactPage = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      await axiosClient.post("/contact", {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      setSubmitStatus({
        type: "success",
        message:
          "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Đã xảy ra lỗi. Vui lòng thử lại sau.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question:
        "Hasaki khác biệt như thế nào so với các cửa hàng mỹ phẩm khác?",
      answer:
        "Hasaki là chuỗi cửa hàng mỹ phẩm chính hãng với hơn 15 năm kinh nghiệm, cam kết 100% hàng chính hãng, giá tốt nhất thị trường và dịch vụ chăm sóc khách hàng tận tâm.",
    },
    {
      question: "Sản phẩm tại Hasaki có đảm bảo chính hãng không?",
      answer:
        "Tất cả sản phẩm tại Hasaki đều được nhập khẩu trực tiếp từ các thương hiệu uy tín, có đầy đủ giấy tờ chứng nhận và tem chống hàng giả. Chúng tôi cam kết hoàn tiền 200% nếu phát hiện hàng giả.",
    },
    {
      question: "Tôi có thể tùy chỉnh trải nghiệm mua sắm tại Hasaki không?",
      answer:
        "Có, bạn có thể tạo tài khoản để lưu danh sách yêu thích, theo dõi đơn hàng, nhận thông báo khuyến mãi và tích điểm thành viên để đổi quà.",
    },
    {
      question: "Hasaki có những tính năng gì cho nhóm mua sắm?",
      answer:
        "Hasaki hỗ trợ mua sắm nhóm với nhiều ưu đãi, tích điểm tập thể, và chương trình khuyến mãi đặc biệt cho các nhóm khách hàng.",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "background.neutral",
        paddingY: { xs: "20px", md: "40px" },
        paddingX: { xs: "20px", sm: "40px", md: "80px", lg: "120px" },
      }}
    >
      {/* Contact Us Section */}
      <Box sx={{ marginBottom: { xs: "40px", md: "60px" } }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                marginBottom: "12px",
                fontSize: { xs: "28px", md: "36px" },
              }}
            >
              Liên hệ với chúng tôi
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "14px", md: "16px" },
                marginBottom: "32px",
              }}
            >
              Email, gọi điện, hoặc điền form để tìm hiểu cách Hasaki có thể
              giải quyết vấn đề làm đẹp của bạn.
            </Typography>
            <Stack gap="24px">
              {/* Contact Details */}
              <Stack gap="16px">
                <Stack direction="row" alignItems="center" gap="12px">
                  <Icon
                    icon="solar:letter-bold"
                    width="24"
                    height="24"
                    color={theme.palette.primary.main}
                  />
                  <Link
                    href="mailto:info@hasaki.vn"
                    sx={{
                      color: "text.primary",
                      textDecoration: "none",
                      fontSize: "16px",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    info@hasaki.vn
                  </Link>
                </Stack>
                <Stack direction="row" alignItems="center" gap="12px">
                  <Icon
                    icon="solar:phone-bold"
                    width="24"
                    height="24"
                    color={theme.palette.primary.main}
                  />
                  <Link
                    href="tel:18006324"
                    sx={{
                      color: "text.primary",
                      textDecoration: "none",
                      fontSize: "16px",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    1800 6324
                  </Link>
                </Stack>
                <Stack direction="row" alignItems="center" gap="12px">
                  <Icon
                    icon="solar:headphones-round-sound-bold"
                    width="24"
                    height="24"
                    color={theme.palette.primary.main}
                  />
                  <Link
                    href="#"
                    sx={{
                      color: "primary.main",
                      textDecoration: "none",
                      fontSize: "16px",
                      fontWeight: 600,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Hỗ trợ khách hàng
                  </Link>
                </Stack>
              </Stack>

              {/* Information Columns */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Stack gap="8px">
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "16px", md: "18px" },
                        fontWeight: 600,
                      }}
                    >
                      Hỗ trợ khách hàng
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "13px", md: "14px" },
                      }}
                    >
                      Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng 24/7 để giải
                      đáp mọi thắc mắc và quan tâm của bạn.
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Stack gap="8px">
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "16px", md: "18px" },
                        fontWeight: 600,
                      }}
                    >
                      Phản hồi và đề xuất
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "13px", md: "14px" },
                      }}
                    >
                      Chúng tôi đánh giá cao phản hồi của bạn và không ngừng cải
                      thiện Hasaki. Ý kiến của bạn rất quan trọng trong việc
                      định hình tương lai của Hasaki.
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Stack gap="8px">
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "16px", md: "18px" },
                        fontWeight: 600,
                      }}
                    >
                      Truyền thông
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "13px", md: "14px" },
                      }}
                    >
                      Đối với các câu hỏi về truyền thông hoặc báo chí, vui lòng
                      liên hệ với chúng tôi tại{" "}
                      <Link
                        href="mailto:media@hasaki.vn"
                        sx={{ color: "primary.main" }}
                      >
                        media@hasaki.vn
                      </Link>
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Grid>

          {/* Get in Touch Form */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "16px",
                padding: { xs: "24px", md: "32px" },
                boxShadow: "custom.card",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  marginBottom: "8px",
                  fontSize: { xs: "20px", md: "24px" },
                }}
              >
                Liên hệ với chúng tôi
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  marginBottom: "24px",
                  fontSize: { xs: "13px", md: "14px" },
                }}
              >
                Bạn có thể liên hệ với chúng tôi bất cứ lúc nào
              </Typography>

              <form onSubmit={handleSubmit}>
                <Stack gap="16px">
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        name="firstName"
                        placeholder="Họ"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        disabled={loading}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "&:hover fieldset": {
                              borderColor: "primary.main",
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        name="lastName"
                        placeholder="Tên"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        disabled={loading}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "&:hover fieldset": {
                              borderColor: "primary.main",
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    placeholder="Email của bạn"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    disabled={loading}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "&:hover fieldset": {
                          borderColor: "primary.main",
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    name="phone"
                    placeholder="Số điện thoại"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            +84
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "&:hover fieldset": {
                          borderColor: "primary.main",
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    name="message"
                    multiline
                    rows={4}
                    placeholder="Chúng tôi có thể giúp gì cho bạn?"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={`${formData.message.length}/200`}
                    disabled={loading}
                    inputProps={{ maxLength: 200 }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "&:hover fieldset": {
                          borderColor: "primary.main",
                        },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      borderRadius: "12px",
                      padding: "12px",
                      fontSize: "16px",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    }}
                  >
                    {loading ? "Đang gửi..." : "Gửi"}
                  </Button>

                  {submitStatus && (
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          submitStatus.type === "success"
                            ? "success.main"
                            : "error.main",
                        textAlign: "center",
                      }}
                    >
                      {submitStatus.message}
                    </Typography>
                  )}

                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      textAlign: "center",
                      fontSize: "12px",
                    }}
                  >
                    Bằng cách liên hệ với chúng tôi, bạn đồng ý với{" "}
                    <Link href="#" sx={{ color: "primary.main" }}>
                      Điều khoản dịch vụ
                    </Link>{" "}
                    và{" "}
                    <Link href="#" sx={{ color: "primary.main" }}>
                      Chính sách bảo mật
                    </Link>{" "}
                    của chúng tôi.
                  </Typography>
                </Stack>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ marginBottom: { xs: "40px", md: "60px" } }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            marginBottom: "8px",
            fontSize: { xs: "28px", md: "36px" },
          }}
        >
          Câu hỏi thường gặp
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            marginBottom: "24px",
            fontSize: { xs: "14px", md: "16px" },
          }}
        >
          Bạn có câu hỏi nào cho chúng tôi không?
        </Typography>

        <Stack gap="8px">
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleAccordionChange(`panel${index}`)}
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "12px",
                boxShadow: "custom.card",
                "&:before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  margin: 0,
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <Icon
                    icon="solar:alt-arrow-down-bold"
                    width="24"
                    height="24"
                  />
                }
                sx={{
                  "& .MuiAccordionSummary-content": {
                    margin: "16px 0",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "15px", md: "16px" }, fontWeight: 600 }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "13px", md: "14px" },
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Box>

      {/* Location Section */}
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            marginBottom: "8px",
            fontSize: { xs: "28px", md: "36px" },
          }}
        >
          Vị trí của chúng tôi
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            marginBottom: "24px",
            fontSize: { xs: "14px", md: "16px" },
          }}
        >
          Kết nối gần và xa
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "16px",
                padding: { xs: "24px", md: "32px" },
                boxShadow: "custom.card",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  marginBottom: "16px",
                  fontSize: { xs: "18px", md: "20px" },
                }}
              >
                Trụ sở chính
              </Typography>
              <Stack gap="12px">
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Hasaki Inc.
                </Typography>
                <Stack direction="row" alignItems="start" gap="12px">
                  <Icon
                    icon="solar:map-point-bold"
                    width="24"
                    height="24"
                    color={theme.palette.primary.main}
                  />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    123 Đường Tech, Suite 456, Quận 1, TP. Hồ Chí Minh, Việt Nam
                  </Typography>
                </Stack>
                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  <Icon icon="solar:map-bold" width="20" height="20" />
                  <Typography variant="body2">Mở Google Maps</Typography>
                </Link>
              </Stack>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                height: { xs: "300px", md: "400px" },
                backgroundColor: "background.neutral",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.319515355!2d106.6926513152608!3d10.776888992304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38b8b8b8b9%3A0x8b8b8b8b8b8b8b8b!2sQu%E1%BA%ADn%201%2C%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactPage;
