import SideBar from "@/components/Sidebar/SideBar";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <>
      <div>
        <SideBar />
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
