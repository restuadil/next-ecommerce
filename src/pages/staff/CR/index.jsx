import { CITServices, MainServices, TripServices } from "@/services/staff";
import userServices from "@/services/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { uploadImage } from "@/lib/firebase/service"; // Sesuaikan path-nya

const Index = () => {
  const [staff, setStaff] = useState([]);
  const [trip, setTrip] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [time, setTime] = useState("");
  const [formData, setFormData] = useState({
    staffI: "",
    staffII: "",
    trip: "",
    time: "",
    type: "CR",
  });
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const router = useRouter();
  const currentPath = router.pathname;
  async function fetch() {
    const response = await userServices.getAllUsers();
    const trip = await TripServices.getAll();
    setTrip(trip.data.data);
    setStaff(response.data.data);
  }
  useEffect(() => {
    fetch();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let imageUrl = "";
    if (selectedFile) {
      try {
        imageUrl = await uploadImage(selectedFile);
      } catch (error) {
        console.error("Error uploading file:", error);
        setNotification("Gagal mengunggah gambar. Silakan coba lagi.");
        return;
      }
    }

    const form = {
      ...formData,
      imageUrl: imageUrl,
    };

    try {
      await CITServices.add(form);
      console.log(form);
      setNotification("Data berhasil dikirim!");
      // Reset form data
      setFormData({
        staffI: "",
        staffII: "",
        trip: "",
        time: "",
        type: "",
      });
      setSelectedFile(null);
      fetch();
    } catch (err) {
      console.error("Error adding form data:", err);
      setNotification("Gagal mengirim data. Silakan coba lagi.");
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col w-1/3 ">
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
          <div className="border-2">
            <form
              className="flex flex-col px-5 py-2 space-y-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="staffI"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Staff I
                </label>
                <select
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedStaff(e.target.value);
                  }}
                  name="staffI"
                  id="staffI"
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  value={formData.staffI}
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
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedStaff(e.target.value);
                  }}
                  name="staffII"
                  id="staffII"
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  value={formData.staffII}
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
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedStaff(e.target.value);
                  }}
                  name="trip"
                  id="trip"
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  value={formData.trip}
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
                  type="text"
                  name="time"
                  id="time"
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="cth : 13.00 - 15.00"
                  onChange={(e) => {
                    handleChange(e);
                    setTime(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Upload Gambar
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
              <button className="w-full text-white bg-blue-600 px-2 py-1 rounded-md text-2xl">
                Submit
              </button>
              {notification && (
                <p className="text-center mt-2 text-green-600">
                  {notification}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
