import React, { useRef, useState, useEffect } from "react";

const UserModal = ({
  showModal,
  onClose,
  modalType,
  selectedUser,
  onDeleteUser,
  onEditUser,
  onAddUser,
}) => {
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    npp: "",
    password: "",
    role: "staff",
  });

  useEffect(() => {
    if (modalType === "edit" && selectedUser) {
      setFormData({
        username: selectedUser.username,
        npp: selectedUser.npp,
        password: "",
        role: selectedUser.role,
      });
    } else if (modalType === "add") {
      setFormData({
        username: "",
        npp: "",
        password: "",
        role: "staff",
      });
    }
  }, [modalType, selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    const updatedUserData = {
      id: selectedUser.id,
      email: selectedUser.email,
      fullname: selectedUser.fullname,
      role: e.target.role.value,
    };
    onEditUser(updatedUserData);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    onAddUser(formData);
    setFormData({
      username: "",
      npp: "",
      password: "",
      role: "staff",
    });
  };

  const handleDeleteUser = (userId) => {
    onDeleteUser(userId);
  };

  return (
    <>
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={handleCloseModal}
        >
          <div ref={modalRef} className="bg-white py-5 px-10 rounded-lg w-max">
            <h1 className="text-3xl font-semibold mb-4 text-center">
              {modalType === "edit"
                ? "Edit User"
                : modalType === "delete"
                ? "Delete User"
                : "Add User"}
            </h1>
            {modalType === "edit" ? (
              <form className="w-[500px]" onSubmit={handleEditUser}>
                <label
                  htmlFor={selectedUser.email}
                  className="block mb-2 text-xl"
                >
                  Email
                </label>
                <input
                  type="text"
                  name={selectedUser.email}
                  id={selectedUser.email}
                  defaultValue={selectedUser.email}
                  className="border border-gray-400 rounded px-5 py-2 mb-2 w-full bg-slate-200"
                  readOnly
                />
                <label
                  htmlFor={selectedUser.fullname}
                  className="block mb-2 text-xl"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name={selectedUser.fullname}
                  id={selectedUser.fullname}
                  defaultValue={selectedUser.fullname}
                  className="border border-gray-400 rounded px-5 py-2 mb-2 w-full bg-slate-200"
                  readOnly
                />
                <label htmlFor="role" className="block mb-2 text-xl">
                  Role
                </label>
                <select
                  id="role"
                  className="border border-gray-400 rounded px-5 py-2 mb-2 w-full bg-slate-200"
                  defaultValue={selectedUser.role}
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
                <div className="flex justify-between mt-4 ">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Edit
                  </button>
                </div>
              </form>
            ) : modalType === "delete" ? (
              <>
                <p className="text-center">
                  Are you sure you want to delete this user?
                </p>
                <div className="flex justify-between mt-4 ">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteUser(selectedUser.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <form className="w-[500px]" onSubmit={handleAddUser}>
                <label htmlFor="username" className="block mb-2 text-xl">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="border border-gray-400 rounded px-5 py-2 mb-2 w-full bg-slate-200"
                  required
                />
                <label htmlFor="npp" className="block mb-2 text-xl">
                  NPP
                </label>
                <input
                  type="text"
                  name="npp"
                  id="npp"
                  value={formData.npp}
                  onChange={handleChange}
                  className="border border-gray-400 rounded px-5 py-2 mb-2 w-full bg-slate-200"
                  required
                />
                <label htmlFor="password" className="block mb-2 text-xl">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-gray-400 rounded px-5 py-2 mb-2 w-full bg-slate-200"
                  required
                />
                <label htmlFor="role" className="block mb-2 text-xl">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border border-gray-400 rounded px-5 py-2 mb-2 w-full bg-slate-200"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
                <div className="flex justify-between mt-4 ">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserModal;
