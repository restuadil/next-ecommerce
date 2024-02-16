import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function retrieveData(collectionName) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    return data
}

export async function retrieveDataById(collectionName, id) {
    const snapshot = getDoc((doc(firestore, collectionName, id)))
    const data = await snapshot.data()
    return data;
}

export async function retrieveDataByField(collectionName, field, value) {
    const q = query(collection(firestore, collectionName), where(field, "==", value));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    return data
}
export async function addData(collectionName, data, callback) {
    await addDoc(collection(firestore, collectionName), data).then(() => {
        callback(data)
    })
}
