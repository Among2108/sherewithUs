import { api } from "./api";

export const tripAPI = {
  // GET /api/trips
  getAll: async () => {
    const res = await api.get("/api/trips");
    return res.data; // { success, count, data }
  },

  // POST /api/trips
  create: async (payload) => {
    const res = await api.post("/api/trips", payload);
    return res.data; // { success, data }
  },

  // GET /api/trips/:id
  getById: async (tripId) => {
    const res = await api.get(`/api/trips/${tripId}`);
    return res.data;
  },

  // POST /api/trips/:id/members
  addMember: async (tripId, payload) => {
    const res = await api.post(`/api/trips/${tripId}/members`, payload);
    return res.data;
  },

delete: async (tripId) => {
  const res = await api.delete(`/api/trips/${tripId}`);
  return res.data;
},


  // DELETE /api/trips/:id/members/:memberId
  deleteMember: async (tripId, memberId) => {
    const res = await api.delete(`/api/trips/${tripId}/members/${memberId}`);
    return res.data;
  },
};
