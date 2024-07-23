import { MainServices } from "@/services/staff";
import userServices from "@/services/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { uploadImage } from "@/lib/firebase/service"; // Sesuaikan path-nya

const Index = () => {
  const [staff, setStaff] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    staff: "",
    idLocation: "",
    LocationName: "",
    type: "",
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
    setStaff(response.data.data);
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      idLocation: selectedId,
      LocationName: location ? location.Lokasi : "",
    }));
  };

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
      LocationName: selectedLocationName,
      imageUrl: imageUrl, // Menyertakan URL gambar dalam data formulir
    };

    try {
      await MainServices.add(form);
      setNotification("Data berhasil dikirim!");
      // Reset form data
      setFormData({
        staff: "",
        idLocation: "",
        LocationName: "",
      });
      setSelectedLocationId("");
      setSelectedLocationName("");
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
                  htmlFor="type"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedType(e.target.value);
                  }}
                  name="type"
                  id="type"
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  value={formData.type}
                >
                  <option value="" disabled>
                    Pilih Type
                  </option>
                  <option key="FLM" value="FLM">
                    FLM
                  </option>
                  <option key="SLM" value="SLM">
                    SLM
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="staff"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Staff
                </label>
                <select
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedStaff(e.target.value);
                  }}
                  name="staff"
                  id="staff"
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  value={formData.staff}
                >
                  <option value="" disabled>
                    Pilih Staff
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
