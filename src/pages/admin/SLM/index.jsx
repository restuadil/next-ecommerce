import AdminLayout from "@/Layout/AdminLayout";
import { MainServices } from "@/services/staff";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const FLM = () => {
  const [initialCIT, setInitialCIT] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [notification, setNotification] = useState("");
  const [CIT, setCIT] = useState(initialCIT);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  async function fetch() {
    const response = await MainServices.getAll();
    setInitialCIT(response.data.data);
  }
  useEffect(() => {
    fetch();
  }, []);

  const data = [
    { id: "S1DJNG02AU", Lokasi: "KLN PERC NEGARA 2" },
    { id: "S1CKRM02HT", Lokasi: "KCU KRAMAT 2" },
    { id: "S1CKRM07CC", Lokasi: "KCU KRAMAT 5" },
    { id: "S1IKRMA017", Lokasi: "KK JOHAR BARU 3" },
    { id: "S1DMHT02MO", Lokasi: "KLN THAMRIN 1" },
    { id: "S1IKRMA018", Lokasi: "KLINIK EVASARI" },
    { id: "S1GKRM11ZM", Lokasi: "INDOMARET CEMPAKA PUTIH TENGAH" },
    { id: "S1AKRMA030", Lokasi: "INDOMARET TANAH TINGGI" },
    { id: "S1IKRMA014", Lokasi: "MENTENG SQUARE 2" },
    { id: "S1FKRM10PA", Lokasi: "INDOMARET CEMPAKA RAYA" },
    { id: "S1FKRM10PD", Lokasi: "INDOMARET UTAN PANJANG 3" },
    { id: "S1HKRM08TD", Lokasi: "PASAR SENEN JAYA BLOK 3" },
    { id: "S1GGBRA002", Lokasi: "REST PADANG SALERO JUMBO" },
    { id: "S1GGBRA007", Lokasi: "THAMRIN RESIDENCE-2" },
    { id: "S1CGBR02UN", Lokasi: "KCU GAMBIR 2" },
    { id: "S1GGBRA04LI", Lokasi: "KLN MNC PLAZA 1" },
    { id: "S1CGBR11BV", Lokasi: "KCP GRHA PERTAMINA" },
    { id: "S1FGBR10NA", Lokasi: "MENARA MULTIMEDIA" },
    { id: "S1AGBRA010", Lokasi: "RSPAD GATOT SUBROTO" },
    { id: "S1HGBRA013", Lokasi: "ELVIA GUEST HOUSE 2" },
    { id: "S1GGBRA006", Lokasi: "FAVE HOTEL WAHID HASYIM" },
    { id: "S1AGBRA012", Lokasi: "GALLERY GRAHA LESTARI" },
    { id: "S1BGBRA002", Lokasi: "KCP BPJS KESEHATAN 2" },
    { id: "S1CGBR12DD", Lokasi: "HOTEL AMARIS LOBBY" },
    { id: "S1HGBR12FF", Lokasi: "LOBBY KEMENTERIAN BUMN" },
    { id: "S1CKRM02SU", Lokasi: "KK KELAUTAN 2" },
    { id: "S1EKRM12AA", Lokasi: "KLN GRAHA ATRIUM SENEN 2" },
    { id: "S1FGBRR003", Lokasi: "UNIVERSITAS YARSI" },
    { id: "S1FKRM90LN", Lokasi: "ELVIA GUESTHOUSE" },
    { id: "S1HKRM08TE", Lokasi: "SPBU605 SENEN" },
    { id: "T0902638", Lokasi: "LOBBY KEMENTRIAN BUMN" },
    { id: "S1BKRMR017", Lokasi: "CRM DITZIADE" },
    { id: "S1HJNGR011", Lokasi: "KCP MATRAMAN CRM" },
    { id: "S1CKRMR032", Lokasi: "CRM BPJS KESEHATAN" },
    { id: "S1CKRMR028", Lokasi: "KK RSPAD GATOT SUBROTO" },
    { id: "S1FGBRR010", Lokasi: "CRM KLN MNC PLAZA" },
    { id: "S1EGBRR009", Lokasi: "CRM SARINAH THAMRIN" },
    { id: "S1FGBRR005", Lokasi: "CRM DEPARTEMEN PERHUBUNGAN" },
    { id: "S1HGBRR001", Lokasi: "KCU GAMBIR CRM" },
    { id: "S1AKRMR006", Lokasi: "CRM GRAMEDIA MATRAMAN" },
    { id: "S1GGBRR012", Lokasi: "CRM KK LAUT" },
    { id: "S1EGBRR007", Lokasi: "KK KELAUTAN CRM 2" },
    { id: "S1CGBRR008", Lokasi: "KCP GRAHA PERTAMINA 2" },
    { id: "S1CJNGR067", Lokasi: "KCP MATRAMAN 1" },
    { id: "S1DKRMR020", Lokasi: "PASAR GEMBRONG" },
    { id: "S1FKRMR008", Lokasi: "CRM LP3I KAMPUS KRAMAT" },
    { id: "S1DGBRR011", Lokasi: "KLN MERDEKA SELATAN CRM" },
    { id: "S1BKRMR015", Lokasi: "KK SENEN JAYA CRM" },
    { id: "S1FKRMR021", Lokasi: "CRM KK PASAR PRAMUKA" },
    { id: "S1CGBRR002", Lokasi: "KCU GAMBIR 3 CRM" },
    { id: "S1HGBRR004", Lokasi: "KEMENKO MARINVEST CRM" },
    { id: "S1DKRMR037", Lokasi: "BBLK PERCETAKAN NEGARA" },
    { id: "S1CKRMR013", Lokasi: "KLN DEPSOS 1" },
    { id: "S1CKRMR036", Lokasi: "KLN PERCETAKAN NEGARA 1" },
    { id: "S1BGBRR006", Lokasi: "CRM KCP KWITANG" },
    { id: "S1CKRMR024", Lokasi: "CRM KCP SENEN" },
    { id: "S1GKRMR019", Lokasi: "MARDANI 1" },
    { id: "S1DKRMR034", Lokasi: "CRM BNI KK CEMPAKA PUTIH" },
    { id: "S1CJNGR045", Lokasi: "KCU GAMBIR 4 CRM" },
    { id: "S1DKRMR003", Lokasi: "CRM KCU KRAMAT 3" },
  ];

  const handleLocationChange = (event) => {
    const selectedId = event.target.value;
    setSelectedLocationId(selectedId);
    const location = data.find((loc) => loc.id === selectedId);
    setSelectedLocationName(location ? location.Lokasi : "");
    setEditedItem((prev) => ({
      ...prev,
      idLocation: selectedId,
      LocationName: location ? location.Lokasi : "",
    }));
  };

  const openEditModal = (item, index) => {
    setSelectedItem(index);
    setEditedItem(item);
    setSelectedLocationId(item.idLocation); // set initial location id
    setSelectedLocationName(item.LocationName); // set initial location name
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

  const handleSave = async (e) => {
    e.preventDefault();
    const formUpdate = {
      idLocation: editedItem.idLocation,
      LocationName: editedItem.LocationName,
      staff: editedItem.staff,
      imageUrl: editedItem.imageUrl || editedItem.image,
    };
    try {
      await MainServices.update(editedItem.id, formUpdate);
      setNotification("Data Berhasil diUpdate");
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
            SECOND LINE MAINTENENCE
          </h1>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Id Location</th>
                  <th>Location</th>
                  <th>Staff</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {initialCIT &&
                  initialCIT
                    .filter((item) => item.type === "SLM")
                    .map((item, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.idLocation}</td>
                        <td>{item.LocationName}</td>
                        <td>{item.staff}</td>
                        <td>
                          <div className="flex items-center justify-center">
                            {item.imageUrl ? (
                              <Image
                                src={item.imageUrl || "/1.jpg"}
                                alt="image"
                                width={80}
                                height={80}
                                className="h-20 w-20"
                              />
                            ) : (
                              <span>No Image</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-4 text-3xl">
                            <i
                              className="bx bxs-edit-alt text-yellow-400 hover:cursor-pointer hover:scale-110"
                              onClick={() => openEditModal(item, index)}
                            ></i>
                            <i
                              className="bx bxs-trash-alt text-red-600 hover:cursor-pointer hover:scale-110"
                              onClick={() => openDeleteModal(index)}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))}
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
                  htmlFor="idLocation"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Id Lokasi
                </label>
                <select
                  name="idLocation"
                  id="idLocation"
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  onChange={handleLocationChange}
                  value={selectedLocationId}
                >
                  <option value="" disabled>
                    Pilih Id
                  </option>
                  {data.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.id}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="locationName"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Nama Lokasi
                </label>
                <input
                  type="text"
                  id="locationName"
                  value={selectedLocationName}
                  disabled
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
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
                    width={200}
                    height={200}
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

export default FLM;
