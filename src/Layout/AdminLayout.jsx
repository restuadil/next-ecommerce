import SideBar from "@/components/Sidebar/SideBar";
import React from "react";

const AdminLayout = ({ children, title = "Admin Panel" }) => {
  const sideBarItem = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: "bxs-dashboard",
    },
    {
      name: "Products",
      link: "/admin/products",
      icon: "bx bx-package",
    },
    {
      name: "Orders",
      link: "/admin/order",
      icon: "bx bx-cart",
    },
    {
      name: "Users",
      link: "/admin/users",
      icon: "bx bx-group",
    },
  ];
  return (
    <>
      <div>
        <SideBar sideBarItem={sideBarItem} title={title} />
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
