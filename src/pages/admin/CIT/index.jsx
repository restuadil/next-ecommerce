import AdminLayout from "@/Layout/AdminLayout";
import { CITServices, TripServices } from "@/services/staff";
import userServices from "@/services/user";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [CIT, setCIT] = useState([]);
  const [staff, setStaff] = useState([]);
  const [trip, setTrip] = useState([]);
  const [notification, setNotification] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  async function fetch() {
    const response = await CITServices.getAll();
    const staff = await userServices.getAllUsers();
    const trip = await TripServices.getAll();
    setTrip(trip.data.data);
    setStaff(staff.data.data);
    setCIT(response.data.data);
  }
  useEffect(() => {
    fetch();
  }, []);

  const openEditModal = (item, index) => {
    setSelectedItem(index);
    setEditedItem(item);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedItem(null);
    setEditedItem(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteIndex(null);
    setIsDeleteModalOpen(false);
  };

  const handleChange = (event) => {
    setEditedItem({ ...editedItem, [event.target.name]: event.target.value });
  };
  const handleSave = async (e) => {
    e.preventDefault();
    const formUpdate = {
      staffI: editedItem.staffI,
      staffII: editedItem.staffII,
      trip: editedItem.trip,
      time: editedItem.time,
      imageUrl: editedItem.imageUrl || editedItem.image,
    };
    try {
      await CITServices.update(editedItem.id, formUpdate);
      setNotification("Data Berhasil diUpdate");
      setTimeout(() => {
        setNotification("");
      }, 2000);
      closeEditModal(); // Close modal after successful
      fetch();
    } catch (error) {
      console.log(error);
      setNotification("Failed to update item.");
    }
  };

  const handleDelete = () => {
    const updatedCIT = CIT.filter((_, i) => i !== deleteIndex);
    setCIT(updatedCIT);
    closeDeleteModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedItem((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <AdminLayout>
        <div className="flex flex-col w-full">
          {notification && (
            <div className="p-4 mb-4 text-white bg-green-500 rounded w-1/3 mx-auto relative mt-3 z-10 text-center">
              {notification}
            </div>
          )}
          <h1 className="text-center font-bold font-serif py-3 text-2xl border-b-2">
            CASH IN TRANSIT
          </h1>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Staff I</th>
                  <th>Staff II</th>
                  <th>Trip</th>
                  <th>Time</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {CIT.filter((item) => item.type === "CIT").map(
                  (item, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{item.staffI}</td>
                      <td>{item.staffII}</td>
                      <td>{item.trip}</td>
                      <td>{item.time}</td>
                      <td>
                        <Image
                          src={item.imageUrl}
                          alt="image"
                          width={50}
                          height={50}
                        />
                      </td>
                      <td>
                        <div className="flex items-center gap-4 text-3xl">
                          <i
                            className="bx bxs-edit-alt text-yellow-400 hover:cursor-pointer hover:scale-110"
                            onClick={() => openEditModal(item, index)}
                          ></i>
                          <i
                            className="bx bxs-trash-alt text-red-600 hover:cursor-pointer hover:scale-110"
                            onClick={() => openDeleteModal(item, index)}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        {isEditModalOpen && editedItem && (
          <form
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onSubmit={handleSave}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Details</h2>
              <div>
                <label
                  htmlFor="staffI"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Staff I
                </label>
                <select
                  name="staffI"
                  id="staffI"
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  onChange={handleChange}
                  value={editedItem.staffI}
                >
                  <option value="" disabled>
                    Pilih Staff I
                  </option>
                  {staff.map((s) => (
                    <option key={s.id} value={s.username}>
                      {s.username}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="staffII"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Staff II
                </label>
                <select
                  name="staffII"
                  id="staffII"
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  value={editedItem.staffII}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Pilih Staff II
                  </option>
                  {staff.map((s) => (
                    <option key={s.id} value={s.username}>
                      {s.username}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="trip"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Trip
                </label>
                <select
                  onChange={handleChange}
                  name="trip"
                  id="trip"
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  value={editedItem.trip}
                >
                  <option value="" disabled>
                    Pilih Trip
                  </option>
                  {trip.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Time
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="time"
                  id="time"
                  placeholder="cth : 12.00 - 15.00"
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  value={editedItem.time}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Current Image:
                </label>
                {editedItem.imageUrl ? (
                  <Image
                    src={editedItem.imageUrl}
                    alt="image"
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px]"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  New Image:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  onClick={closeEditModal}
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        )}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete this item?</p>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default Index;
