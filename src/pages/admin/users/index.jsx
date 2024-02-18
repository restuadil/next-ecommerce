import AdminLayout from "@/Layout/AdminLayout";
import userServices from "@/services/user";
import React, { useEffect, useState } from "react";

const AdminUsersPage = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await userServices.getAllUsers();
      setUser(data.data);
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="flex flex-row justify-start">
        <AdminLayout title={"Users Panel"} />
        <div className="overflow-x-auto w-full mx-10 my-5 border">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-left">
                <th>No</th>
                <th>Email</th>
                <th>FullName</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {user &&
                user.map((item, index) => (
                  <tr key={item.id}>
                    <th>{index + 1}</th>
                    <td>{item.email}</td>
                    <td>{item.fullname}</td>
                    <td>{item.role}</td>
                    <td className="flex flex-row justify-center items-center gap-2 text-2xl">
                      <div className="bg-yellow-200 px-2.5 py-1 cursor-pointer hover:bg-yellow-600 hover:text-white">
                        <i class="bx bx-edit-alt"></i>
                      </div>
                      <div className="bg-red-500 px-2.5 py-1 cursor-pointer hover:bg-red-700 hover:text-white">
                        <i class="bx bx-trash"></i>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUsersPage;
