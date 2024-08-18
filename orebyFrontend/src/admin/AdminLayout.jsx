import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Flex from "../component/Flex";

const AdminLayout = () => {
  return (
    <Flex className="relative">
      <Sidebar />
      <Outlet />
    </Flex>
  );
};

export default AdminLayout;
