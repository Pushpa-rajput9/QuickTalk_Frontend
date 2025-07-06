import React from "react";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div>
      <header></header>
      <Outlet />
    </div>
  );
}

export default Layout;
