import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { GoSearch } from "react-icons/go";
import Button from "../UI/Button";

const Navbar = () => {
  const { data } = useSession();
  return (
    <>
      <div className="sticky top-0 w-full bg-black flex justify-between px-10 py-2 items-center z-10">
        <Image src={"/logo.png"} alt="logo" width={50} height={50} />
        <div>
          <ul className="flex flex-row gap-4 text-slate-300 ">
            <li className="hover:text-white hover:cursor-pointer">Home</li>
            <li className="hover:text-white hover:cursor-pointer">Shop</li>
            <li className="hover:text-white hover:cursor-pointer">Featured</li>
            <li className="hover:text-white hover:cursor-pointer">
              Recommended
            </li>
          </ul>
        </div>
        <div className="flex flex-row items-center border px-10 py-1.5 text-slate-300 hover:text-white">
          <input
            type="text"
            placeholder="Search product....."
            className="focus:outline-none placeholder:text-sm mr-2 bg-black"
          />
          <GoSearch className="text-xl" />
        </div>
        <div>
          <Button
            className={"px-10 py-2 text-white"}
            variant={"primary"}
            onClick={() => {
              data ? signOut() : signIn();
            }}
          >
            {data ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
