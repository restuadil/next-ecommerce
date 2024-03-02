import AdminLayout from "@/Layout/AdminLayout";
import UserModal from "@/components/Modal/Modal";
import userServices from "@/services/user";
import React, { useEffect, useState } from "react";
const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    }
    fetchData();
  }, []);

  const handleEditUser = async (updatedUserData) => {
    try {
      // Kirim permintaan ke server untuk memperbarui data pengguna
      const response = await userServices.updateUser(
        updatedUserData.id,
        updatedUserData
      );
      if (response.status === 200) {
        // Jika berhasil, perbarui data pengguna secara lokal
        setUsers((prevUsers) => {
          return prevUsers.map((user) => {
            if (user.id === updatedUserData.id) {
              return {
                ...user,
                ...updatedUserData,
              };
            }
            return user;
          });
        });
        // Tutup modal
        setShowModal(false);
      } else {
        console.error("Gagal mengedit pengguna.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  const handleAction = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    // Lakukan logika penghapusan pengguna di sini
    console.log("Menghapus pengguna:", selectedUser);
    setShowModal(false);
  };

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
              {/* row */}
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th>{index + 1}</th>
                  <td>{user.email}</td>
                  <td>{user.fullname}</td>
                  <td>{user.role}</td>
                  <td className="flex flex-row justify-center items-center gap-2 text-2xl">
                    <div
                      className="bg-yellow-200 px-2.5 py-1 cursor-pointer hover:bg-yellow-600 hover:text-white"
                      onClick={() => handleAction(user, "edit")}
                    >
                      <i className="bx bx-edit-alt"></i>
                    </div>
                    <div
                      className="bg-red-500 px-2.5 py-1 cursor-pointer hover:bg-red-700 hover:text-white"
                      onClick={() => handleAction(user, "delete")}
                    >
                      <i className="bx bx-trash"></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <UserModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          modalType={modalType}
          selectedUser={selectedUser}
          onConfirmDelete={handleConfirmDelete}
          onEditUser={handleEditUser}
        />
      </div>
    </>
  );
};

export default AdminUsersPage;
