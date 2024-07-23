import SideBar from "@/components/Sidebar/SideBar";
import React from "react";

const AdminLayout = ({ children, title = "Admin Panel" }) => {
  const sideBarItem = [
    {
      name: "CR",
      link: "/admin/CR",
      icon: "bxs-dashboard",
    },
    {
      name: "CIT",
      link: "/admin/CIT",
      icon: "bx bx-package",
    },
    {
      name: "FLM",
      link: "/admin/FLM",
      icon: "bx bx-wallet-alt",
    },
    {
      name: "SLM",
      link: "/admin/SLM",
      icon: "bx bxs-wallet-alt",
    },
    {
      name: "Users",
      link: "/admin/users",
      icon: "bx bx-user",
    },
  ];
  return (
    <>
      <div className="flex flex-row">
        <SideBar sideBarItem={sideBarItem} title={title} />
        <div className="ml-[200px] w-full">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
