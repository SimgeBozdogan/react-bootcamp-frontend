import React from "react";
import { Outlet } from "react-router-dom";
import CustomDrawer from "../../components/CustomDrawer";

const Layout: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <CustomDrawer />
      <div style={{ flexGrow: 1, padding: 16 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
