import instance from "@/lib/axios/instance";

const userServices = {
    getAllUsers: () => instance.get("/api/users"),
    updateUser: (id, data) => instance.put(`/api/users/`, { id, data }),
}

export default userServices