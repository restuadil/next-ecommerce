import instance from "@/lib/axios/instance";

export const MainServices = {
  getAll: () => instance.get("/api/main"),
  update: (id, data) => instance.put(`/api/main/`, { id, data }),
  delete: (id) => instance.delete(`/api/main/`, { data: { id } }),
  add: (data) => instance.post(`/api/main/`, { data }),
};

export const CITServices = {
  getAll: () => instance.get("/api/cit"),
  update: (id, data) => instance.put(`/api/cit/`, { id, data }),
  delete: (id) => instance.delete(`/api/cit/`, { data: { id } }),
  add: (data) => instance.post(`/api/cit/`, { data }),
};

export const TripServices = {
  getAll: () => instance.get("/api/trip"),
};
