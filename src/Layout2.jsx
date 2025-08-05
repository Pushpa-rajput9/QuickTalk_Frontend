import React from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
function Layout2() {
  return (
    <div className=" flex h-screen ">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout2;
