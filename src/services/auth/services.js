import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

export async function signUp(userData, callback) {
  const data = await retrieveDataByField("users", "email", userData.email);
  if (data.length > 0) {
    callback(false);
  } else {
    if (!userData.role) {
      userData.role = "member";
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_At = new Date();
    userData.updated_At = new Date();
    await addData("users", userData, (result) => {
      callback(result);
    });
  }
}

export async function signIn(npp) {
  const data = await retrieveDataByField("users", "npp", npp);
  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(data, callback) {
  const user = await retrieveDataByField("users", "email", data.email);
  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    data.password = "";
    data.created_At = new Date();
    data.updated_At = new Date();
    await addData("users", data, (result) => {
      if (result) {
        callback(result);
      }
    });
  }
}
