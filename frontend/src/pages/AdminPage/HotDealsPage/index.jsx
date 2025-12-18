import AdminDefaultLayout from "@/layouts/AdminLayout/DefaultLayout";
import { deleteHotDeal, getAllHotDeals } from "@/store/hotDeals/action";
import { Icon } from "@iconify/react";
import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import socket from "@/socket";
import { Snackbar, Alert } from "@mui/material";

const HotDealsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hot_deals, loading } = useSelector((store) => store.hotDeals);
  const [notification, setNotification] = React.useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleRefresh = React.useCallback(() => {
    dispatch(getAllHotDeals());
  }, [dispatch]);

  React.useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  // Socket.io integration for real-time hot deals updates
  React.useEffect(() => {
    const handleHotDealsUpdated = (data) => {
      console.log("🔥 Hot Deals updated:", data);

      // Show notification
      const actionMessages = {
        created: `Hot deal "${data.hotDeal?.name || 'N/A'}" has been created`,
        updated: `Hot deal "${data.hotDeal?.name || 'N/A'}" has been updated`,
        deleted: `Hot deal "${data.hotDeal?.name || 'N/A'}" has been deleted`,
      };

      setNotification({
        open: true,
        message: actionMessages[data.action] || "Hot deals list updated",
        severity: data.action === "deleted" ? "warning" : "success",
      });

      // Refresh hot deals list
      handleRefresh();
    };

    socket.on("hot_deals_updated", handleHotDealsUpdated);

    return () => {
      socket.off("hot_deals_updated", handleHotDealsUpdated);
    };
  }, [dispatch, handleRefresh]);

  // Handle notification close
  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  return (
    <AdminDefaultLayout
      title="Hot Deals"
      action={
        <Button
          variant="contained"
          color="common"
          onClick={() => {
            navigate("create");
          }}
        >
          Add Deals
        </Button>
      }
    >
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
          icon={<Icon icon="solar:bell-bing-bold-duotone" />}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Grid container spacing="20px">
        {hot_deals?.map((item, index) => (
          <Grid size={6} key={index}>
            <Stack gap="12px">
              <img className="w-full h-[200px]" src={item.banners[0]} />
              <Stack direction="row" alignItems="start">
                <Typography variant="subtitle1" flex={1}>
                  {item.name}
                </Typography>
                <IconButton
                  color="primary.main"
                  onClick={() => navigate("" + item.id)}
                >
                  <Icon icon="solar:pen-2-bold" width="24" height="24" />
                </IconButton>
                <IconButton
                  color="primary.main"
                  onClick={() => dispatch(deleteHotDeal(item.id))}
                >
                  <Icon
                    icon="solar:trash-bin-minimalistic-linear"
                    width="24"
                    height="24"
                  />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </AdminDefaultLayout>
  );
};

export default HotDealsPage;
