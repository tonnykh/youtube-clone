import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Body = () => {
  let location = useLocation();

  return (
    <div
      className={
        "" + location.pathname === "/watch" ? "" : ""
      }
    >
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Body;
