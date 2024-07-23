import AdminLayout from "@/Layout/AdminLayout";
import UserModal from "@/components/Modal/Modal";
import userServices from "@/services/user";
import React, { useEffect, useState } from "react";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await userServices.getAllUsers();
    setUsers(data.data);
  }
  const handleEditUser = async (updatedUserData) => {
    try {
      const response = await userServices.updateUser(
        updatedUserData.id,
        updatedUserData
      );
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUserData.id
              ? { ...user, ...updatedUserData }
              : user
          )
        );
        setShowModal(false);
        setNotification("User updated successfully!");
        setTimeout(() => setNotification(""), 3000);
      } else {
        console.error("Failed to edit user.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleAddUser = async (newUserData) => {
    try {
      const response = await userServices.addUser(newUserData);
      if (response.status === 200) {
        setShowModal(false);
        setNotification("User added successfully!");
        setTimeout(() => setNotification(""), 3000);
        fetchData();
      } else {
        console.error("Failed to add user.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleAction = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    setShowModal(true);
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await userServices.deleteUser(id);
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        setNotification("User deleted successfully!");
        setTimeout(() => setNotification(""), 3000);
      } else {
        console.error("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
    setShowModal(false);
  };

  return (
    <>
      <div className="flex flex-row justify-start">
        <AdminLayout title={"Users Panel"} />
        <div className="overflow-x-auto w-full mx-10 my-5 border border-t-0">
          {notification && (
            <div
              className="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3"
              role="alert"
            >
              <p className="font-bold">{notification}</p>
            </div>
          )}
          <button
            className="px-8 py-3 bg-green-500 text-white m-5 rounded-md"
            onClick={() => handleAction(null, "add")}
          >
            Add User
          </button>
          <table className="table table-zebra border-t-2">
            <thead>
              <tr className="text-left">
                <th>No</th>
                <th>Nama</th>
                <th>NPP</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th>{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.npp}</td>
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
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
          onAddUser={handleAddUser}
        />
      </div>
    </>
  );
};

export default AdminUsersPage;
