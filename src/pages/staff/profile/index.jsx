import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const UserProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <>
      {status === "loading" ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loading loading-dots"></div>
        </div>
      ) : (
        <div className="w-1/3 mx-auto block">
          <div className="flex w-full justify-between my-2">
            <Link
              className={`p-3 rounded-md ${
                currentPath === "/staff/Maintenence"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-white"
              }`}
              href={"/staff/Maintenence"}
            >
              Maintenence
            </Link>
            <Link
              className={`p-3 rounded-md ${
                currentPath === "/staff/CIT"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-white"
              }`}
              href={"/staff/CIT"}
            >
              CIT
            </Link>
            <Link
              className={`p-3 rounded-md ${
                currentPath === "/staff/CR"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-white"
              }`}
              href={"/staff/CR"}
            >
              CR
            </Link>
            <Link
              className={`p-3 rounded-md ${
                currentPath === "/staff/profile"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-white"
              }`}
              href={"/staff/profile"}
            >
              Profile
            </Link>
          </div>
          <div className="px-10 py-5 bg-slate-200 ">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
              <form className="flex flex-col items-center">
                <div className="w-full mb-4">
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={session.user.username}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-gray-100"
                    readOnly
                  />
                </div>
                <div className="w-full mb-4">
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    Npp
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={session.user.npp}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-gray-100"
                    readOnly
                  />
                </div>
                <div className="w-full mb-4">
                  <label
                    htmlFor="image"
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    Profile Picture
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={session.user.role}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-gray-100"
                    readOnly
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
