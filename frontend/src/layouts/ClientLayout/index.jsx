import React from "react";
import ClientHeader from "./components/ClientHeader";
import { Outlet } from "react-router-dom";
import ClientFooter from "./components/ClientFooter";

const ClientLayout = () => {
  return (
    <div>
      <ClientHeader />
      <Outlet />
      <ClientFooter />
    </div>
  );
};

export default ClientLayout;
