import React from "react";
import ClientHeader from "./components/ClientHeader";
import { Outlet, useLocation } from "react-router-dom";
import ClientFooter from "./components/ClientFooter";
import { CircularProgress, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/store/users/action";

const ClientLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, user } = useSelector((store) => store.user);

  React.useEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);

  React.useEffect(() => {
    localStorage.getItem("token")!=null && dispatch(getUser());
  }, []);

  return (
    <div>
      {loading && (
        <Stack
          sx={{
            position: "fixed",
            zIndex: 10000,
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper",
          }}
        >
          <CircularProgress size={60} />
        </Stack>
      )}
      <ClientHeader />
      <Outlet />
      <ClientFooter />
    </div>
  );
};

export default ClientLayout;
