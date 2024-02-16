import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { GoSearch } from "react-icons/go";

const Navbar = () => {
  const { data } = useSession();
  return (
    <>
      <div className="fixed top-0 w-full bg-none flex justify-between my-2 px-10 items-center  z-10">
        {/* <Image src={"/logo.png"} alt="logo" width={50} height={50} />
        <div>
          <ul className="flex flex-row gap-4">
            <li>Home</li>
            <li>Shop</li>
            <li>Featured</li>
            <li>Recommended</li>
          </ul>
        </div> */}
        <div className="flex flex-row items-center border px-10 py-1.5">
          <input
            type="text"
            placeholder="Search product....."
            className="focus:outline-none placeholder:text-sm mr-2"
          />
          <GoSearch className="text-xl" />
        </div>
        <div>
          <button
            className="bg-slate-700 text-white px-4 py-2 rounded-md"
            onClick={() => {
              data ? signOut() : signIn();
            }}
          >
            {data ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
