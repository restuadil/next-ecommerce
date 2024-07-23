import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app, { storage } from "./init";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const firestore = getFirestore(app);

export async function retrieveData(collectionName) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataById(collectionName, id) {
  const snapshot = getDoc(doc(firestore, collectionName, id));
  const data = await snapshot.data();
  return data;
}

export async function retrieveDataByField(collectionName, field, value) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}
export async function addData(collectionName, data, callback) {
  await addDoc(collection(firestore, collectionName), data).then(() => {
    callback(data);
  });
}

export async function updateData(collectionName, id, data, callback) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function deleteData(collectionName, id, callback) {
  const docRef = doc(firestore, collectionName, id);
  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export const uploadImage = async (file) => {
  if (!file) return;

  // Membuat referensi ke path di Firebase Storage
  const storageRef = ref(storage, `images/${file.name}`);

  try {
    // Mengunggah file
    const snapshot = await uploadBytes(storageRef, file);

    // Mendapatkan URL file yang diunggah
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
