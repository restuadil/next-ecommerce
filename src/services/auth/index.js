import instance from "@/lib/axios/instance";
// functions
const authServices = {
    registerAccount: (data) => instance.post("api/auth/register", data),
}

export default authServices


