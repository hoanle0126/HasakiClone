import React from "react";
import ClientHeader from "./components/ClientHeader";
import { Outlet, useLocation } from "react-router-dom";
import ClientFooter from "./components/ClientFooter";
import { useDispatch } from "react-redux";
import { getUser } from "@/store/users/action";

const ClientLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);

  React.useEffect(() => {
    localStorage.getItem("token") != null && dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      <ClientHeader />
      <Outlet />
      <ClientFooter />
    </div>
  );
};

export default ClientLayout;
