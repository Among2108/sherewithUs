import { api } from "./api";

export const summaryAPI = {
  // GET /api/trips/:id/summary
  getByTrip: async (tripId) => {
    const res = await api.get(`/api/trips/${tripId}/summary`);
    return res.data; // { success, data: { total, perPerson, settlements ... } }
  },
};
