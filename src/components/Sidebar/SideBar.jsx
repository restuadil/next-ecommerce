import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SideBar = () => {
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
      icon: "bx bx-user",
    },
  ];
  const { pathname } = useRouter();
  return (
    <>
      <div className="w-[250px] bg-black h-screen text-white py-5 flex flex-col justify-between">
        <div>
          <h1 className="text-center font-semibold text-3xl mb-2 px-8">
            Admin Panel
          </h1>
          <ul className="mt-10 px-2 flex flex-col gap-2">
            {sideBarItem.map((item) => (
              <Link
                href={item.link}
                key={item.name}
                className={`text-xl flex flex-row items-center gap-3 transition-all duration-300 ${
                  pathname === item.link ? "bg-white text-black" : ""
                }  p-2 hover:bg-white hover:text-black`}
              >
                <i className={`bx ${item.icon}`}></i>
                <span>{item.name}</span>
              </Link>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={() => signOut()}
          className=" py-2 text-whiteblock mx-10 font-semibold text-xl  hover:bg-white hover:text-black"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default SideBar;
