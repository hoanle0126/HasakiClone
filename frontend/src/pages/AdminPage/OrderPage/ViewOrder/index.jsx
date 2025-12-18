import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from "@mui/lab";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminDefaultLayout from "@/layouts/AdminLayout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, updateOrder } from "@/store/orders/action";

const ViewOrderPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading } = useSelector((store) => store.orders);

  React.useEffect(() => {
    dispatch(
      getOrderById({
        id,
        action: () => {},
      })
    );
  }, [id, dispatch]);

  const handleProcessOrder = React.useCallback(() => {
    if (!order?.id) return;
    const currentStatus = order.payments?.status === "completed" ? "completed" : "processing";
    if (currentStatus === "completed") return;

    dispatch(
      updateOrder({
        order: {
          payments: {
            ...order.payments,
            status: "completed",
          },
        },
        id: order.id,
        onSuccess: () => {
          dispatch(
            getOrderById({
              id,
              action: () => {},
            })
          );
        },
      })
    );
  }, [dispatch, order, id]);

  if (loading || !order || !order.id) {
    return (
      <AdminDefaultLayout title="Chi tiết đơn hàng">
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography>Đang tải...</Typography>
        </Box>
      </AdminDefaultLayout>
    );
  }

  // Transform order data từ backend
  const orderData = {
    id: order.id,
    orderId: `ORD-${String(order.id).padStart(3, "0")}`,
    customerName: order.user
      ? `${order.user.first_name || ""} ${order.user.last_name || ""}`.trim()
      : "N/A",
    customerEmail: order.user?.email || "N/A",
    customerPhone: order.address?.phone || "N/A",
    orderDate: order.created_at,
    status: order.payments?.status === "completed" ? "completed" : "processing",
    paymentMethod:
      order.payments?.name ||
      (order.payments?.type === "online"
        ? "Thanh toán online"
        : "Thanh toán khi nhận hàng"),
    paymentInfo:
      order.payments?.type === "online" ? "**** **** **** 5678" : "COD",
    shippingAddress: order.address
      ? `${order.address.street_address || ""}, ${order.address.ward || ""}, ${
          order.address.district || ""
        }, ${order.address.province || ""}`.trim()
      : "N/A",
    shippingPhone: order.address?.phone || "N/A",
    shippingMethod: "Standard",
    trackingNumber: null,
    products: order.products || [],
    subtotal: (order.products || []).reduce(
      (sum, product) => sum + (product.price || 0) * (product.quantity || 0),
      0
    ),
    shippingFee: 30000,
    discount: order.discount_code
      ? ((order.products || []).reduce(
          (sum, product) =>
            sum + (product.price || 0) * (product.quantity || 0),
          0
        ) *
          (order.discount_code.discount || 0)) /
        100
      : 0,
    total: 0,
    history: [
      {
        status: order.payments?.status === "completed" ? "completed" : "processing",
        date: order.created_at,
        note: "Đơn hàng được tạo",
      },
    ],
  };

  orderData.total =
    orderData.subtotal - orderData.discount + orderData.shippingFee;

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "info";
      case "completed":
        return "success";
      default:
        return "info";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "processing":
        return "Đang xử lý";
      case "completed":
        return "Hoàn thành";
      default:
        return "Đang xử lý";
    }
  };

  return (
    <AdminDefaultLayout
      title="Chi tiết đơn hàng"
      action={
        <Stack direction="row" gap="12px" alignItems="center">
          <Chip
            label={getStatusLabel(orderData.status)}
            color={getStatusColor(orderData.status)}
            sx={{ fontWeight: 600, fontSize: "0.875rem" }}
          />
          {orderData.status !== "completed" && (
            <Button
              startIcon={<Icon icon="solar:check-read-broken" />}
              variant="outlined"
              color="common"
              onClick={handleProcessOrder}
            >
              Xử lý đơn hàng
            </Button>
          )}
        </Stack>
      }
    >
      <Stack gap="28px">
        {/* Header */}
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            gap: "12px",
          }}
        >
          <IconButton onClick={() => navigate("/admin/orders")}>
            <Icon icon="solar:alt-arrow-left-outline" />
          </IconButton>
          <Stack gap="4px">
            <Typography variant="h5" color="text.primary">
              Đơn hàng {orderData.orderId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDateTime(orderData.orderDate)}
            </Typography>
          </Stack>
        </Stack>

        <Grid container spacing={"20px"} sx={{ paddingBottom: "12px" }}>
          {/* Left Column */}
          <Grid size={8}>
            <Stack gap="20px">
              {/* Order Details */}
              <Paper
                sx={{
                  boxShadow: "custom.card",
                  borderRadius: "12px",
                  backgroundColor:
                    theme.palette.mode === "dark" && "background.default",
                }}
              >
                <Box
                  sx={{
                    padding: "20px",
                    borderBottom: "1px dashed",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                    Chi tiết đơn hàng
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>
                            Sản phẩm
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            Số lượng
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            Đơn giá
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            Thành tiền
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderData.products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                              >
                                <Avatar
                                  src={product.thumbnail}
                                  sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 2,
                                  }}
                                  variant="rounded"
                                >
                                  {product.name.charAt(0)}
                                </Avatar>
                                <Typography variant="body2">
                                  {product.name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="right">
                              {product.quantity}
                            </TableCell>
                            <TableCell align="right">
                              {formatCurrency(product.price)}
                            </TableCell>
                            <TableCell align="right">
                              {formatCurrency(product.price * product.quantity)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Divider />
                <Box sx={{ padding: "20px" }}>
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Tạm tính:
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        {formatCurrency(orderData.subtotal)}
                      </Typography>
                    </Stack>
                    {orderData.discount > 0 && (
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Giảm giá:
                        </Typography>
                        <Typography variant="body2" color="success.main">
                          -{formatCurrency(orderData.discount)}
                        </Typography>
                      </Stack>
                    )}
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Phí vận chuyển:
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        {formatCurrency(orderData.shippingFee)}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="h6" color="text.primary">
                        Tổng cộng:
                      </Typography>
                      <Typography variant="h6" color="primary.main">
                        {formatCurrency(orderData.total)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Paper>

              {/* Order History */}
              <Paper
                sx={{
                  boxShadow: "custom.card",
                  borderRadius: "12px",
                  backgroundColor:
                    theme.palette.mode === "dark" && "background.default",
                }}
              >
                <Box
                  sx={{
                    padding: "20px",
                    borderBottom: "1px dashed",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                    Lịch sử đơn hàng
                  </Typography>
                  <Timeline
                    sx={{
                      padding: 0,
                      [`& .${timelineItemClasses.root}:last-child`]: {
                        minHeight: 0,
                      },
                      [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                      },
                      "& .MuiTimelineConnector-root": {
                        backgroundColor: "divider",
                      },
                    }}
                  >
                    {orderData.history.map((item, index) => (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <TimelineDot
                            color={
                              index === orderData.history.length - 1
                                ? getStatusColor(item.status)
                                : "default"
                            }
                          />
                          {index < orderData.history.length - 1 && (
                            <TimelineConnector />
                          )}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Stack>
                            <Typography
                              variant="subtitle2"
                              color="text.primary"
                            >
                              {getStatusLabel(item.status)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {formatDateTime(item.date)}
                            </Typography>
                            {item.note && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {item.note}
                              </Typography>
                            )}
                          </Stack>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Box>
              </Paper>
            </Stack>
          </Grid>

          {/* Right Column */}
          <Grid size={4}>
            <Stack gap="20px">
              {/* Customer Info */}
              <Paper
                sx={{
                  boxShadow: "custom.card",
                  borderRadius: "12px",
                  backgroundColor:
                    theme.palette.mode === "dark" && "background.default",
                }}
              >
                <Stack
                  sx={{
                    padding: "20px",
                    gap: "20px",
                    borderBottom: "1px dashed",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="h6" color="text.primary">
                    Thông tin khách hàng
                  </Typography>
                  <Stack direction="row" gap="12px" alignItems="center">
                    <Avatar
                      sx={{
                        width: "44px",
                        height: "44px",
                        bgcolor: "primary.light",
                      }}
                    >
                      {orderData.customerName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Stack gap="4px">
                      <Typography variant="subtitle2" color="text.primary">
                        {orderData.customerName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {orderData.customerEmail}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {orderData.customerPhone}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>

                {/* Shipping Info */}
                <Stack
                  sx={{
                    padding: "20px",
                    gap: "20px",
                    borderBottom: "1px dashed",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="h6" color="text.primary">
                    Thông tin giao hàng
                  </Typography>
                  <Stack spacing={1.5}>
                    <Stack>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        Địa chỉ:
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        {orderData.shippingAddress}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        Số điện thoại:
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        {orderData.shippingPhone}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        Phương thức vận chuyển:
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        {orderData.shippingMethod}
                      </Typography>
                    </Stack>
                    {orderData.trackingNumber && (
                      <Stack>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          Mã vận đơn:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary.main"
                          sx={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          {orderData.trackingNumber}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </Stack>

                {/* Payment Info */}
                <Stack
                  sx={{
                    padding: "20px",
                    gap: "20px",
                  }}
                >
                  <Typography variant="h6" color="text.primary">
                    Thông tin thanh toán
                  </Typography>
                  <Stack spacing={1.5}>
                    <Stack>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        Phương thức:
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        {orderData.paymentMethod}
                      </Typography>
                    </Stack>
                    {orderData.paymentInfo && (
                      <Stack direction="row" gap="12px" alignItems="center">
                        <Typography variant="body2" color="text.primary">
                          {orderData.paymentInfo}
                        </Typography>
                        {orderData.paymentMethod === "Credit Card" && (
                          <Icon
                            icon="logos:mastercard"
                            width={24}
                            height={24}
                          />
                        )}
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </AdminDefaultLayout>
  );
};

export default ViewOrderPage;
