import React from "react";
import ClientHeader from "./components/ClientHeader";
import { Outlet, useLocation } from "react-router-dom";
import ClientFooter from "./components/ClientFooter";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/store/users/action";
import socket from "@/socket";
import { Snackbar, Alert } from "@mui/material";

const ClientLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((store) => store.user);
  const [notification, setNotification] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  React.useEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);

  React.useEffect(() => {
    localStorage.getItem("token") != null && dispatch(getUser());
  }, [dispatch]);

  // Socket.io integration: Join user room when user is logged in
  React.useEffect(() => {
    if (user?.id) {
      // Join vào room của user
      socket.emit("join_user_room", { userId: user.id });
      console.log("✅ Joined user room:", `user_${user.id}`);

      // Lắng nghe notification về đơn hàng được xác nhận
      const handleOrderProcessed = (data) => {
        console.log("📦 Order processed notification:", data);
        setNotification({
          open: true,
          message: data.message || `Đơn hàng #${data.order?.id || data.order?.orderId || 'N/A'} đã được xác nhận!`,
          severity: "success",
        });
      };

      socket.on("order_processed", handleOrderProcessed);

      // Cleanup
      return () => {
        socket.off("order_processed", handleOrderProcessed);
      };
    }
  }, [user?.id]);

  // Handle notification close
  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  return (
    <div>
      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <ClientHeader />
      <Outlet />
      <ClientFooter />
    </div>
  );
};

export default ClientLayout;
